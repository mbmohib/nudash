import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';

const TransactionFilters = () => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              id="outlined-name"
              label="Name"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              id="outlined-name"
              label="Name"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              id="outlined-name"
              label="Name"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Skills
              </InputLabel>
              <Select
                labelWidth={labelWidth}
                autoWidth
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TransactionFilters;
