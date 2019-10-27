import React, { useState, useEffect } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close />
        </IconButton>,
      ]}
    />
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
