import * as api from './services/api';
import { PRIORITY, PRIORITY_NAMES } from './utilities/constants';
const shortid = require('shortid');

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  get loadNotes() {
    return api.getNotes().then((notes) => {
      this._notes = notes;
      return this._notes;
    });
  }

  get newId() {
    return shortid.generate();
  }

  findNoteById(id) {
    return this._notes.find((note) => note.id == id);
  }

  saveNote(title, body) {
    const note = {
      id: this.newId,
      title,
      body,
      priority: PRIORITY.NORMAL,
    };

    return api.saveNote(note).then((saveNotePromise) => {
      this._notes.push(saveNotePromise);
      return saveNotePromise;
    });
  }
  deleteNote(id) {
    this._notes = this._notes.filter((note) => note.id != id);
    return api.deleteNote(id);
  }
  updateNoteContent(id, updatedNote) {
    Object.assign(this.findNoteById(id), updatedNote);
    return api.updateNoteContent(id, updatedNote).then((updatedNotePromise) => {
      return updatedNotePromise;
    });
  }
  updateNotePriority(id, priority) {
    return this.updateNoteContent(id, { priority: priority });
  }
  filterNotesByQuery(query) {
    return this._notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase())
    );
  }
  filterNotesByPriority(priority) {
    return this._notes.filter((note) => note.priority == priority);
  }
}
