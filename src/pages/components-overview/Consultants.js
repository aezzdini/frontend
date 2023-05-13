import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer,TablePagination, TableHead, TableRow, Paper, Button, IconButton} from '@mui/material';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Edit, Visibility } from '@mui/icons-material';
const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
    const navigate = useNavigate();

  const handleViewConsultant = (consultantId) => {
    navigate(`/viewConsultant/${consultantId}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const fetchConsultants = async () => {
      const token = localStorage.getItem('token');
      console.log("this is tooken"+token)
      const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      setConsultants(response.data);
    };

    fetchConsultants();
  }, []);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, consultants.length - page * rowsPerPage);
  if (consultants.length === 0) {
    return <div>No consultants found.</div>;
  }

  return (
    
    <div>
      <h3>Liste des Consultants</h3>
      <Paper style={{ padding: '1rem' }} >


      <Button variant="contained" color="primary" component={Link} to="/AddConsultant">ajouter nouveau consultant</Button>
      
      
      <TableContainer  style={{ marginTop: '1rem' }} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Poste</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          {
          (rowsPerPage > 0
            ? consultants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            :
            consultants).map((consultant) => (
              <TableRow key={consultant.id}>
                <TableCell>{consultant.firstName}</TableCell>
                <TableCell>{consultant.lastName}</TableCell>
                <TableCell>{consultant.email}</TableCell>
                <TableCell>{consultant.poste ? consultant.poste : '-'  }</TableCell>
                <TableCell>
                 
                  {/* <IconButton
                  // <Link to={`/viewConsultant/${consultant.id}`}> */}
                     <IconButton aria-label="view" onClick={() => handleViewConsultant(consultant.id)} style={{ color: 'yellow' }} >
                  <Visibility   />
                  </IconButton> 
                  {/* <Link to={`/consultants/${consultant.id}/edit`}>
                  <Edit />
                  </Link> */}
                </TableCell>
              </TableRow>
            ))}

{emptyRows > 0 && (
<TableRow style={{ height: 53 * emptyRows }}>
<TableCell colSpan={10} />
</TableRow>
)}
          </TableBody>
        </Table>
        <TablePagination
rowsPerPageOptions={[5, 10, 25]}
component="div"
count={consultants.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>


      </TableContainer>

      
      </Paper>
    </div>
  );
};

export default ConsultantList;
