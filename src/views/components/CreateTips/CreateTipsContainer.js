import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { metaActions } from 'store/meta';
import CreateTips from './CreateTips';

const CreateTipsContainer = () => {
  const dispatch = useDispatch();
  const categories = useSelector(({ meta }) => meta.categories);

  useEffect(() => {
    dispatch(metaActions.getCategories());
  }, [dispatch]);

  return <CreateTips categories={categories} />;
};

export default CreateTipsContainer;
