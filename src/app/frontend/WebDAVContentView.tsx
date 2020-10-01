import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getProperties,
  PersoniumBoxUrl,
  PersoniumWebDAVContentUrl,
} from 'personium-sdk-ts';
import { useAppConfig } from './AppConfig';
import { useAppAuth } from './AppAuthProvider';
import { useWebDAVExplorerContext } from './WebDAVExplorerContext';

export const WebDAVContentView: React.FC<{ boxUrl: PersoniumBoxUrl }> = ({
  boxUrl,
}) => {
  const { explorerState } = useWebDAVExplorerContext();
  const { config } = useAppConfig();
  const { auth } = useAppAuth();

  useEffect(() => {
    console.log('useEffect#WebDAVContentView');
    if (auth === null || auth.token === null) throw 'Authorization Required';

    getProperties(
      new PersoniumWebDAVContentUrl(boxUrl, explorerState.path),
      auth.token.access_token
    );
  }, [explorerState, boxUrl, auth]);
  return <div>{explorerState.path}</div>;
};

WebDAVContentView.propTypes = {
  boxUrl: PropTypes.instanceOf(PersoniumBoxUrl).isRequired,
};
