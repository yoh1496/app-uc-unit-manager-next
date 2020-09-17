import React from 'react';
import {
  Paper,
  makeStyles,
  Toolbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { BoxListView } from './BoxListView';

const useStyles = makeStyles(theme => ({
  paper: {},
  table: {},
}));

export const BoxExplorer: React.FC = () => {
  const classes = useStyles();

  return <BoxListView />;
};
