import moment from 'moment';

export const gamesTableColumns = [
  { field: 'scores', hide: true },
  { field: 'winnerId', hide: true },
  {
    field: 'userScore',
    sortable: false,
    headerName: 'User score',
    width: 200,
    renderCell: (params) => {
      const scores = params.getValue('scores');
      const winnerId = params.getValue('winnerId');

      return scores.find((score) => score.memberId === winnerId).score;
    },
  },
  {
    field: 'createdAt',
    sortable: false,
    headerName: 'Date',
    type: 'date',
    width: 150,
    valueFormatter: (params) => moment(params.getValue('createdAt')).format('HH:mm DD.MM.YYYY'),
  },
];
