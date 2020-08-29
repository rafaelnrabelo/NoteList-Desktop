import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import api from '../services/api';
import store from '../store/Store';

import PlaceholderPicture from '../assets/Placeholder.png';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SaveRequest {
  request: boolean;
  lastSave: string;
  deletedNotes: string[];
}

interface UserState {
  user: User;
  saveRequest: SaveRequest;
}

interface UserContextData {
  user: User;
  saveRequest: SaveRequest;
  profilePicture: string;
  signIn(userProps: User): Promise<void>;
  signOut(): void;
  DeleteAccount(): Promise<void>;
  setSaveRequest(): void;
  addDeletedNote(id: string): void;
  resetSaveRequest(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserState>(() => {
    const user = store.get('user') as User;
    const saveRequest = {
      request: false,
      lastSave: new Date().toLocaleTimeString('pt-BR'),
      deletedNotes: [],
    };

    return {
      user,
      saveRequest,
    };
  });
  const [profilePicture, setProfilePicture] = useState(PlaceholderPicture);

  useEffect(() => {
    if (data.user.id !== '') {
      loadProfilePicture(data.user.id);
    }
  }, [data.user]);

  async function loadProfilePicture(id: string) {
    const photoURL = await axios.get(
      `https://graph.facebook.com/v7.0/${id}/picture?redirect=0&height=200&type=large&width=200`
    );
    const profilePicture = photoURL.data.data.url as string;
    setProfilePicture(profilePicture);
  }

  async function signIn(userProps: User) {
    try {
      await api.post('/users', userProps);

      store.set('user', userProps);

      setData({
        user: userProps,
        saveRequest: {
          request: true,
          lastSave: data.saveRequest.lastSave,
          deletedNotes: [],
        },
      });
      await loadProfilePicture(userProps.id);
      await loadNotes(userProps.id);
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    store.reset('user');

    setProfilePicture(PlaceholderPicture);

    const saveRequest = {
      request: false,
      lastSave: new Date().toLocaleTimeString('pt-BR'),
      deletedNotes: [],
    };

    setData({
      user: {
        id: '',
        name: '',
        email: '',
      },
      saveRequest,
    });
  }

  async function DeleteAccount() {
    if (
      window.confirm('Tem certeza que deseja APAGAR a conta e todas anotações?')
    ) {
      await api.delete(`/users/${data.user.id}`);
      /* store.reset('notes'); */
      store.reset('user');

      const saveRequest = {
        request: false,
        lastSave: new Date().toLocaleTimeString('pt-BR'),
        deletedNotes: [],
      };

      setData({
        user: {
          id: '',
          name: '',
          email: '',
        },
        saveRequest,
      });
    }
  }

  function setSaveRequest() {
    const saveRequest = {
      request: true,
      lastSave: data.saveRequest.lastSave,
      deletedNotes: data.saveRequest.deletedNotes,
    };

    setData({
      user: data.user,
      saveRequest,
    });
  }

  function addDeletedNote(id: string) {
    const saveRequest = {
      request: true,
      lastSave: data.saveRequest.lastSave,
      deletedNotes: [...data.saveRequest.deletedNotes, id],
    };

    setData({
      user: data.user,
      saveRequest,
    });
  }

  function resetSaveRequest() {
    const saveRequest = {
      request: false,
      lastSave: new Date().toLocaleTimeString('pt-BR'),
      deletedNotes: [],
    };

    setData({
      user: data.user,
      saveRequest,
    });
  }

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        saveRequest: data.saveRequest,
        profilePicture,
        signIn,
        signOut,
        DeleteAccount,
        setSaveRequest,
        addDeletedNote,
        resetSaveRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
