import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Table,TableBody,TableCell,TableHead,TableRow,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,TablePagination} from '@mui/material';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TypeMissionService from 'pages/services/TypeMissionService';
import './TypeMission.css'

const TypeMissionTable = ({ updateTable ,isAdded }) => {
  const [typemissions, setTypeMissions] = useState([]);
  const [selectedTypeMission, setSelectedTypeMission] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() =>{
    getAllTypeMission();
  },[isAdded])

  

  

  const getAllTypeMission= () =>{
    TypeMissionService.getAllTypeMission().then((response) => {
      setTypeMissions(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleDeleteTypeMission = (id) =>{
    TypeMissionService.deleteTypeMission(id).then((response) =>{
      getAllTypeMission();
    }).catch(error =>{
      console.log(error);
    })
  };

  const handleUpdateTypeMission = (typemission) => {
    setSelectedTypeMission(typemission);
    setName(typemission.name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTypeMission(null);
    setOpenDialog(false);
    setName('');
  };

  const handleSaveTypeMission = () => {
    const updatedTypeMission = {
      id: selectedTypeMission.id,
      name: name
    };
    TypeMissionService.updateTypeMission(selectedTypeMission.id, updatedTypeMission)
      .then(response => {
        getAllTypeMission(); // fetch the updated data from the server
        handleCloseDialog(); // close the update popup
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

  return (
    <div>
      <br/>
      <Table style={{backgroundColor: '#EEEEEE' , borderCollapse: 'collapse', borderRadius: '0.7em', overflow: 'hidden'}}>
        <TableHead>
          <TableRow  >
            {/*<TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>ID</TableCell>*/}
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Nom</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {typemissions
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((typemission) => (
            <TableRow key={typemission.id}>
              {/*<TableCell>{typemission.id}</TableCell>*/}
              <TableCell >{typemission.name}</TableCell>
              <td>
  <div>
    <IconButton onClick={() => handleUpdateTypeMission(typemission)} aria-label="Modifier"  style={{ color: 'blue', marginLeft: '25px' }}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => handleDeleteTypeMission(typemission.id)} aria-label="Supprimer" style={{ color: 'red' }}>
      <DeleteIcon />
    </IconButton>
  </div>
</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={typemissions.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifier type mission</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSaveTypeMission} sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}>Modifier</Button>
          <Button variant="outlined" onClick={handleCloseDialog} sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} >Annuler</Button>
          
</DialogActions>
</Dialog>
</div>
);
};

export default TypeMissionTable;