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

export class PersoniumCellUrl {
  private _cellUrl: string;
  private _cellName: string;
  private _unitFQDN: string;

  constructor(cellUrl: string) {
    this._cellUrl = cellUrl;
    // https://<cellName>.<unitUrl>/
    const cellfqdn = cellUrl.split('/')[2];
    this._cellName = cellfqdn.split('.')[0];
    this._unitFQDN = cellfqdn
      .split('.')
      .slice(1)
      .join('.');
  }

  get CellName(): string {
    return this._cellName;
  }

  get UnitFQDN(): string {
    return this._unitFQDN;
  }

  toString(): string {
    return this._cellUrl;
  }
}

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
          <ListItem button>
            <ListItemText primary="Box" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Role" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Account" />
          </ListItem>

          <ListItem button onClick={toggleSocialMenu}>
            <ListItemText primary="Social" />
            {openSocialMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSocialMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="External Cell" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Relation" />
              </ListItem>
              <ListItem button className={classes.nested}>
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
              <ListItem button className={classes.nested}>
                <ListItemText primary="Received" />
              </ListItem>
              <ListItem button className={classes.nested}>
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
              <ListItem button className={classes.nested}>
                <ListItemText primary="Log" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Rule" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemText primary="Snapshot" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Info" />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.content}>
        {mode === 1 ? <BoxExplorer /> : null}
      </div>
    </div>
  );
};

CellManager.propTypes = {
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};
