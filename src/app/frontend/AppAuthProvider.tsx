import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  PersoniumCellUrl,
  PersoniumToken,
  authWithROPC,
} from 'personium-sdk-ts';

type AppAuth = {
  token: null | PersoniumToken;
};

const AppAuthDefault = {
  token: null,
};

type AppAuthContextType = [
  AppAuth,
  undefined | React.Dispatch<React.SetStateAction<AppAuth>>
];

const AppAuthContext = React.createContext<AppAuthContextType>([
  AppAuthDefault,
  undefined,
]);

export const useAppAuth: () => {
  auth: AppAuth;
  authWithROPC: (
    cellUrl: PersoniumCellUrl,
    username: string,
    password: string
  ) => Promise<void>;
} = () => {
  const [auth, _setAuth] = useContext(AppAuthContext);

  if (!_setAuth) throw '_setAuth is not provided.';

  const _authWithROPC = useCallback(
    async (cellUrl, username, password) => {
      const result = await authWithROPC(cellUrl, { username, password });
      _setAuth({ token: result });
    },
    [_setAuth]
  );

  return { auth, authWithROPC: _authWithROPC };
};

export const AppAuthProvider: React.FC = ({ children }) => {
  const [config, _setConfig] = useState<AppAuth>(AppAuthDefault);

  return (
    <AppAuthContext.Provider value={[config, _setConfig]}>
      {children}
    </AppAuthContext.Provider>
  );
};

AppAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
