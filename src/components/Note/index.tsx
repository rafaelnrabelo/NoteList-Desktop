import React, { useState, useEffect } from 'react';

import {
  Container,
  NoteWrapper,
  Title,
  Description,
  ToDoContainer,
  DeleteToDo,
  CheckBoxLabel,
  CheckBox,
  PlaceholderContainer,
  PlaceholderText,
} from './styles';
import { FiX } from 'react-icons/fi';
import moment from 'moment';

import store from '../../store/config';

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

const Note: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toDos, setToDos] = useState<ToDos[]>([]);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    store.reset('selected');
    store.onDidChange('sideBarWidth', (newValueWidth) =>
      setWidth(Number(newValueWidth))
    );
    store.onDidChange('selected', (newValueSelected: any) => {
      setTitle(newValueSelected.title);
      setDescription(newValueSelected.description);
      setToDos(newValueSelected.toDos);
      setSelected(newValueSelected.id === '' ? false : true);
    });
  }, []);

  function handleEditTitle(text: string) {
    var notes: Note[] = store.get('notes') as Note[];
    const selectedNote: Note = store.get('selected') as Note;
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');
    notes.forEach((note) => {
      if (note.id === selectedNote.id) {
        note.title = text;
        note.updated_at = updated_at;
      }
    });
    store.set('notes', notes);
    const saveRequest = store.get('saveRequest') as any;
    store.set('saveRequest', {
      request: true,
      lastSave: saveRequest.lastSave,
      deletedNote: saveRequest.deletedNotes,
    });
  }

  function handleEditDescription(text: string) {
    var notes: Note[] = store.get('notes') as Note[];
    const selectedNote: Note = store.get('selected') as Note;
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');
    notes.forEach((note) => {
      if (note.id === selectedNote.id) {
        note.description = text;
        note.updated_at = updated_at;
      }
    });
    store.set('notes', notes);
    const saveRequest = store.get('saveRequest') as any;
    store.set('saveRequest', {
      request: true,
      lastSave: saveRequest.lastSave,
      deletedNote: saveRequest.deletedNotes,
    });
  }

  function handleSaveToDos(array: ToDos[]) {
    setToDos(array);
    var newNotes = store.get('notes') as Note[];
    var updated_at = moment().utcOffset('-03:00').format('HH:mm:ss DD/MM/YY');
    const selectedNote = store.get('selected') as Note;
    newNotes.forEach((note) => {
      if (note.id === selectedNote.id) {
        note.toDos = array;
        note.updated_at = updated_at;
        store.set('selected', note);
      }
    });
    store.set('notes', newNotes);
    const saveRequest = store.get('saveRequest') as any;
    store.set('saveRequest', {
      request: true,
      lastSave: saveRequest.lastSave,
      deletedNote: saveRequest.deletedNotes,
    });
  }

  function handleChangeLabel(text: string, id: string) {
    var array = toDos;
    array[Number(id)].label = text;
    handleSaveToDos(array);
    setToDos([...array]);
  }

  function handleChangeCheck(id: string) {
    var array = toDos;
    array[Number(id)].checked = !array[Number(id)].checked;
    handleSaveToDos(array);
    setToDos([...array]);
  }

  function handleDeleteToDo(id: string) {
    var array = toDos.filter((todo, index) => index !== Number(id));
    handleSaveToDos(array);
    setToDos([...array]);
  }

  return (
    <Container width={width}>
      <PlaceholderContainer show={!selected}>
        <PlaceholderText>Selecione Uma Anotação</PlaceholderText>
      </PlaceholderContainer>
      <NoteWrapper show={selected}>
        <Title
          onChange={(e) => {
            setTitle(e.target.value);
            handleEditTitle(e.target.value);
          }}
          value={title}
        />
        <Description
          onChange={(e: any) => {
            setDescription(e.target.value);
            handleEditDescription(e.target.value);
          }}
          value={description}
        />
        {toDos.map((item, index) => (
          <ToDoContainer key={index}>
            <DeleteToDo
              onClick={(e) => {
                e.preventDefault();
                handleDeleteToDo(String(index));
              }}
            >
              <FiX size={18} />
            </DeleteToDo>
            <CheckBox
              style={{ color: '#da552f' }}
              onChange={() => {
                handleChangeCheck(String(index));
              }}
              checked={item.checked ? true : false}
            />
            <CheckBoxLabel
              onChange={(e) => handleChangeLabel(e.target.value, String(index))}
              value={item.label}
              checked={item.checked ? true : false}
            />
          </ToDoContainer>
        ))}
      </NoteWrapper>
    </Container>
  );
};

export default Note;
