import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import useForm from 'react-hook-form';

import { Button } from 'views/ui';
import { firestore } from 'firebase/initFirebase';

const CreateCategory = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    data.type = 'secondary';
    firestore
      .collection('categories')
      .doc()
      .set(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid item xs={10}>
          <TextField
            inputRef={register}
            label="Name"
            name="title"
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={10}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCategory;
