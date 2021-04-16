import { useCallback, useMemo, useState } from 'react';

import { USERS_SCORE_DEFAULT_SORTING } from './../model/constants';

export const useSorting = () => {
  const [sorting, setSorting] = useState(USERS_SCORE_DEFAULT_SORTING);

  const handleSortChange = useCallback(
    ({ sortModel }) => {
      let sorting = USERS_SCORE_DEFAULT_SORTING;

      if (sortModel && sortModel[0]) {
        const { field: sortBy, sort: order } = sortModel[0];
        sorting = { sortBy, order };
      }

      setSorting(sorting);
    },
    [setSorting],
  );

  return useMemo(
    () => ({
      sorting,
      handleSortChange,
    }),
    [sorting, handleSortChange],
  );
};
