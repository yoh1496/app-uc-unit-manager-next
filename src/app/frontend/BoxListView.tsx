import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
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
  Typography,
  createStyles,
  Link as MUILink,
} from '@material-ui/core';
import { GetBoxListResult, BoxItem } from 'personium-sdk-ts';

const useStyles = makeStyles(theme => ({
  paper: {},
  table: {},
}));

const sampleDat = {
  d: {
    results: [
      {
        __metadata: {
          uri: "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')",
          etag: 'W/"1-1599612203387"',
          type: 'CellCtl.Box',
        },
        Name: 'hcare',
        Schema: null,
        __published: '/Date(1599612203387)/',
        __updated: '/Date(1599612203387)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('hcare')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri:
            "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')",
          etag: 'W/"4-1598515852239"',
          type: 'CellCtl.Box',
        },
        Name: 'app-myboard',
        Schema: 'https://app-personium-line.appdev.personium.io/',
        __published: '/Date(1593682869869)/',
        __updated: '/Date(1598515852239)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-myboard')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri:
            "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')",
          etag: 'W/"1-1598430271388"',
          type: 'CellCtl.Box',
        },
        Name: 'app-ishiguro-02',
        Schema: 'https://app-ishiguro-02.appdev.personium.io/',
        __published: '/Date(1598430271388)/',
        __updated: '/Date(1598430271388)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-02')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri: "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')",
          etag: 'W/"1-1595787116238"',
          type: 'CellCtl.Box',
        },
        Name: 'articles',
        Schema: null,
        __published: '/Date(1595787116238)/',
        __updated: '/Date(1595787116238)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('articles')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri:
            "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')",
          etag: 'W/"1-1593596630683"',
          type: 'CellCtl.Box',
        },
        Name: 'app-ishiguro-01',
        Schema: 'https://app-ishiguro-01.appdev.personium.io/',
        __published: '/Date(1593596630683)/',
        __updated: '/Date(1593596630683)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-ishiguro-01')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri:
            "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')",
          etag: 'W/"1-1592900960195"',
          type: 'CellCtl.Box',
        },
        Name: 'app-personium-trails',
        Schema: 'https://app-personium-trails.appdev.personium.io/',
        __published: '/Date(1592900960195)/',
        __updated: '/Date(1592900960195)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('app-personium-trails')/_Rule",
          },
        },
      },
      {
        __metadata: {
          uri:
            "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')",
          etag: 'W/"1-1589444956946"',
          type: 'CellCtl.Box',
        },
        Name: 'cell-manager',
        Schema: 'https://app-uc-unit-manager.appdev.personium.io/',
        __published: '/Date(1589444956946)/',
        __updated: '/Date(1589444956946)/',
        _Role: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')/_Role",
          },
        },
        _Relation: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')/_Relation",
          },
        },
        _ReceivedMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')/_ReceivedMessage",
          },
        },
        _SentMessage: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')/_SentMessage",
          },
        },
        _Rule: {
          __deferred: {
            uri:
              "https://ishiguro-yo.appdev.personium.io/__ctl/Box('cell-manager')/_Rule",
          },
        },
      },
    ],
  },
};

const useToolbarStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  })
);

const BoxListToolbar: React.FC<{ numSelected: number }> = ({ numSelected }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Box List
        </Typography>
      )}
    </Toolbar>
  );
};

BoxListToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const BoxListItemView: React.FC<{
  checked: boolean;
  onItemChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  onItemClicked: (boxName: string) => void;
  boxDat: BoxItem;
}> = ({ checked, onItemChange, boxDat, onItemClicked }) => {
  const handleItemClicked = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement, MouseEvent>
    ) => {
      onItemClicked(event.currentTarget.name);
    },
    [onItemClicked]
  );
  return (
    <TableRow hover role="checkbox" tabIndex={-1} selected={checked}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={checked}
          onChange={onItemChange}
          name={boxDat.Name}
        />
      </TableCell>
      <TableCell>
        <MUILink
          color="inherit"
          onClick={handleItemClicked}
          component="button"
          name={boxDat.Name}
        >
          {boxDat.Name}
        </MUILink>
      </TableCell>
      <TableCell>{boxDat.Schema || '-'}</TableCell>
      <TableCell>{boxDat.__updated}</TableCell>
      <TableCell>Installation Status</TableCell>
    </TableRow>
  );
};

const BoxListItemPropTypes = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Schema: PropTypes.string.isRequired,
  __metadata: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    etag: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  __published: PropTypes.string.isRequired,
  __updated: PropTypes.string.isRequired,
});

BoxListItemView.propTypes = {
  checked: PropTypes.bool.isRequired,
  onItemChange: PropTypes.func.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  boxDat: BoxListItemPropTypes.isRequired,
};

type BoxListViewProps = {
  boxes: GetBoxListResult;
  onOpen: (boxName: string) => void;
};

export const BoxListView: React.FC<BoxListViewProps> = ({ boxes, onOpen }) => {
  const classes = useStyles();

  const [selected, setSelected] = useState(new Set<string>());
  const numSelected = selected.size;

  const handleItemChange = useCallback<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >(
    e => {
      console.log(e.target);
      console.log(e.target.name, e.target.checked);

      setSelected(c => {
        const newSelected = new Set(c);
        if (e.target.checked) newSelected.add(e.target.name);
        else newSelected.delete(e.target.name);
        return newSelected;
      });
    },
    [setSelected]
  );

  return (
    <Paper className={classes.paper}>
      <BoxListToolbar numSelected={numSelected} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="boxlisttable"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Box</TableCell>
              <TableCell>Schema</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Installation Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxes.d.results.map(boxDat => {
              const checked = selected.has(boxDat.Name);
              const key = `tbl-box-item-${boxDat.Name}`;
              return (
                <BoxListItemView
                  checked={checked}
                  key={key}
                  boxDat={boxDat}
                  onItemChange={handleItemChange}
                  onItemClicked={onOpen}
                />
              );
            })}
          </TableBody>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1} selected={false}>
              <TableCell padding="checkbox">
                <Checkbox checked={false} style={{ display: 'none' }} />
              </TableCell>
              <TableCell>[main]</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

BoxListView.propTypes = {
  boxes: PropTypes.shape({
    d: PropTypes.shape({
      results: PropTypes.arrayOf(BoxListItemPropTypes.isRequired).isRequired,
      __count: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};
