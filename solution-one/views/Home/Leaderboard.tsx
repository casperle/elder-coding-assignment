import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { getUsersStats, USERS_STATS_DEFAULT_SORTING } from '@api/leaderboard';
import { useSnackbarActions } from '@sharedComponents/Snackbar';

import { modifyUsersStats } from './modifiers';

const defaultUsersStats = [];

const columns = [
  {
    field: 'userNameLink',
    sortable: false,
    headerName: 'User name',
    width: 200,
    renderCell: (params) => <Link href={`/users/${params.getValue('id')}`}>{params.getValue('userName')}</Link>,
  },
  { field: 'wins', headerName: 'Number of wins', type: 'number', width: 150 },
  { field: 'losses', headerName: 'Number of losses', type: 'number', width: 150, sortable: false },
  {
    field: 'averageScore',
    headerName: 'Average score',
    type: 'number',
    width: 150,
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
  }),
);

export const Leaderboard = ({ usersStats }) => {
  const classes = useStyles();
  const [localUsersStats, setLocalUsersStats] = useState(usersStats);
  const [sorting, setSorting] = useState(USERS_STATS_DEFAULT_SORTING);
  const { error: openErrorSnackbar } = useSnackbarActions();

  const loadUsersStats = useCallback(async () => {
    try {
      const usersStats = await getUsersStats(sorting);

      setLocalUsersStats(modifyUsersStats(usersStats));
    } catch (e) {
      openErrorSnackbar(`Data loading failed. Please contact the server administrator. Error code: ${e.code}`);
    }
  }, [getUsersStats, setLocalUsersStats, sorting]);

  // Reload when the sorting change
  useEffect(() => {
    loadUsersStats();
  }, [loadUsersStats]);

  const handleSortChange = useCallback(
    ({ sortModel }) => {
      let sorting = USERS_STATS_DEFAULT_SORTING;

      if (sortModel && sortModel[0]) {
        const { field: sortBy, sort: order } = sortModel[0];
        sorting = { sortBy, order };
      }

      setSorting(sorting);
    },
    [setSorting],
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DataGrid
          autoHeight
          autoPageSize
          hideFooter
          disableColumnMenu
          disableSelectionOnClick
          sortingMode="server"
          rows={localUsersStats || defaultUsersStats}
          columns={columns}
          onSortModelChange={handleSortChange}
        />
      </Paper>
    </div>
  );
};
