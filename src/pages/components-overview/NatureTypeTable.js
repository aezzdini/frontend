import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, TablePagination} from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import Clients from './Prestation';
import TypeMissionService from 'pages/services/TypeMissionService';
import './TypeMission.css'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import NatureService from 'pages/services/NatureService';

const NatureTypeTable = ({ updateTable ,isAdded }) => {
  const [natures, setNatures] = useState([]);
  const [selectedNature, setSelectedNature] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() =>{
    getAllNature();
  },[isAdded])

  

  

  const getAllNature = () => {
    NatureService.getAllNature(page, rowsPerPage)
      .then((response) => {
        setNatures(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleDeleteNature = (id) =>{
    NatureService.deleteNature(id).then((response) =>{
      getAllNature();
    }).catch(error =>{
      console.log(error);
    })
  };

  const handleUpdateNature = (nature) => {
    setSelectedNature(nature);
    setName(nature.name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedNature(null);
    setOpenDialog(false);
    setName('');
  };

  const handleSaveTypeMission = () => {
    const updatedTypeMission = {
      id: selectedNature.id,
      name: name
    };
    NatureService.updateNature(selectedNature.id, updatedTypeMission)
      .then(response => {
        getAllNature(); // fetch the updated data from the server
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
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Type</TableCell>
            {/** 
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Type</TableCell>*/}
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {natures
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((nature) => (
 
          
            <TableRow key={nature.id}>
              {/*<TableCell>{nature.id}</TableCell>*/}
              <TableCell >{nature.name}</TableCell>
              {/** 
              <TableCell >{nature.type?.name ?? ''}</TableCell>*/}
              <td>
  <IconButton onClick={() => handleUpdateNature(nature)} aria-label="Modifier" style={{ color: 'blue', marginLeft: '25px' }}>
    <EditIcon />
  </IconButton>
  <IconButton onClick={() => handleDeleteNature(nature.id)} aria-label="Supprimer" style={{ color: 'red' }}>
    <DeleteIcon />
  </IconButton>
</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={natures.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifier type</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSaveTypeMission} sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}>Modifier</Button>
          <Button variant="outlined" onClick={handleCloseDialog}sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }}>Annuler</Button>
          
</DialogActions>
</Dialog>
</div>
);
};

export default NatureTypeTable;