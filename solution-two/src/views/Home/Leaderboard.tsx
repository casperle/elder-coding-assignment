import React, { useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';

import { useSnackbarActions } from '@sharedComponents/Snackbar';

import { useStyles, useUsersStatsOnRender, useSorting } from './hooks';
import { DEFAULT_USER_SCORE } from './model/constants';
import { tableColumns } from './tableColumns';

export const Leaderboard: React.FC = () => {
  const classes = useStyles();
  const [usersStats, setUsersStats] = useState(DEFAULT_USER_SCORE);
  const { sorting, handleSortChange } = useSorting();
  const { error: openErrorSnackbar } = useSnackbarActions();

  const {
    loading: usersStatsLoading,
    response: usersStatsResponse,
    errorMessage: usersStatsError,
  } = useUsersStatsOnRender(sorting);

  useEffect(() => {
    if (usersStatsResponse) {
      setUsersStats(usersStatsResponse);
    }
  }, [usersStatsResponse]);

  useEffect(() => {
    if (usersStatsError) {
      openErrorSnackbar(`The following server error happened: ${usersStatsError}`);
    }
  }, [usersStatsError]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DataGrid
          autoHeight
          autoPageSize
          hideFooter
          disableColumnMenu
          disableSelectionOnClick
          loading={usersStatsLoading}
          sortingMode="server"
          rows={usersStats}
          columns={tableColumns}
          onSortModelChange={handleSortChange}
          columnBuffer={tableColumns.length}
        />
      </Paper>
    </div>
  );
};
