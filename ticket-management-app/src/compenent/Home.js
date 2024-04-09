import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";

export default function UserList() {
  const [ticket, setTickets] = useState([]);
  const [status, setStatus] = useState({});
  useEffect(() => {
    TicketGet()
    StatusGet()
    fetchTicketsByStatus(1)
  }, [])
  
  const StatusGet = () => {
    fetch(`http://localhost:4000/status`)
      .then(res => res.json())
      .then(
        (result) => {
          const statusNames = result.data.reduce((acc, status) => {
            acc[status.id] = status.nameStatus;
            return acc;
          }, {});
          setStatus(statusNames);
        }
      )
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }

  const TicketGet = () => {
    fetch(`http://localhost:4000/tickets`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setTickets(result.data)
        }
      )
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }

  function fetchTicketsByStatus(status) {
    fetch(`http://localhost:4000/categorizeTicket?status=${status}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTickets(data.data)
      })
      .catch(error => console.error('Error:', error));
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
 }

  return (
    <Container sx={{ p:2 }} maxWidth="lg">    
      <Paper sx={{ p:2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Ticket
            </Typography>
          </Box>
          <Box>
          <Link to="/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box>
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button size="small" variant="contained" sx={{ background: "#039be5" }} onClick={() => fetchTicketsByStatus(1)}>
            Pending
          </Button>
          <Button size="small" variant="contained" sx={{ background: "#f6734b" }} onClick={() => fetchTicketsByStatus(2)}>
            Rejected
          </Button>
          <Button size="small" variant="contained" sx={{ background: "#7cb342" }} onClick={() => fetchTicketsByStatus(3)}>
            Resolved
          </Button>
          <Button size="small" variant="contained" sx={{ background: "#5b874b" }} onClick={() => fetchTicketsByStatus(4)}>
            Accepted
          </Button>
        </Stack>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticket.map((ticket) => (
              <TableRow key={ticket.id}>
              <TableCell align="right">{ticket.id}</TableCell>
              <TableCell align="left">{ticket.Title}</TableCell>
              <TableCell align="left">{status[ticket.Status]}</TableCell>
              <TableCell align="center">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button onClick={() => UpdateUser(ticket.id)}>Edit</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </Container>
    
  );
}