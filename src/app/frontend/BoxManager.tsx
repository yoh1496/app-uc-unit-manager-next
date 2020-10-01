import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { PersoniumBoxUrl } from 'personium-sdk-ts';
import { WebDAVExplorer } from './WebDAVExplorer';

export const BoxManager: React.FC<{ boxUrl: PersoniumBoxUrl }> = ({
  boxUrl,
}) => {
  return (
    <>
      <Typography variant="h6">← {boxUrl.BoxName}</Typography>
      <WebDAVExplorer boxUrl={boxUrl} />
    </>
  );
};

BoxManager.propTypes = {
  boxUrl: PropTypes.instanceOf(PersoniumBoxUrl).isRequired,
};
