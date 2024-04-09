import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';




export default function TicketUpdate() {  
  const { id } = useParams();
  const statusOptions = {
    1: 'Pending',
    2: 'Rejected',
    3: 'Resolved',
    4: 'Accepted'
  };
  
  const statusValues = {
    'Pending' : 1,
    'Rejected' : 2,
    'Resolved' : 3,
    'Accepted' : 4
  };
  
  useEffect(() => {
    fetch("http://localhost:4000/ticket/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setTitle(result[0].Title)
          setDescription(result[0].Description)
          setContactInformation(result[0].ContactInformation)
          setStatus(statusOptions[result[0].Status])
        }
      )
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': id,
      'Title': Title,
      'Description': Description,
      'ContactInformation': ContactInformation,
      'Status': statusValues[Status],
    }
    fetch('http://localhost:4000/updateTicket/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  }

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [ContactInformation, setContactInformation] = useState('');
  const [Status, setStatus] = useState('');
  return (
    <Container sx={{ p:2 }} maxWidth="sm">    
      <div>
        <Typography component="h1" variant="h5">
          Update Ticket
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
                value={Title} 
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={5}>
              <Select
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {Object.values(statusOptions).map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
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
                value={Description} 
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
                value={ContactInformation} 
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
                Update
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}