import React from 'react';
import { ResizeCallbackData } from 'react-resizable';
import { useTransition } from 'react-spring';
import { easeCubicOut } from 'd3-ease';

import { Container, Content } from './styles';
import NotePreview from './NotePreview';
import AddButton from './AddButton';

import { useConfig } from '../../hooks/Config';
import { useNotes } from '../../hooks/Notes';

const SideBar: React.FC = () => {
  const { sideBarWidth, changeSideBarWidth } = useConfig();
  const { notes, selected, selectNote } = useNotes();

  const notesWithTransitions = useTransition(notes, (note) => note.id, {
    config: { duration: 100, easing: easeCubicOut },
    from: { transform: `translateX(-${sideBarWidth}px)`, opacity: 0 },
    enter: { transform: 'translateX(0px)', opacity: 1 },
    leave: { transform: `translateX(-${sideBarWidth}px)`, opacity: 0 },
  });

  return (
    <Container
      width={sideBarWidth}
      height={Infinity}
      minConstraints={[170, Infinity]}
      maxConstraints={[300, Infinity]}
      onResize={(e, data: ResizeCallbackData) => {
        changeSideBarWidth(data.size.width);
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
            selected={selected.id === note.id}
            onClick={() => {
              selectNote(note);
            }}
          />
        ))}
      </Content>
    </Container>
  );
};

export default SideBar;
