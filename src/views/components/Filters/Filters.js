import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Select } from 'views/ui';
import { useQueryParams } from 'hooks';

const Filters = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { userTypes, userStatus } = useSelector(({ meta }) => ({
    userTypes: meta.userTypes,
    userStatus: meta.userStatus,
  }));
  const [handleQueryParamsChange] = useQueryParams();

  React.useEffect(() => {
    register({ name: 'status' });
    register({ name: 'types' });
    register({ name: 'skills' });
  }, [register]);

  const handleSelectMenuChange = (type, value) => {
    setValue(type, value);
  };

  const onSubmit = values => {
    handleQueryParamsChange(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Keyword"
              margin="dense"
              variant="outlined"
              fullWidth
              name="keyword"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Email"
              margin="dense"
              variant="outlined"
              fullWidth
              name="email"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              inputRef={register}
              label="Mobile"
              margin="dense"
              variant="outlined"
              fullWidth
              name="phone"
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Select
              label="status"
              options={userStatus}
              register={register}
              handleSelectMenuChange={handleSelectMenuChange}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Select
              label="types"
              options={userTypes}
              handleSelectMenuChange={handleSelectMenuChange}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Select
              label="Role"
              options={userTypes}
              handleSelectMenuChange={handleSelectMenuChange}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Filters;
