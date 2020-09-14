import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { Titlebar, Color, Themebar } from 'custom-electron-titlebar';

import { GlobalStyle } from './styles/GlobalStyle';
import { Container } from './styles';

import HooksProvider from './hooks';

import SideBar from './components/SideBar';
import Header from './components/Header';
import Note from './components/Note';
import LoginDialog from './components/LoginDialog';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  useEffect(() => {
    const { dialog } = require('electron').remote;
    if (!navigator.onLine) {
      dialog.showMessageBox({
        title: 'Sem conexão com a Internet',
        message: 'Sem internet disponível, mudanças podem não ser salvas.',
        type: 'warning',
        buttons: ['OK'],
        defaultId: 0,
      });
    }
    if (process.platform !== 'darwin') {
      new Titlebar({
        backgroundColor: Color.fromHex('#1e1f29'),
        iconsTheme: process.platform === 'win32' ? Themebar.win : Themebar.mac,
        titleHorizontalAlignment: 'center',
        menu: null,
      });
    }
  }, []);

  return (
    <HooksProvider>
      <GlobalStyle />
      <Container>
        <LoginDialog />
        <Header />
        <SideBar />
        <Note />
      </Container>
    </HooksProvider>
  );
};

render(<App />, mainElement);
