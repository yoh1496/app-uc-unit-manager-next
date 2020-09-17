import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

// import { Top } from './Top';
// import { UserPage } from './UserPage';
// import { AppConstant } from './Constants';
// import {
//   PersoniumAuthProvider,
//   PersoniumConfigProvider,
//   PrivateRoute,
//   usePersoniumConfig,
// } from './lib/Personium';

// import { PersoniumAuthPage } from './Auth';
// import { PersoniumBoxProvider } from './lib/Personium/Context/PersoniumBox';

import { CellManager } from './CellManager';
import { PersoniumCellUrl } from './CellManager';

import {
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  makeStyles,
} from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: { display: 'flex' },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    flex: '1 1 100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    flexDirection: 'column',
    display: 'flex',
    // padding: theme.spacing(3),
  },
}));

const AppHeader: React.FC<{ toggleAuthDrawer: () => void }> = ({
  toggleAuthDrawer,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          color="inherit"
          className={classes.appTitle}
        >
          Personium Cell Manager
        </Typography>
        <button onClick={toggleAuthDrawer}>auth</button>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  toggleAuthDrawer: PropTypes.func.isRequired,
};

const AuthInfo: React.FC<{ open: boolean }> = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="right"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>authInfo</div>
    </Drawer>
  );
};

AuthInfo.propTypes = {
  open: PropTypes.bool.isRequired,
};

const AppContent: React.FC = () => {
  const classes = useStyles();
  const cellUrl = new PersoniumCellUrl(
    'https://ishiguro-yo.appdev.personium.io/'
  );
  return (
    <div className={classes.content}>
      <Toolbar />
      <CellManager cellUrl={cellUrl} />
    </div>
  );
};

function AppFooter() {
  return (
    <div
      style={{
        position: 'fixed',
        textAlign: 'center',
        bottom: 0,
        width: '100vw',
        paddingBottom: 8,
      }}
    >
      This app is based on{' '}
      <a href="https://github.com/personium/personium-blank-app">
        personium-blank-app
      </a>
    </div>
  );
}

// function AppInitializer({ handleInitialized }) {
//   const { setConfig } = usePersoniumConfig();

//   useEffect(() => {
//     // Boot Script
//     const currentHash = location.hash.replace(/^#\/?/g, '#');

//     let targetCell = null;

//     // load cell parameter from localStorage
//     if (localStorage.getItem('lastLoginCell')) {
//       targetCell = localStorage.getItem('lastLoginCell');
//     }

//     // handling cell parameter
//     if (currentHash.startsWith('#cell')) {
//       const hashParams = new URLSearchParams(currentHash.replace(/^#\/?/g, ''));
//       if (hashParams.has('cell')) {
//         targetCell = hashParams.get('cell');
//         hashParams.delete('cell');
//       }
//       location.hash = '/';
//     }

//     setConfig.rawSetConfig(c => {
//       const newState = Object.assign({}, c, {
//         targetCellUrl: targetCell,
//         appCellUrl: AppConstant.cellUrl,
//       });
//       console.log(newState);
//       return newState;
//     });
//     handleInitialized(true);
//   }, [setConfig, handleInitialized]);

//   return null;
// }

export function App() {
  // const [initialized, setInitialized] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = useCallback(() => {
    setOpen(c => !c);
  }, [setOpen]);

  return (
    <HashRouter>
      <AppHeader toggleAuthDrawer={handleDrawerToggle} />
      <AppContent />
      <AuthInfo open={open} />
    </HashRouter>
  );

  // return (
  //   <PersoniumConfigProvider>
  //     {!initialized ? (
  //       <>
  //         <AppInitializer handleInitialized={setInitialized} />
  //         <div>Initializing...</div>
  //       </>
  //     ) : (
  //       <HashRouter>
  //         <PersoniumAuthProvider>
  //           <PersoniumBoxProvider>
  //             <AppHeader />
  //             <Switch>
  //               <Route path="/" exact>
  //                 <Top />
  //               </Route>
  //               <PrivateRoute path="/user" authPath="/login">
  //                 <UserPage />
  //               </PrivateRoute>
  //               <Route path="/login">
  //                 <PersoniumAuthPage />
  //               </Route>
  //               <Route path="*">
  //                 <h2>Does not match any Route</h2>
  //                 <div>
  //                   <Link to="/">Top</Link>
  //                 </div>
  //               </Route>
  //             </Switch>
  //             <AppFooter />
  //           </PersoniumBoxProvider>
  //         </PersoniumAuthProvider>
  //       </HashRouter>
  //     )}
  //   </PersoniumConfigProvider>
  // );
}
