import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PersoniumCellUrl } from 'personium-sdk-ts';

type AppConfig = {
  targetCell: null | PersoniumCellUrl;
  user: null | string;
  password: null | string;
};

const AppConfigDefault = {
  targetCell: null,
  user: null,
  password: null,
};

type AppConfigContextType = [
  AppConfig,
  undefined | React.Dispatch<React.SetStateAction<AppConfig>>
];

const AppConfigContext = React.createContext<AppConfigContextType>([
  AppConfigDefault,
  undefined,
]);

export const useAppConfig: () => {
  config: AppConfig;
  setConfig: (newConfig: AppConfig) => void;
} = () => {
  const [config, _setConfig] = useContext(AppConfigContext);

  if (!_setConfig) throw '_setConfig is not provided.';

  const setConfig = useCallback(
    (newConfig: AppConfig) => {
      _setConfig(newConfig);
    },
    [_setConfig]
  );

  return { config, setConfig };
};

export const AppConfigProvider: React.FC = ({ children }) => {
  const [config, _setConfig] = useState<AppConfig>(AppConfigDefault);

  return (
    <AppConfigContext.Provider value={[config, _setConfig]}>
      {children}
    </AppConfigContext.Provider>
  );
};

AppConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
