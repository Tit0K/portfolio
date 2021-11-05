import {
  PRIORITY,
  REFS,
  BUTTON_ACTIONS,
  NOTIFICATIONS,
  EDITOR_ACTIONS,
  PRIORITY_NAMES,
} from './utilities/constants';
import Notepad from './model';
import { renderListItem, addListItem, deleteListItem } from './render';
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';

var notyf = new Notyf();

const deleteNote = (target, notepad, refs) => {
  try {
    deleteListItem(
      target.closest('.note-list__item'),
      target.closest('.note-list__item').dataset.id,
      notepad
    );
    notyf.error(NOTIFICATIONS.DELETED);
  } catch (err) {
    throw err;
  }
};

const editNote = (target, notepad, refs) => {
  try {
    const id = target.closest('.note-list__item').dataset.id;
    refs.editor.dataset.action = EDITOR_ACTIONS.EDIT;
    refs.editor.dataset.noteId = id;
    const note = notepad.findNoteById(id);
    refs.titleEditor.value = note.title;
    refs.bodyEditor.value = note.body;
    MicroModal.show('note-editor-modal');
  } catch (err) {
    throw err;
  }
};

const upNotePriority = (target, notepad, refs) => {
  try {
    const id = target.closest('.note-list__item').dataset.id;
    const priority = notepad.findNoteById(id).priority;
    if (priority == PRIORITY.HIGH) {
      notyf.error(NOTIFICATIONS.MAX_PRIORITY);
    } else {
      const newPriority = priority + 1;
      updateNotePriority(id, newPriority, refs, notepad);
    }
  } catch (err) {
    throw err;
  }
};

const downNotePriority = (target, notepad, refs) => {
  try {
    const id = target.closest('.note-list__item').dataset.id;
    const priority = notepad.findNoteById(id).priority;

    if (priority == PRIORITY.LOW) {
      notyf.error(NOTIFICATIONS.MIN_PRIORITY);
    } else {
      const newPriority = priority - 1;
      updateNotePriority(id, newPriority, refs, notepad);
    }
  } catch (err) {
    throw err;
  }
};

const updateNotePriority = (id, newPriority, refs) => {
  notepad.updateNotePriority(id, newPriority);
  renderListItem(notepad.notes, refs);
  notyf.success(NOTIFICATIONS.PRIORITY_UPDATE);
};

const addNote = (title, body, notepad, refs) => {
  try {
    notepad.saveNote(title.value, body.value).then((addedNote) => {
      addListItem(addedNote, refs);
    });
  } catch (err) {
    throw err;
  }
};

const changeNote = (title, body, notepad, refs) => {
  try {
    notepad
      .updateNoteContent(refs.editor.dataset.noteId, {
        title: title.value,
        body: body.value,
      })
      .then(() => {
        renderListItem(notepad.notes, refs);
      });
  } catch (err) {
    throw err;
  }
};

const handleListenListClick = (notepad, refs, { target }) => {
  if (target.nodeName == 'I' || target.nodeName == 'BUTTON') {
    switch (target.closest('.action').dataset.action) {
      case BUTTON_ACTIONS.DELETE:
        deleteNote(target, notepad, refs);
        break;
      case BUTTON_ACTIONS.EDIT:
        editNote(target, notepad, refs);
        break;
      case BUTTON_ACTIONS.UP_PRIORITY:
        upNotePriority(target, notepad, refs);
        break;
      case BUTTON_ACTIONS.DOWN_PRIORITY:
        downNotePriority(target, notepad, refs);
        break;
    }
  }
};

const handleListenEditorInput = ({ target }) => {
  if (target.value.trim().length == 0) {
    target.classList.remove('note-editor__input--valid');
    target.classList.add('note-editor__input--invalid');
  } else {
    target.classList.remove('note-editor__input--invalid');
    target.classList.add('note-editor__input--valid');
  }
};

const handleListenEditorSubmit = (notepad, refs, target) => {
  target.preventDefault();

  const [title, body] = target.currentTarget.elements;
  if (title.value.trim() != '' && body.value.trim() != '') {
    switch (refs.editor.dataset.action) {
      case EDITOR_ACTIONS.ADD:
        addNote(title, body, notepad, refs);
        break;
      case EDITOR_ACTIONS.EDIT:
        changeNote(title, body, notepad, refs);
        break;
    }
  }
};

const handleListenSearchInput = (notepad, refs, target) => {
  renderListItem(notepad.filterNotesByQuery(target.path[0].value), refs);
};

const handleListenSearchInputEnter = (target) => {
  if (target.key === 'Enter') {
    target.preventDefault();
  }
};

const handleListenOpenEditor = (refs) => {
  refs.editor.dataset.action = EDITOR_ACTIONS.ADD;
  refs.editor.reset();
  MicroModal.show('note-editor-modal');
};

const handleListenListenEditor = (refs) => {
  if (refs.editor.dataset.action == EDITOR_ACTIONS.ADD) {
    notyf.success(NOTIFICATIONS.SUCCESS);
    confetti();
  }
  if (refs.editor.dataset.action == EDITOR_ACTIONS.EDIT) {
    notyf.success(NOTIFICATIONS.UPDATE);
  }
  MicroModal.close('note-editor-modal');
};

const notepad = new Notepad();
notepad.loadNotes.then(() => {
  renderListItem(notepad.notes, REFS);
});

REFS.list.addEventListener(
  'click',
  handleListenListClick.bind(null, notepad, REFS)
);
REFS.editor.addEventListener('input', handleListenEditorInput);
REFS.editor.addEventListener(
  'submit',
  handleListenEditorSubmit.bind(null, notepad, REFS)
);
REFS.search.addEventListener(
  'input',
  handleListenSearchInput.bind(null, notepad, REFS)
);
REFS.search.addEventListener(
  'keypress',
  handleListenSearchInputEnter.bind(null)
);
REFS.openEditor.addEventListener(
  'click',
  handleListenOpenEditor.bind(null, REFS)
);
REFS.closeEditor.addEventListener(
  'submit',
  handleListenListenEditor.bind(null, REFS)
);
