import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { BoxListView } from './BoxListView';
import { useAppAuth } from './AppAuthProvider';
import { useGetBoxList } from './lib/Personium/Util/usePersoniumBox';
import { useAppConfig } from './AppConfig';
import { BoxManager } from './BoxManager';
import { useRouteMatch, useHistory, Route } from 'react-router-dom';
import { PersoniumBoxUrl, PersoniumCellUrl } from 'personium-sdk-ts';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
  nothidden: {
    display: 'unset',
  },
  paper: {},
  table: {},
}));

type BoxParams = {
  box_name: string;
};

export const BoxExplorer: React.FC<{ cellUrl: PersoniumCellUrl }> = ({
  cellUrl,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { url: currentUrl } = useRouteMatch();
  const match = useRouteMatch<BoxParams>({ path: `${currentUrl}/:box_name/` });

  const { auth } = useAppAuth();
  const { config } = useAppConfig();

  if (!auth.token) throw 'Not authenticated';

  const { loading, boxes } = useGetBoxList(cellUrl, auth.token.access_token);

  const boxMatched = null !== match;

  useEffect(() => {
    console.log('route updated: ', match);
  }, [match]);

  const classBoxListView = useMemo(() => {
    if (boxMatched) return classes.hidden;
    return classes.nothidden;
  }, [boxMatched, classes]);

  const classBoxManager = useMemo(() => {
    if (!boxMatched) return classes.hidden;
    return classes.nothidden;
  }, [boxMatched, classes]);

  const selectedBoxUrl = useMemo(() => {
    return new PersoniumBoxUrl(cellUrl, match ? match.params.box_name : '__');
  }, [cellUrl, match]);

  const handleOpenBox = useCallback(
    (boxName: string) => {
      history.push(`${currentUrl}/${boxName}/`);
    },
    [currentUrl, history]
  );

  if (loading) return <div>Loading</div>;

  if (boxes === null) return <div>Nothing</div>;

  return (
    <>
      <div className={classBoxListView}>
        <BoxListView boxes={boxes} onOpen={handleOpenBox} />
      </div>
      <div className={classBoxManager}>
        <Route path="/box/:box_name/">
          <BoxManager boxUrl={selectedBoxUrl} />
        </Route>
      </div>
    </>
  );
};

BoxExplorer.propTypes = {
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};
