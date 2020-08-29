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

import { useUser } from '../../hooks/User';
import { useConfig } from '../../hooks/Config';
import { useNotes } from '../../hooks/Notes';

import { FACEBOOK_ID, CLIENT_TOKEN } from '../../.env.json';

const LoginDialog: React.FC = () => {
  const [loginCode, setLoginCode] = useState('');
  const { user, profilePicture, signIn, signOut, DeleteAccount } = useUser();
  const { showLoginDialog, switchLoginDialogOff } = useConfig();
  const { loadNotes, firstLoadLogin } = useNotes();

  useEffect(() => {
    if (user.id === '') {
      loginCodeInterval();
    } else {
      loadNotes(user.id);
    }
  }, []);

  function loginCodeInterval() {
    const codeInterval = setInterval(() => {
      getLoginCode(codeInterval);
    }, 420000);
    getLoginCode(codeInterval);
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
    await signIn(userProps);
    await firstLoadLogin(userProps.id);
  }

  function handleLoggout() {
    signOut();
    loginCodeInterval();
  }

  return (
    <ProfileDialog
      scroll="body"
      onClose={switchLoginDialogOff}
      open={showLoginDialog}
    >
      <CloseDialogButton onClick={switchLoginDialogOff}>
        <FiX className="CloseModalIcon" size={24} />
      </CloseDialogButton>
      <LoginContainer show={user.id === '' ? true : false}>
        <ProfilePlaceholder src={profilePicture} alt="ProfileImage" />
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
        <ProfilePicture src={profilePicture} alt="ProfileImage" />
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
