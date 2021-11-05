export const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
  try {
    const notes = await fetch(URL);
    return notes.json();
  } catch (error) {
    throw error;
  }
};

export const saveNote = async (note) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };

  try {
    const result = await fetch(URL, options);
    return result.json();
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  const options = {
    method: 'DELETE',
  };

  try {
    const result = await fetch(`${URL}/${id}`, options);
    return result.json();
  } catch (error) {
    throw error;
  }
};

export const updateNoteContent = async (id, updatedNote) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  };
  const result = await fetch(`${URL}/${id}`, options);
  return result.json();
};
