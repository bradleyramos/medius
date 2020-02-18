import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Define your project
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Description"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Music type"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Experience Level"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Completion Date"
            fullWidth
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}