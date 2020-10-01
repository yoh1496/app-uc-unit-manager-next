import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { PersoniumBoxUrl } from 'personium-sdk-ts';
import { WebDAVExplorerContextProvider } from './WebDAVExplorerContext';
import { WebDAVNavi } from './WebDAVNavi';
import { WebDAVContentView } from './WebDAVContentView';

type WebDAVParams = {
  content_path: string;
};

export const WebDAVExplorer: React.FC<{ boxUrl: PersoniumBoxUrl }> = ({
  boxUrl,
}) => {
  const { url: currentUrl } = useRouteMatch();
  const match = useRouteMatch<WebDAVParams>({
    path: `${currentUrl}/:content_path`,
  });

  console.log(match);

  return (
    <WebDAVExplorerContextProvider>
      <WebDAVNavi rootName={boxUrl.BoxName} />
      <WebDAVContentView boxUrl={boxUrl} />
    </WebDAVExplorerContextProvider>
  );
};

WebDAVExplorer.propTypes = {
  boxUrl: PropTypes.instanceOf(PersoniumBoxUrl).isRequired,
};
