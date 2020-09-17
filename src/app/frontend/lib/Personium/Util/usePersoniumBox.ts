import { useCallback, useState } from 'react';
import { string } from 'prop-types';

interface PersoniumCellUrl {
  cellName: string;
  unitUrl: string;
}

interface GetBoxListResult {
  d: BoxList;
}

interface BoxList {
  results: Array<BoxItem>;
  __count: string;
}

type PersoniumDate = string;

export interface BoxItem {
  __metadata: BoxMetadata;
  __published: PersoniumDate;
  __updated: PersoniumDate;
  Name: string;
  Schema: string | null;
}

interface BoxMetadata {
  uri: string;
  etag: string;
  type: string;
}

export function useGetBoxList(
  cellUrl: PersoniumCellUrl,
  access_token: string
): {
  status: string;
  error: string;
  getBoxList: () => Promise<GetBoxListResult>;
} {
  const [status] = useState('');
  const [error] = useState('');

  const getBoxList = useCallback(async () => {
    const res = await fetch(`${cellUrl}__ctl/Box`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    });

    const jsonData = await res.json();
    return jsonData as GetBoxListResult;
  }, [cellUrl, access_token]);
  return { status, error, getBoxList };
}
