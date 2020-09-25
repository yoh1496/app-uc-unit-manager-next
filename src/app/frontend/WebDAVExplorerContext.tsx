import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

type WebDAVExplorerState = {
  path: string;
};

type WebDAVExplorerContextType = [
  WebDAVExplorerState,
  undefined | React.Dispatch<React.SetStateAction<WebDAVExplorerState>>
];

const defaultExplorerState: WebDAVExplorerState = {
  path: '/',
};

const WebDAVExplorerContext = React.createContext<WebDAVExplorerContextType>([
  defaultExplorerState,
  undefined,
]);

export const WebDAVExplorerContextProvider: React.FC = ({ children }) => {
  const [explorerState, setExplorerState] = useState<WebDAVExplorerState>(
    defaultExplorerState
  );

  return (
    <WebDAVExplorerContext.Provider value={[explorerState, setExplorerState]}>
      {children}
    </WebDAVExplorerContext.Provider>
  );
};

WebDAVExplorerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useWebDAVExplorerContext(): {
  explorerState: WebDAVExplorerState;
  setPath: (newPath: string) => void;
} {
  const [explorerState, setExplorerState] = useContext(WebDAVExplorerContext);

  if (setExplorerState === undefined)
    throw 'illegal usage: setExplorerState is undefined';

  const setPath = useCallback(
    (newPath: string) => {
      setExplorerState(c => Object.assign({}, c, { path: newPath || '/' }));
    },
    [setExplorerState]
  );

  return { explorerState, setPath };
}
