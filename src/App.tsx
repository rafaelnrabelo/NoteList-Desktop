import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import { Container } from './styles';

import SideBar from './components/SideBar';
import Header from './components/Header';
import Note from './components/Note';
import LoginDialog from './components/LoginDialog';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <LoginDialog />
        <Header />
        <SideBar />
        <Note />
      </Container>
    </>
  );
};

render(<App />, mainElement);
