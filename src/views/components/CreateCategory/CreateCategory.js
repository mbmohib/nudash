import React from 'react';
import TextField from '@material-ui/core/TextField';
import useForm from 'react-hook-form';

import { Button } from 'views/ui';
import { firestore } from 'firebase/initFirebase';

const CreateCategory = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    data.type = 'secondary';
    firestore
      .collection('categories')
      .doc()
      .set(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        label="Name"
        name="title"
        margin="normal"
      />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateCategory;
