import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { BoxExplorer } from './BoxExplorer';
import { PersoniumCellUrl } from './lib/Personium/common';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: { display: 'flex', flexGrow: 1 },
  drawerHeader: { paddingLeft: theme.spacing(4), paddingTop: theme.spacing(2) },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

type CellManagerProps = {
  cellUrl: PersoniumCellUrl;
};

function useTogglableState(defaultValue: boolean): [boolean, () => void] {
  const [flag, setFlag] = useState(defaultValue);
  const toggleFlag = useCallback(() => {
    setFlag(c => !c);
  }, [setFlag]);
  return [flag, toggleFlag];
}

function Menu404() {
  const match = useLocation();
  return <div>{match.pathname} does not match any routes.</div>;
}

export const CellManager: React.FC<CellManagerProps> = ({ cellUrl }) => {
  const classes = useStyles();
  const [mode] = useState(1);

  const [openSocialMenu, toggleSocialMenu] = useTogglableState(false);
  const [openMessageMenu, toggleMessageMenu] = useTogglableState(false);
  const [openEventMenu, toggleEventMenu] = useTogglableState(false);

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <Typography variant="h5" className={classes.drawerHeader}>
          {cellUrl.CellName}
        </Typography>
        <List component="nav" aria-label="">
          <ListItem button component={Link} to="/box">
            <ListItemText primary="Box" />
          </ListItem>
          <ListItem button component={Link} to="/role">
            <ListItemText primary="Role" />
          </ListItem>
          <ListItem button component={Link} to="/account">
            <ListItemText primary="Account" />
          </ListItem>

          <ListItem button onClick={toggleSocialMenu}>
            <ListItemText primary="Social" />
            {openSocialMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSocialMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/extcell"
              >
                <ListItemText primary="External Cell" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/relation"
              >
                <ListItemText primary="Relation" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/extrole"
              >
                <ListItemText primary="External Role" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={toggleMessageMenu}>
            <ListItemText primary="Message" />
            {openMessageMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openMessageMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/received_message"
              >
                <ListItemText primary="Received" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/sent_message"
              >
                <ListItemText primary="Sent" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={toggleEventMenu}>
            <ListItemText primary="Event" />
            {openEventMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEventMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/event_log"
              >
                <ListItemText primary="Log" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to="/event_rule"
              >
                <ListItemText primary="Rule" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/snapshot">
            <ListItemText primary="Snapshot" />
          </ListItem>
          <ListItem button component={Link} to="/info">
            <ListItemText primary="Info" />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.content}>
        <Switch>
          <Route path="/box">
            <BoxExplorer cellUrl={cellUrl} />
          </Route>
          <Redirect from="/" exact to="/box" />
          <Route>
            <Menu404 />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

CellManager.propTypes = {
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};
