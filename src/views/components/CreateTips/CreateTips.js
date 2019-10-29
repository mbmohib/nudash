import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import useForm from 'react-hook-form';

import { firestore } from 'firebase/initFirebase';
import { Button, Wrapper, Select } from 'views/ui';

const CreateTips = ({ categories }) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    register({ name: 'categories' });
  }, [register]);

  const handleSelectMenuChange = (type, value) => {
    setValue(type, value);
  };

  const onSubmit = values => {
    firestore
      .collection('tips')
      .doc()
      .set(values, function(error) {
        if (error) {
          console.log(error);
          // The write failed...
        } else {
          // Data saved successfully!
          console.log('Data saved successfully!');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TextField
            multiline
            label="Description"
            margin="dense"
            variant="outlined"
            fullWidth
            name="description"
            inputRef={register}
            rows={4}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Image Link"
            margin="dense"
            variant="outlined"
            fullWidth
            name="image"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            inputRef={register}
            label="Source"
            margin="dense"
            variant="outlined"
            fullWidth
            name="source"
          />
        </Grid>
        <Grid item xs={10}>
          <Select
            label="categories"
            options={categories}
            register={register}
            handleSelectMenuChange={handleSelectMenuChange}
          />
        </Grid>

        <Grid item xs={10}>
          <Wrapper flex justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="small"
              ml={1}
              type="submit"
            >
              Create Tips
            </Button>
          </Wrapper>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateTips;
