import { useCallback, useState, useEffect } from 'react';

import { getBoxList, GetBoxListResult } from '../box';
import { PersoniumCellUrl } from '../common';

export function useGetBoxList(
  cellUrl: PersoniumCellUrl,
  access_token: string
): {
  status: string;
  error: string;
  loading: boolean;
  boxes: null | GetBoxListResult;
} {
  const [status] = useState('');
  const [boxes, setBoxes] = useState<null | GetBoxListResult>(null);
  const [error] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getBoxList(cellUrl, access_token);
      setBoxes(res);
      setLoading(false);
    })();

    return;
  }, []);

  return { status, error, loading, boxes };
}
