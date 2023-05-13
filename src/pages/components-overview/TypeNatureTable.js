import React, { useEffect, useState , useRef} from 'react';

import {Table,TableBody,TableCell,TableHead,TableRow,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,FormControl, InputLabel, Select, MenuItem,TablePagination } from '@mui/material';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './TypeMission.css'
import NatureService from 'pages/services/NatureService';

import TypeNatureService from 'pages/services/TypeNatureService';
import Nature from './Nature';

const TypeNatureTable = ({ updateTable , isAdded }) => {
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [typeNature, setTypeNature] = useState([]);
  const [selectedTypeNature, setSelectedTypeNature] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [nature,setNature ]= useState('');
  const [natures,setNatures ]= useState('');
  const [open,setOpen ]= useState('false');
  const [type_id, setType_Id] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [type, setType] = useState({});
  const TypeRef= useRef(null);
  const NameRef = useRef(null);

  const handleClickOpen = (typenature) => {
    setSelectedTypeNature(typenature);
    setName(typenature.name);
    setNature(typenature.nature);
    setNatures(typenature.natures);
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setSelectedTypeNature(null);
    setName('');
    //setNature('');
    //setNatures('');
    setType_Id('');
    setOpenDialog(false);
  };

  useEffect(() =>{
    getAllTypeNature();
    //getAllNature();
  },[isAdded])

/*  const getAllNature = () => {
    NatureService.getAllNature().then((response) => {
      setNatures(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
*/
  const getAllTypeNature= () =>{
    TypeNatureService.getAllTypeNature().then((response)=> {
      setTypeNature(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleDeleteTypeNature = (id) =>{
    TypeNatureService.deleteTypeNature(id).then((response) =>{
      getAllTypeNature();
    }).catch(error =>{
      console.log(error);
    })
  };

  const handleUpdateTypeNature = async (typenature) => {
    handleClickOpen(typenature);
    try {
      const updatedNature = {
        ...selectedTypeNature,
        name: NameRef.current.value,
        type: {
          id: TypeRef.current.value
        }
        ,
      };
      console .log("updated nature",updatedNature)
    
      await TypeNatureService.updateTypeNature(updatedNature.id,updatedNature)
      handleCloseDialog();
    } catch (error) {
      console.error(error);
    }
    
    getAllTypeNature();
  };

  const handleSaveTypeNature = () => {
    const updatedTypeNature = {
      id: selectedTypeNature.id,
      name: name,
      type: selectedTypeId
      //nature: nature,
      //natures: natures
    }; 
    console.log(updatedTypeNature);
    

    TypeNatureService.updateTypeNature(selectedTypeNature.id, updatedTypeNature)
      .then(response => {
        getAllTypeNature(); // fetch the updated data from the server
        handleCloseDialog(); // close the update popup
       
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    NatureService.getAllNature()
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelectedType = (typeId) => {
    setSelectedTypeId(typeId);
  };

  const handleNatureChange = (e) => {
    setNature(e.target.value);
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
          <TableRow>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' }}>Nature</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' }}>Type</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {typeNature
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((typeNature) => (
            <TableRow key={typeNature.id}>
              <TableCell>{typeNature.name}</TableCell>
              <TableCell>{typeNature.type?.name}</TableCell>
              <td>
                <div>
                  <IconButton onClick={() => handleUpdateTypeNature(typeNature)} aria-label="Modifier" style={{ color: 'blue', marginLeft: '25px' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTypeNature(typeNature.id)} aria-label="Supprimer" style={{ color: 'red'}}>
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
      count={typeNature.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  
      {/* Popup for updating type nature */}
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifier une nature </DialogTitle>
        <DialogContent>
          {/** <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
          <TextField margin="dense" label="Name" defaultValue={selectedTypeNature?.name || ""}inputRef={NameRef} fullWidth variant="standard"/>
         */} 
         <TextField
  margin="dense"
  label="Name"
  defaultValue={selectedTypeNature?.name || ""}
  inputRef={NameRef}
  fullWidth
  variant="outlined"
  sx={{
    '& .MuiInputLabel-root': {
      fontSize: '0.8rem',
      fontFamily: 'Roboto'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      '& fieldset': {
        borderColor: '#ccc'
      },
      '&:hover fieldset': {
        borderColor: '#aaa'
      }
    }
  }}
/>

         <br/>
          <InputLabel id="type-label" style={{  fontSize: '0.8rem', fontFamily: 'Roboto' }}>Type</InputLabel>
          <select id="type-label" onChange={handleSelectedType} labelId="mission-type-label" defaultValue={selectedTypeNature?.type}ref={TypeRef}  label="Type de mission"
          style={{ backgroundColor: "#EEEEEE", border: "1px solid gray", borderRadius: "5px", padding: "0.5rem", fontSize: "1rem" }}>
            <option value="" disabled selected>
              choisir un type des préstations
            </option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleUpdateTypeNature} sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}>Modifier</Button>
          <Button variant="outlined" onClick={handleCloseDialog} sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }}>Annuler</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TypeNatureTable;