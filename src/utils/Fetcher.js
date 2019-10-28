import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Error from 'views/components/Error';
import { PreLoader } from 'views/ui';

const Fetcher = ({ fetchData, label, children }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ ui }) => ({
    loading: ui.loading,
    error: ui.error,
  }));

  useEffect(() => {
    dispatch(fetchData());
  }, [fetchData]);

  if (loading[label]) return <PreLoader />;
  if (error) return <Error message={error} />;

  return children();
};

export default Fetcher;
