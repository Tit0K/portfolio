import templates from './templates/notepad.hbs';
import { PRIORITY, PRIORITY_NAMES } from './utilities/constants';

const changePriorityName = (note) => {
  note.priority = PRIORITY_NAMES[note.priority];
  return note;
};

const refactorPriority = (data) => {
  if (data.length === undefined) {
    data.priority = PRIORITY[data.priority];
    return data;
  } else {
    return Object.assign(
      data.map((item) => {
        return (item.priority = PRIORITY[item.priority]);
      }),
      data
    );
  }
};

export const createListItem = (element) => {
  changePriorityName(element);
  return templates(element);
};

export const renderListItem = (notes, refs) => {
  const sortByPriority = (a, b) => b.priority - a.priority;
  notes.sort(sortByPriority);
  const listItem = notes.map((item) => createListItem(item)).join('');
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', listItem);
  refactorPriority(notes);
};

export const addListItem = (note, refs) => {
  refs.list.insertAdjacentHTML('beforeend', createListItem(note));
  refactorPriority(note);
};

export const deleteListItem = (note, noteId, model) => {
  model.deleteNote(noteId);
  note.remove();
};
