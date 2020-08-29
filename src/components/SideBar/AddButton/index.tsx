import React from 'react';

import {
  Container,
  Button,
  AddOutlined,
  AddHover,
  SearchBar,
  SearchIcon,
  SearchContainer,
} from './styles';

import { useNotes } from '../../../hooks/Notes';

const AddButton: React.FC = () => {
  const { createNote, searchNotes } = useNotes();

  return (
    <Container>
      <SearchContainer>
        <SearchIcon size={20} />
        <SearchBar
          onChange={(e) => {
            searchNotes(e.target.value);
          }}
        />
      </SearchContainer>
      <Button onClick={createNote}>
        <AddOutlined size={20} />
        <AddHover size={20} />
      </Button>
    </Container>
  );
};

export default AddButton;
