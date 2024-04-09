import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function TicketCreate() {  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'Title': Title,
      'Description': Description,
      'ContactInformation': ContactInformation,
    }
    fetch('http://localhost:4000/create', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      return res.json();
    })
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
    .catch(error => console.error('Error:', error));
  }

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [ContactInformation, setContactInformation] = useState('');
  return (
    <Container sx={{ p:2 }} maxWidth="sm">    
      <div>
        <Typography component="h1" variant="h5">
          Create Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt:2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="title"
                name="titleName"
                variant="outlined"
                required
                fullWidth
                id="titleName"
                label="Title Name"
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={2}
                id="Description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={5}
                id="ContactInformation"
                label="Contact Information"
                onChange={(e) => setContactInformation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}