import React, { useState, useEffect } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import { useTransition } from 'react-spring';
import { easeCubicOut } from 'd3-ease';

import { Container, Content } from './styles';
import NotePreview from './NotePreview';
import AddButton from './AddButton';
import api from '../../services/api';
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

const SideBar: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  const [sideBarWidth, setSideBarWidth] = useState<number>(200);
  const [notes, setNotes] = useState<Note[]>([]);
  const notesWithTransitions = useTransition(notes, (note) => note.id, {
    config: { duration: 100, easing: easeCubicOut },
    from: { transform: `translateX(-${sideBarWidth}px)`, opacity: 0 },
    enter: { transform: 'translateX(0px)', opacity: 1 },
    leave: { transform: `translateX(-${sideBarWidth}px)`, opacity: 0 },
  });

  useEffect(() => {
    store.reset('selected');
    const user = store.get('user') as any;
    if (user.id !== '') {
      loadNotes(user.id);
    } else {
      setNotes(store.get('notes') as any);
    }
    store.onDidChange('notes', (newValueNotes: any) => {
      setNotes(newValueNotes);
      const searchText = store.get('searchText') as any;
      handleSearch(searchText.toUpperCase());
    });
    store.onDidChange('selected', (newValueSelected: any) => {
      setSelected(newValueSelected.id);
    });
    store.set('searchText', '');
    store.onDidChange('searchText', (newValueSearch: any) => {
      handleSearch(newValueSearch.toUpperCase());
    });
  }, []);

  async function loadNotes(id: string) {
    setNotes(store.get('notes') as any);
    const response = await api.get('/notes', {
      headers: {
        Authorization: id,
      },
    });
    setNotes(response.data);
    store.set('notes', response.data);
  }

  function handleSelection(note: Note) {
    if (selected !== note.id) {
      store.set('selected', note);
    }
  }

  function handleResize(data: ResizeCallbackData) {
    setSideBarWidth(data.size.width);
    store.set('sideBarWidth', data.size.width);
  }

  function handleSearch(filter: string) {
    var filtered: Note[] = [];
    const unfilteredNotes = store.get('notes') as any;
    unfilteredNotes.forEach((note: Note) => {
      if (note.title.toUpperCase().includes(filter)) {
        filtered.push(note);
      }
    });
    setNotes(filtered);
  }

  return (
    <Container
      width={sideBarWidth}
      height={Infinity}
      minConstraints={[150, Infinity]}
      maxConstraints={[300, Infinity]}
      onResize={(e, data: ResizeCallbackData) => {
        handleResize(data);
      }}
    >
      <AddButton />
      <Content>
        {notesWithTransitions?.map(({ item: note, props, key }) => (
          <NotePreview
            style={props}
            key={key}
            title={note.title}
            date={note.updated_at}
            selected={selected === note.id ? true : false}
            onClick={() => {
              handleSelection(note);
            }}
          />
        ))}
      </Content>
    </Container>
  );
};

export default SideBar;
