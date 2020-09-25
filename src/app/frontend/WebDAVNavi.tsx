import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Link as MUILink,
  Breadcrumbs,
  Box,
} from '@material-ui/core';
import { useWebDAVExplorerContext } from './WebDAVExplorerContext';

export const WebDAVNavi: React.FC<{ rootName: string }> = ({ rootName }) => {
  const { explorerState, setPath } = useWebDAVExplorerContext();
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [pathEdit, setPathEdit] = useState<string>('');

  const handleStartEdit = useCallback(() => {
    setPathEdit(explorerState.path);
    setModeEdit(true);
  }, [explorerState.path, setModeEdit]);

  const handleSubmit = useCallback(() => {
    setPath(pathEdit);
    setModeEdit(false);
  }, [pathEdit, setModeEdit, setPath]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPathEdit(e.currentTarget.value);
    },
    [setPathEdit]
  );

  const breadCrumbsParts = useMemo(() => {
    return [
      rootName,
      ...explorerState.path.split('/').filter(part => part !== ''),
    ];
  }, [rootName, explorerState.path]);

  const handleBreadCrumbClick = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>
    ) => {
      setPath(
        [
          '',
          ...explorerState.path
            .split('/')
            .filter(part => part !== '')
            .slice(0, parseInt(e.currentTarget.value)),
        ].join('/')
      );
    },
    [explorerState.path, setPath]
  );

  if (modeEdit) {
    return (
      <Box display="flex">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={pathEdit} />
        </form>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumbsParts.map((part, idx) => (
          <MUILink
            color={
              idx === breadCrumbsParts.length - 1 ? 'textPrimary' : 'inherit'
            }
            component="button"
            value={idx}
            onClick={handleBreadCrumbClick}
            key={`breadcrumbsparts-${part}`}
          >
            {part}
          </MUILink>
        ))}
      </Breadcrumbs>
      <button onClick={handleStartEdit}>Edit</button>
    </Box>
  );
};

WebDAVNavi.propTypes = {
  rootName: PropTypes.string.isRequired,
};
