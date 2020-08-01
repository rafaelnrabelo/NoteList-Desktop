import React, { useState, useEffect } from 'react';
import {
  ProfileDialog,
  LoginContainer,
  CloseDialogButton,
  LoginDescription,
  LoginTitle,
  ProfilePicture,
  LoggedContainer,
  ProfileEmail,
  ProfileName,
  ProfilePlaceholder,
  ButtonText,
  DeleteButton,
  LoggoutButton,
  LoginCode,
  LoginInstruction,
  LoginLink,
} from './styles';
import { FiX, FiTrash, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import open from 'open';

import api from '../../services/api';
import store from '../../store/config';
import { FACEBOOK_ID, CLIENT_TOKEN } from '../../.env.json';
import PlaceholderPicture from '../../assets/Placeholder.png';

interface User {
  id: String;
  name: String;
  email: String;
}

const LoginDialog: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState(PlaceholderPicture);
  const [loginCode, setLoginCode] = useState('');
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    store.set('showLoginDialog', false);
    store.onDidChange('showLoginDialog', (newValueSelected: any) => {
      setShowDialog(newValueSelected);
    });
    const newUser = store.get('user') as any;
    setUser(newUser);
    if (newUser.id !== '') {
      loadProfilePicture(newUser.id);
    } else {
      loginCodeInterval();
    }
  }, []);

  function loginCodeInterval() {
    const codeInterval = setInterval(() => {
      getLoginCode(codeInterval);
    }, 420000);
    getLoginCode(codeInterval);
  }

  function switchDialog() {
    store.set('showLoginDialog', !store.get('showLoginDialog'));
    setShowDialog(!showDialog);
  }

  async function getLoginCode(Interval: number) {
    const response = await axios.post(
      'https://graph.facebook.com/v7.0/device/login',
      {
        access_token: `${FACEBOOK_ID}|${CLIENT_TOKEN}`,
        scope: 'public_profile,email',
      }
    );
    setLoginCode(response.data.user_code);
    CheckLogin(response.data.code, Interval);
  }

  async function CheckLogin(code: string, codeInterval: number) {
    const checkLoginInterval = setInterval(async () => {
      try {
        if (store.get('showLoginDialog') as boolean) {
          const response = await axios.post(
            'https://graph.facebook.com/v7.0/device/login_status',
            {
              access_token: `${FACEBOOK_ID}|${CLIENT_TOKEN}`,
              code,
            }
          );
          if (!response.data.error) {
            Login(response.data.access_token, checkLoginInterval, codeInterval);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 5000);
  }

  async function Login(
    Token: string,
    checkInterval: number,
    codeInterval: number
  ) {
    clearInterval(checkInterval);
    clearInterval(codeInterval);

    const { data } = await axios.get(
      `https://graph.facebook.com/v7.0/me?fields=name,email&access_token=${Token}`
    );

    const userProps = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    await api.post('/users', userProps);
    const photoURL = await axios.get(
      `https://graph.facebook.com/v7.0/${data.id}/picture?redirect=0&height=200&type=large&width=200`
    );
    setUser(userProps);
    setProfilePic(photoURL.data.data.url);
    store.set('user', userProps);
    loadNotes(userProps.id);
    const saveRequest = store.get('saveRequest') as any;
    store.set('saveRequest', {
      request: true,
      lastSave: saveRequest.lastSave,
      deletedNote: [],
    });
  }

  async function loadNotes(id: string) {
    const response = await api.get('/notes', {
      headers: {
        Authorization: id,
      },
    });
    const notes = store.get('notes') as any;
    var newNotes = [...notes, ...response.data];
    const unique = newNotes
      .map((e) => e['id'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => newNotes[e as any])
      .map((e) => newNotes[e as any]);
    store.set('notes', unique);
  }

  async function loadProfilePicture(id: string) {
    const photoURL = await axios.get(
      `https://graph.facebook.com/v7.0/${id}/picture?redirect=0&height=200&type=large&width=200`
    );
    setProfilePic(photoURL.data.data.url);
  }

  function handleLoggout() {
    store.reset('user');
    setUser({
      id: '',
      name: '',
      email: '',
    });
    store.reset('saveRequest');
    loginCodeInterval();
  }

  async function DeleteAccount() {
    if (
      window.confirm('Tem certeza que deseja APAGAR a conta e todas anotações?')
    ) {
      await api.delete(`/users/${user.id}`);
      store.reset('user');
      store.reset('notes');
    }
  }

  return (
    <ProfileDialog scroll="body" onClose={switchDialog} open={showDialog}>
      <CloseDialogButton onClick={switchDialog}>
        <FiX className="CloseModalIcon" size={24} />
      </CloseDialogButton>
      <LoginContainer show={user.id === '' ? true : false}>
        <ProfilePlaceholder src={PlaceholderPicture} alt="ProfileImage" />
        <LoginTitle>Faça Login</LoginTitle>
        <LoginDescription>
          - Sincronize suas anotações com o app mobile. <br />- Acesse suas
          anotações de qualquer lugar.
        </LoginDescription>
        <LoginCode>{loginCode}</LoginCode>
        <LoginInstruction>
          Para fazer Login insira o <b>código</b> acima no site
        </LoginInstruction>
        <LoginLink
          onClick={() => {
            open('https://www.facebook.com/device');
          }}
        >
          https://www.facebook.com/device
        </LoginLink>
      </LoginContainer>
      <LoggedContainer show={user.id !== '' ? true : false}>
        <ProfilePicture src={profilePic} alt="ProfileImage" />
        <ProfileName>{user.name}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
        <DeleteButton onClick={DeleteAccount}>
          <FiTrash size={20} />
          <ButtonText>Deletar Conta</ButtonText>
        </DeleteButton>
        <LoggoutButton onClick={handleLoggout}>
          <FiLogOut size={20} />
          <ButtonText>Sair</ButtonText>
        </LoggoutButton>
      </LoggedContainer>
    </ProfileDialog>
  );
};

export default LoginDialog;
