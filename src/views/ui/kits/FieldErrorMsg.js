import React from 'react';
import { Typography } from 'views/ui';

const FieldErrorMsg = ({ error, isTouched }) => {
  return (
    <>
      {isTouched && error && (
        <Typography variant="subtitle1" color="error" align="left">
          {error}
        </Typography>
      )}
    </>
  );
};

export default FieldErrorMsg;
