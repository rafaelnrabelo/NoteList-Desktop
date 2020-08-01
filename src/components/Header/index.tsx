import React, { useState, useEffect } from 'react';

import {
  Container,
  ProfileContainer,
  ProfileName,
  ProfilePicture,
  SaveContainer,
  SavedWrapper,
  SaveText,
  SavableWrapper,
  SavedAt,
  SaveButton,
  NoteOptionsWrapper,
  DeleteButton,
  AddToDoButton,
  DeleteIcon,
  DeleteIconHover,
  AddToDoIcon,
  AddToDoIconHover,
  SaveIcon,
  SaveIconHover,
} from './styles';
import { IoIosCloudDone } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';

import api from '../../services/api';
import store from '../../store/config';
import ProfilePlaceholder from '../../assets/Placeholder.png';

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

interface User {
  id: String;
  name: String;
  email: String;
}

interface SaveRequest {
  request: boolean;
  lastSave: string;
  deletedNotes: string[];
}

const Header: React.FC = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [toDos, setToDos] = useState<ToDos[]>([]);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
  });
  const [profilePic, setProfilePic] = useState(ProfilePlaceholder);
  const [saveRequest, setSaveRequest] = useState<SaveRequest>({
    request: false,
    lastSave: new Date().toLocaleTimeString('pt-BR'),
    deletedNotes: [],
  });

  useEffect(() => {
    const loadUser = store.get('user') as any;
    setUser(loadUser);
    if (loadUser.id !== '') {
      loadProfilePicture(loadUser.id);
    } else {
      setProfilePic(ProfilePlaceholder);
    }
    store.reset('selected');
    store.reset('showLoginDialog');
    store.onDidChange('selected', (newValueSelected: any) => {
      setToDos(newValueSelected.toDos);
      setSelected(newValueSelected === {} ? false : true);
    });
    store.set('saveRequest', saveRequest);
    store.onDidChange('saveRequest', (newValueSelected: any) => {
      setSaveRequest(newValueSelected);
    });
    store.onDidChange('user', (newValueSelected: any) => {
      setUser(newValueSelected);
      if (newValueSelected.id !== '') {
        loadProfilePicture(newValueSelected.id);
      } else {
        setProfilePic(ProfilePlaceholder);
      }
    });
  }, []);

  async function handleSave() {
    await api.post(
      '/sync',
      { notes: store.get('notes'), deleted: saveRequest.deletedNotes },
      {
        headers: {
          Authorization: user.id,
        },
      }
    );
    store.reset('saveRequest');
    var saved_at = new Date().toLocaleTimeString('pt-BR');
    setSaveRequest({
      request: false,
      lastSave: saved_at,
      deletedNotes: [],
    });
    store.set('saveRequest', {
      request: false,
      lastSave: saved_at,
      deletedNotes: [],
    });
  }

  async function loadProfilePicture(id: string) {
    const photoURL = await axios.get(
      `https://graph.facebook.com/v7.0/${id}/picture?redirect=0&height=200&type=large&width=200`
    );
    setProfilePic(photoURL.data.data.url);
  }

  function handleAddToDo() {
    if (toDos.length < 20) {
      const id =
        Date.now().toString() +
        (
          Math.floor(Math.random() * (9999999999 - 10000 + 1)) + 10000
        ).toString();
      setToDos([...toDos, { id, label: '', checked: false }]);
      var notes: Note[] = store.get('notes') as Note[];
      const selectedNote: Note = store.get('selected') as Note;
      notes.forEach((note: any) => {
        if (note.id === (selectedNote.id as any)) {
          note.toDos = [...toDos, { id, label: '', checked: false }];
          store.set('selected', note);
        }
      });
      store.set('notes', notes);
      store.set('saveRequest', {
        request: true,
        lastSave: saveRequest.lastSave,
        deletedNote: saveRequest.deletedNotes,
      });
    } else {
      alert('Número máximo de tarefas atingido.');
    }
  }

  function handleDeleteNote() {
    if (window.confirm('Tem certeza que deseja deletar essa anotação?')) {
      var notes: Note[] = store.get('notes') as Note[];
      const selectedNote: Note = store.get('selected') as Note;
      const newNotes = notes.filter((note) => note.id !== selectedNote.id);
      store.set('notes', newNotes);
      store.reset('selected');
      setSelected(false);
      const request = store.get('saveRequest') as any;
      const deletedNotes = [...request.deletedNotes, selectedNote.id];
      store.set('saveRequest', {
        request: true,
        lastSave: request.lastSave,
        deletedNotes,
      });
    }
  }

  function switchDialog() {
    store.set('showLoginDialog', !store.get('showLoginDialog'));
  }

  return (
    <Container>
      <ProfileContainer onClick={switchDialog}>
        <ProfilePicture src={profilePic} />
        <ProfileName>
          {user.id === '' ? 'Login' : `Olá, ${user.name.split(' ')[0]}`}
        </ProfileName>
      </ProfileContainer>
      <SaveContainer>
        <SavedWrapper show={!saveRequest.request && user.id !== ''}>
          <SaveText>Salvo</SaveText>
          <IoIosCloudDone size={25} color="#da552f" />
        </SavedWrapper>
        <SavableWrapper show={saveRequest.request && user.id !== ''}>
          <SaveText>Último Salvamento:</SaveText>
          <SavedAt>{saveRequest.lastSave}</SavedAt>
          <SaveButton onClick={handleSave}>
            <SaveIcon size={32} color="#da552f" />
            <SaveIconHover size={32} color="#da552f" />
          </SaveButton>
        </SavableWrapper>
      </SaveContainer>
      <NoteOptionsWrapper show={selected}>
        <AddToDoButton onClick={handleAddToDo}>
          <FiPlus size={21} color="#da552f" />
          <AddToDoIcon size={25} color="#da552f" />
          <AddToDoIconHover size={25} color="#da552f" />
        </AddToDoButton>
        <DeleteButton onClick={handleDeleteNote}>
          <DeleteIcon size={26} color="#da552f" />
          <DeleteIconHover size={26} color="#da552f" />
        </DeleteButton>
      </NoteOptionsWrapper>
    </Container>
  );
};

export default Header;
