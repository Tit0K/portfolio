export const PRIORITY = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

export const PRIORITY_NAMES = {
  0: 'LOW',
  1: 'NORMAL',
  2: 'HIGH',
};

export const REFS = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  search: document.querySelector('.search-form'),
  openEditor: document.querySelector("[data-action='open-editor']"),
  closeEditor: document.querySelector('[data-micromodal-close]'),
  titleEditor: document.querySelector("[name='note_title']"),
  bodyEditor: document.querySelector("[name='note_body']"),
};

export const BUTTON_ACTIONS = {
  DOWN_PRIORITY: 'decrease-priority',
  UP_PRIORITY: 'decrease-increase',
  EDIT: 'edit-note',
  DELETE: 'delete-note',
};

export const NOTIFICATIONS = {
  SUCCESS: 'Заметка добавлена!',
  DELETED: 'Заметка удалена',
  UPDATE: 'Заметка успешно обновлена',
  MAX_PRIORITY: 'Заметка уже имеет максимальный приоритет',
  MIN_PRIORITY: 'Заметка уже имеет минимальный приоритет',
  PRIORITY_UPDATE: 'Приоритет обновлен',
};

export const EDITOR_ACTIONS = {
  ADD: 'add',
  EDIT: 'edit',
};
