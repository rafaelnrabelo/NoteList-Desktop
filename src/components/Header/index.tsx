import React from 'react';

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

import { useUser } from '../../hooks/User';
import { useConfig } from '../../hooks/Config';
import { useNotes } from '../../hooks/Notes';

const Header: React.FC = () => {
  const { user, profilePicture, saveRequest } = useUser();
  const { switchLoginDialogOn } = useConfig();
  const { selected, createToDo, deleteNote, saveNotes } = useNotes();

  return (
    <Container>
      <ProfileContainer onClick={switchLoginDialogOn}>
        <ProfilePicture src={profilePicture} />
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
          <SaveButton onClick={saveNotes}>
            <SaveIcon size={32} color="#da552f" />
            <SaveIconHover size={32} color="#da552f" />
          </SaveButton>
        </SavableWrapper>
      </SaveContainer>
      <NoteOptionsWrapper show={selected.id !== ''}>
        <AddToDoButton onClick={createToDo}>
          <FiPlus size={21} color="#da552f" />
          <AddToDoIcon size={25} color="#da552f" />
          <AddToDoIconHover size={25} color="#da552f" />
        </AddToDoButton>
        <DeleteButton onClick={deleteNote}>
          <DeleteIcon size={26} color="#da552f" />
          <DeleteIconHover size={26} color="#da552f" />
        </DeleteButton>
      </NoteOptionsWrapper>
    </Container>
  );
};

export default Header;
