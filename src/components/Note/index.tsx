import React, { useEffect, useState } from 'react';

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

import { useConfig } from '../../hooks/Config';
import { useNotes } from '../../hooks/Notes';

interface ToDo {
  id: string;
  label: string;
  checked: boolean;
}

const Note: React.FC = () => {
  const { sideBarWidth } = useConfig();
  const {
    notes,
    selected,
    editNoteTitle,
    editNoteDescription,
    changeToDoLabel,
    changeToDoCheck,
    deleteToDo,
  } = useNotes();
  const [title, setTitle] = useState<string>(selected.title);
  const [description, setDescription] = useState<string>(selected.description);
  const [toDos, setToDos] = useState<ToDo[]>(selected.toDos);

  useEffect(() => {
    setTitle(selected.title);
    setDescription(selected.description);
  }, [selected]);

  useEffect(() => {
    notes.forEach((note) => {
      if (note.id === selected.id) {
        setToDos(note.toDos);
      }
    });
  }, [notes, selected]);

  function handleChangeTitle(text: string) {
    editNoteTitle(text);
    setTitle(text);
  }

  function handleChangeDescription(text: string) {
    editNoteDescription(text);
    setDescription(text);
  }

  return (
    <Container width={sideBarWidth}>
      <PlaceholderContainer show={selected.id === ''}>
        <PlaceholderText>Selecione Uma Anotação</PlaceholderText>
      </PlaceholderContainer>
      <NoteWrapper show={selected.id !== ''}>
        <Title
          onChange={(e) => {
            handleChangeTitle(e.target.value);
          }}
          value={title}
        />
        <Description
          onChange={(e: any) => {
            handleChangeDescription(e.target.value);
          }}
          value={description}
        />
        {toDos.map((item, index) => (
          <ToDoContainer key={index}>
            <DeleteToDo
              onClick={() => {
                deleteToDo(String(index));
              }}
            >
              <FiX size={18} />
            </DeleteToDo>
            <CheckBox
              style={{ color: '#da552f' }}
              onChange={() => {
                changeToDoCheck(String(index));
              }}
              checked={item.checked ? true : false}
            />
            <CheckBoxLabel
              onChange={(e) => changeToDoLabel(e.target.value, String(index))}
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
