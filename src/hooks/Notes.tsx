import React, { createContext, useState, useContext, useEffect } from 'react';
import moment from 'moment';

import store from '../store/Store';
import api from '../services/api';

import { useUser } from './User';

interface ToDo {
  id: string;
  label: string;
  checked: boolean;
}

interface Note {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  toDos: ToDo[];
}

interface NotesContextData {
  notes: Note[];
  selected: Note;
  searchText: string;
  loading: boolean;

  loadNotes(id: string): Promise<void>;
  firstLoadLogin(id: string): Promise<void>;
  saveNotes(): Promise<void>;
  createNote(): void;
  deleteNote(): void;
  editNoteTitle(text: string): void;
  editNoteDescription(text: string): void;

  createToDo(): void;
  deleteToDo(id: string): void;
  changeToDoLabel(label: string, id: string): void;
  changeToDoCheck(id: string): void;

  selectNote(note: Note): void;
  searchNotes(search: string): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notes = localStorage.getItem('@NoteList:notes');

    if (notes) {
      return JSON.parse(notes);
    }

    return [];
  });
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(() => {
    const notes = localStorage.getItem('@NoteList:notes');

    if (notes) {
      return JSON.parse(notes);
    }

    return [];
  });

  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Note>({
    id: '',
    title: '',
    description: '',
    toDos: [],
    updated_at: '',
    created_at: '',
  });

  const {
    user,
    saveRequest,
    setSaveRequest,
    resetSaveRequest,
    addDeletedNote,
  } = useUser();

  function selectNote(note: Note) {
    if (selected.id !== note.id) {
      setSelected(note);
    }
  }

  function searchNotes(search: string) {
    setSearchText(search);

    var filtered: Note[] = [];
    notes.forEach((note: Note) => {
      if (note.title.toUpperCase().includes(search.toUpperCase())) {
        filtered.push(note);
      }
    });

    setFilteredNotes(filtered);
  }

  async function firstLoadLogin(id: string) {
    setLoading(true);
    try {
      const response = await api.get('/notes', {
        headers: {
          Authorization: id,
        },
      });
      var newNotes = [...notes, ...response.data];
      const unique = newNotes
        .map((e) => e['id'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => newNotes[e as any])
        .map((e) => newNotes[e as any]);

      localStorage.setItem('@NoteList:notes', JSON.stringify(unique));
      setNotes(unique);
      setFilteredNotes(unique);
      setSearchText('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function loadNotes(id: string) {
    setLoading(true);
    try {
      const response = await api.get('/notes', {
        headers: {
          Authorization: id,
        },
      });

      localStorage.setItem('@NoteList:notes', JSON.stringify(response.data));
      setNotes(response.data);
      setFilteredNotes(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  async function saveNotes() {
    try {
      await api.post(
        '/sync',
        { notes: notes, deleted: saveRequest.deletedNotes },
        {
          headers: {
            Authorization: user.id,
          },
        }
      );
      resetSaveRequest();
    } catch (err) {
      console.log(err);
    }
  }

  function createNote() {
    var created_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');
    const id =
      Date.now().toString() +
      (Math.floor(Math.random() * (9999999999 - 10000 + 1)) + 10000).toString();

    const newNote = {
      id,
      title: '',
      description: '',
      toDos: [],
      created_at,
      updated_at: created_at,
    };

    localStorage.setItem(
      '@NoteList:notes',
      JSON.stringify([...notes, newNote])
    );
    setNotes([...notes, newNote]);
    setFilteredNotes([...notes, newNote]);
    setSearchText('');

    selectNote(newNote);

    setSaveRequest();
  }

  function deleteNote() {
    if (window.confirm('Tem certeza que deseja deletar essa anotação?')) {
      const newNotes = notes.filter((note) => note.id !== selected.id);

      localStorage.setItem('@NoteList:notes', JSON.stringify(newNotes));
      setNotes(newNotes);
      setFilteredNotes(newNotes);
      setSearchText('');

      addDeletedNote(selected.id);
      setSelected({
        id: '',
        title: '',
        description: '',
        toDos: [],
        updated_at: '',
        created_at: '',
      });
    }
  }

  function editNoteTitle(text: string) {
    var newNotes = notes;
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');

    newNotes.forEach((note) => {
      if (note.id === selected.id) {
        note.title = text;
        note.updated_at = updated_at;
      }
    });

    localStorage.setItem('@NoteList:notes', JSON.stringify(newNotes));
    setNotes(newNotes);
    searchNotes(searchText);

    setSaveRequest();
  }

  function editNoteDescription(text: string) {
    var newNotes = notes;
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');

    newNotes.forEach((note) => {
      if (note.id === selected.id) {
        note.description = text;
        note.updated_at = updated_at;
      }
    });

    //store.set('notes', newNotes);
    localStorage.setItem('@NoteList:notes', JSON.stringify(newNotes));
    setNotes(newNotes);
    searchNotes(searchText);

    setSaveRequest();
  }

  function saveToDos(array: ToDo[]) {
    var newNotes = notes;
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');

    newNotes.forEach((note) => {
      if (note.id === selected.id) {
        note.toDos = array;
        note.updated_at = updated_at;
      }
    });

    localStorage.setItem('@NoteList:notes', JSON.stringify(newNotes));
    setNotes(newNotes);
    searchNotes(searchText);

    setSaveRequest();
  }

  function createToDo() {
    var array = notes.filter((note) => note.id === selected.id)[0].toDos;

    if (array.length < 20) {
      const id =
        Date.now().toString() +
        (
          Math.floor(Math.random() * (9999999999 - 10000 + 1)) + 10000
        ).toString();

      array = [...array, { id, label: '', checked: false }];

      saveToDos(array);
    } else {
      alert('Número máximo de tarefas atingido.');
    }
  }

  function deleteToDo(id: string) {
    var array = notes.filter((note) => note.id === selected.id)[0].toDos;
    array = array.filter((todo, index) => index !== Number(id));

    saveToDos(array);
  }

  function changeToDoLabel(text: string, id: string) {
    var array = notes.filter((note) => note.id === selected.id)[0].toDos;
    array[Number(id)].label = text;

    saveToDos(array);
  }

  function changeToDoCheck(id: string) {
    var array = notes.filter((note) => note.id === selected.id)[0].toDos;
    array[Number(id)].checked = !array[Number(id)].checked;

    saveToDos(array);
  }

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes,
        searchText,
        selected,
        loading,
        loadNotes,
        firstLoadLogin,
        saveNotes,
        createNote,
        deleteNote,
        editNoteTitle,
        editNoteDescription,
        createToDo,
        deleteToDo,
        changeToDoLabel,
        changeToDoCheck,
        selectNote,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export function useNotes(): NotesContextData {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
}
