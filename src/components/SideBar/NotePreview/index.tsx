import React, { ReactNode, useEffect, useState } from 'react';
import { Title, Container, UpdatedAt, Date, Time } from './styles';

interface Props {
  title: String;
  date: String;
  selected: boolean;
  children?: ReactNode;
  style: object;
  onClick?: () => void;
}

interface Updated {
  time: String;
  date: String;
}

const NotePreview: React.FC<Props> = (props) => {
  const [updated, setUpdated] = useState<Updated>({
    time: '',
    date: '',
  });

  useEffect(() => {
    setUpdated({
      time: props.date.substr(0, 8),
      date: props.date.substr(9),
    });
  }, [props.date]);

  return (
    <>
      <Container
        onClick={props.onClick}
        style={props.style}
        selected={props.selected}
      >
        <Title>{props.title === '' ? 'Sem Titulo' : props.title}</Title>
        <UpdatedAt>
          <Time>{updated.time}</Time>
          <Date>{updated.date}</Date>
        </UpdatedAt>
      </Container>
    </>
  );
};

export default NotePreview;
