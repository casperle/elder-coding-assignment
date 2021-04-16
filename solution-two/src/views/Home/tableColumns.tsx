import Link from 'next/link';

import MuiLink from '@material-ui/core/Link';

export const tableColumns = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'userName',
    sortable: false,
    headerName: 'User name',
    width: 200,
    renderCell: (params) => (
      <Link href={`/users/${params.getValue('id')}`}>
        <MuiLink href={`/users/${params.getValue('id')}`} className="column-user-name">
          {params.getValue('userName')}
        </MuiLink>
      </Link>
    ),
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
