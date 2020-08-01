import React from 'react';
import moment from 'moment';

import { Container, Button, AddOutlined, AddHover, SearchBar } from './styles';
import store from '../../../store/config';

interface ToDos {
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
  toDos: ToDos[];
}

const AddButton: React.FC = () => {
  function handleNewNote() {
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
    store.set('notes', [...(store.get('notes') as any), newNote]);
    handleSelection(newNote);
    const saveRequest = store.get('saveRequest') as any;
    store.set('saveRequest', { request: true, lastSave: saveRequest.lastSave });
  }

  function handleSelection(note: Note) {
    if (store.get('selected') !== note.id) {
      store.set('selected', note);
    }
  }

  return (
    <Container>
      <SearchBar
        onChange={(e) => {
          store.set('searchText', e.target.value);
        }}
      />
      <Button onClick={handleNewNote}>
        <AddOutlined size={20} />
        <AddHover size={20} />
      </Button>
    </Container>
  );
};

export default AddButton;
