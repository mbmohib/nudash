import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Error from 'views/components/Error';
import { PreLoader } from 'views/ui';
import { useLocation } from 'react-router-dom';

const Fetcher = ({ fetchData, jwt, label, loading, error, children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParams = {};

  params.forEach((key, value) => {
    queryParams[key] = value;
  });

  useEffect(() => {
    console.log(queryParams);
    fetchData({ queryParams, jwt });
  }, [fetchData]);

  if (loading[label]) return <PreLoader />;
  if (error) return <Error message={error} />;

  return children();
};

const mapStateToProps = ({ ui }) => {
  return {
    loading: ui.loading,
    error: ui.error,
  };
};

export default connect(mapStateToProps)(Fetcher);
