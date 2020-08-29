import React, { createContext, useState, useContext } from 'react';

import store from '../store/Store';

interface ConfigContextData {
  sideBarWidth: number;
  showLoginDialog: boolean;
  switchLoginDialogOn(): void;
  switchLoginDialogOff(): void;
  changeSideBarWidth(width: number): void;
}

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData);

export const ConfigProvider: React.FC = ({ children }) => {
  const [sideBarWidth, setSideBarWidth] = useState<number>(() => {
    const sideBarWidth = store.get('sideBarWidth') as number;

    return sideBarWidth;
  });
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);

  function switchLoginDialogOn() {
    setShowLoginDialog(true);
  }

  function switchLoginDialogOff() {
    setShowLoginDialog(false);
  }

  function changeSideBarWidth(width: number) {
    store.set('sideBarWidth', width);

    setSideBarWidth(width);
  }

  return (
    <ConfigContext.Provider
      value={{
        showLoginDialog,
        sideBarWidth,
        switchLoginDialogOn,
        switchLoginDialogOff,
        changeSideBarWidth,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig(): ConfigContextData {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
}
