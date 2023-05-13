/* eslint-disable no-unused-vars */
import React, { useEffect, useState,useRef  } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MissionService from 'pages/services/MissionService';
import './Mission.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  InputLabel
} from '@mui/material';

import { Delete, Visibility, Edit } from '@mui/icons-material';

;

const MissionTable = ({isAdded}) => {
  const token=localStorage.getItem("token")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [missions, setMissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [clients, setClients] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [missionTypes, setMissionTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedConsultantId,setSelectedConsultantId]=useState('');
  const [client, setClient] = useState('');
  const [consultant, setConsultant] = useState('');
  const [typeMission, setTypeMission] = useState({});
  const TJMRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const contratDateRef = useRef(null);
  const tauxRef = useRef(null);
  const clientRef = useRef(null);
  const consultantRef = useRef(null);
  const TypeRef= useRef(null);
  const contratRef = useRef(null);
  const refRef = useRef(null);
  const nbRef = useRef(null);
  const handleClickOpen = (mission) => {
  setOpen(true);
  setSelectedMission(mission);
};
const handleClose = () => {
  setOpen(false);
};

 
  useEffect(() => {
    async function fetchClientsAndConsultants() {
      getAllMission();
     
      const clientResponse = await MissionService.fetchClients();
      
      setClients(clientResponse);
     
  
      const consultantResponse = await MissionService.fetchConsultants();
      setConsultants(consultantResponse);
     
    }
    fetchClientsAndConsultants();
    async function fetchMissionTypes() {
      const response = await MissionService.fetchTypes();
      setMissionTypes(response);
    
    }
    fetchMissionTypes();
    
  }, [isAdded]);
  const handleMissionTypeChange = (e) => {
      
    setSelectedTypeId(e.target.value);
  };
  const handleClientChange=(e)=>{
    const selectedClient =clients.find(
      (client)=>client.id===e.target.value
      );
      setSelectedClientId(selectedClient.id);;
    setClient(selectedClient);
  };
  const handleConsultantChange=(e)=>{
      setSelectedConsultantId(e.target.value);
      const selectedConsultant =consultants.find(
        (consultant)=>consultant.id===selectedConsultantId
        );
      setConsultant(selectedConsultant) ;
  }

  const getAllMission = () => {
    MissionService.getAllMission().then((response) => {
      setMissions(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const navigate = useNavigate();
  const handleViewMission = (missionId) => {
    navigate(`/activity/${missionId}`);
  };

  const handleDeleteMission = (id) => {
    MissionService.deleteMission(id).then((response) =>{
      getAllMission();
    }).catch(error => {
      console.log(error);
    });
  };

  const handleUpdateMission = async (mission) => {
    handleClickOpen(mission);
    try {
      const updatedMission = {
        ...selectedMission,
        client: clientRef.current.value,
        consultant: consultantRef.current.value,
        tjm: TJMRef.current.value,
        startDate: startDateRef.current.value,
        endDate: endDateRef.current.value,
        contratDate: contratDateRef.current.value,
        taux: tauxRef.current.value,
        nb: nbRef.current.value,
        ref:refRef.current.value,
        refContrat:contratRef.current.value,
        typeMission: {
          id: TypeRef.current.value
        }
        ,
      };
      console .log("updated mission",updatedMission)
    
      await MissionService.createMission(updatedMission)
      handleClose();
    } catch (error) {
      console.error(error);
    }
    getAllMission();
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, missions.length - page * rowsPerPage);

  return (
    <div>
      <br/>
      <Table  style={{backgroundColor: '#EEEEEE' , borderCollapse: 'collapse', borderRadius: '0.7em', overflow: 'hidden'}}>
        <TableHead>
          <TableRow >
            {/**
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>ID</TableCell> */}
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Client</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Consultant</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>TJM</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Date de début</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Date de fin</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Date de contrat</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Commission UpCoffre</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Type Mission</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? missions
            .sort((a, b) => a.id - b.id)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : missions
          ).map((mission) => (
            <TableRow key={mission.id}>
              {/** 
              <TableCell>{mission.id}</TableCell>*/}
              <TableCell style={{ textAlign: 'center' }} >{mission.client}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.consultant}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.tjm}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.startDate}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.endDate}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.contratDate}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.taux}</TableCell>
              <TableCell style={{ textAlign: 'center' }} >{mission.typeMission.name}</TableCell>
              <TableCell><IconButton aria-label="view" onClick={() => handleViewMission(mission.id)}style={{ color: 'green' }} >
<Visibility />
</IconButton>
<IconButton aria-label="edit" onClick={() => handleUpdateMission(mission)} style={{ color: 'blue' }}>
  <Edit />
</IconButton>
<IconButton aria-label="delete" onClick={() => handleDeleteMission(mission.id)} style={{ color: 'red' }}>
<Delete />
</IconButton>
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
count={missions.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
labelRowsPerPage={`Nombre d'éléments par page :`}
className="table-pagination"
/>
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Modifier une mission</DialogTitle>
  <DialogContent>
    {/** <DialogContentText>
      Modifier Mission
    </DialogContentText>*/}
    <InputLabel id="client-label" style={{  fontSize: '0.8rem', fontFamily: 'Roboto'}}  >Client</InputLabel>
    <select id="client-select" onChange={handleClientChange} defaultValue={selectedMission?.client || ""}ref={clientRef} label="Client"
    style={{ backgroundColor: "#EEEEEE", border: "1px solid gray", borderRadius: "5px", padding: "0.5rem", fontSize: "1rem" }}>
      
      {clients && clients?.map((client) => (
        <option key={client.id} value={client.id}>
          {client.nomcontact} {client.prenom}
        </option>
      ))}
    </select> 
    <br/>
    <InputLabel id="consultant-label" style={{  fontSize: '0.8rem', fontFamily: 'Roboto' }}>Consultant</InputLabel>
    <select id="consultant-label" onChange={handleConsultantChange} defaultValue={selectedMission?.consultant || ""} ref={consultantRef} label="Consultant"
    style={{ backgroundColor: "#EEEEEE", border: "1px solid gray", borderRadius: "5px", padding: "0.5rem", fontSize: "1rem" }}>
       {consultants?.map((consultant) => (
        <option key={consultant.id} value={consultant.id}>
          {consultant.firstName} {consultant.lastName}
        </option>
      ))}
    </select> 

    <TextField margin="dense" label="Ref du contrat" defaultValue={selectedMission?.refContrat || ""} inputRef={contratRef} fullWidth variant="standard"/>

    <TextField margin="dense" type="date" label="Date de Contrat" defaultValue={selectedMission?.contratDate || ""} inputRef={contratDateRef}fullWidth variant="standard"  />
    <TextField margin="dense" label="Ref du bon de commande" defaultValue={selectedMission?.ref || ""} inputRef={refRef} fullWidth variant="standard"/>
    <TextField margin="dense" label="Nb de jour du bon de commande" defaultValue={selectedMission?.nb || ""} inputRef={nbRef} fullWidth variant="standard"/>
    <TextField margin="dense" type="date" label="Date de début de Contrat" defaultValue={selectedMission?.startDate || ""} inputRef={startDateRef} fullWidth variant="standard"/>
    <TextField margin="dense" type="date" label="Date de fin de Contrat" defaultValue={selectedMission?.endDate || ""}inputRef={endDateRef} fullWidth variant="standard"  InputLabelProps={{shrink: true}}/>
    <TextField margin="dense" label="TJM" defaultValue={selectedMission?.tjm || ""}inputRef={TJMRef} fullWidth variant="standard"/>
    <TextField margin="dense" label="Commision UPCoffre" defaultValue={selectedMission?.taux || ""} inputRef={tauxRef} fullWidth variant="standard"/>
    <br/>
    <InputLabel id="typemission-label" style={{  fontSize: '0.8rem', fontFamily: 'Roboto' }}>Type de mission</InputLabel>
    <select id="typemission-label" onChange={handleMissionTypeChange} labelId="mission-type-label" defaultValue={selectedMission?.typeMission}ref={TypeRef}  label="Type de mission"
    style={{ backgroundColor: "#EEEEEE", border: "1px solid gray", borderRadius: "5px", padding: "0.5rem", fontSize: "1rem" }}>
      <option value="" disabled selected>
        choisir un type de mission
      </option>
      {missionTypes.map((missionType) => (
        <option key={missionType.id} value={missionType.id}>
          {missionType.name}
        </option>
      ))}
    </select>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleUpdateMission}sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}>Modifier</Button>
    <Button onClick={handleClose}sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }}>Annuler</Button>
    
  </DialogActions>
</Dialog>

</div>
);
};

export default MissionTable;
