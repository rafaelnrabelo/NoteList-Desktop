import React from 'react';

import { UserProvider } from './User';
import { ConfigProvider } from './Config';
import { NotesProvider } from './Notes';

const HooksProvider: React.FC = ({ children }) => {
  return (
    <ConfigProvider>
      <UserProvider>
        <NotesProvider>{children}</NotesProvider>
      </UserProvider>
    </ConfigProvider>
  );
};

export default HooksProvider;
