import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import useForm from 'react-hook-form';
import { Button, Wrapper, Select } from 'views/ui';

const CreateTips = ({ onSubmit, categories }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register({ name: 'categories' });
  }, [register]);

  const handleSelectMenuChange = (type, value) => {
    setValue(type, value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TextField
            label="Description"
            margin="dense"
            variant="outlined"
            fullWidth
            name="description"
            inputRef={register}
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
            label="Mobile"
            margin="dense"
            variant="outlined"
            fullWidth
            name="phone"
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
