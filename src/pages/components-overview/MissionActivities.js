import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MissionActivitiesList from './MissionActivitiesList ';
import axios from '../../../node_modules/axios/index';
import TypeNatureService from 'pages/services/TypeNatureService';
import NatureService from 'pages/services/NatureService';
import MissionService from 'pages/services/MissionService';
import PrestationsService from 'pages/services/PrestationsService';

const MissionActivities = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const token = localStorage.getItem("token")
  const [Types, setTypes] = useState([]);
  const [Natures, setNatures] = useState([]);
  const [client , setClient]= useState([]);
  const [consultant , setConsultant]=useState([]);
  const [isAdded, setIsAdded]=useState(false);

  useEffect(() => {
    
    async function fetchTypes() {
      const response = await TypeNatureService.getAllTypeNature();
      
      setTypes(response.data);
    }fetchTypes();
    async function fetchNatures() {
      const response = await NatureService.getAllNature();
  
      setNatures(response.data);
    }
    fetchNatures();
    const fetchMission = async () => {

      const response = await MissionService.fetchMission(missionId)
      setMission(response);
    };
    fetchMission();
  }, [missionId]);

  const handleClickOpen = () => {
    setOpenPopup(true);
  };
  const [activity, setActivity] = useState({
    month: '',
    year: '',
    valeur: 0,
    name: '',
    type: {
      id: 1
      
    },
    mission: {
      id: missionId
    },nature:{
      id:1
    }
  });
  
  const years = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    years.push(i);
  }
  
  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity(prevState => ({ ...prevState, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAdded(true)
    // const url = 'https://example.com/api/activities';

    try {
     await PrestationsService.postPrestation(activity)

      console.log(activity)
      handleClose();
    } catch (error) {
      console.error(error);
    }
      window.location.reload();

  };
  const handleClose = () => {
    setOpenPopup(false);
  };
 
  async function fetchClientName() {
    
    const response  = await MissionService.fetchClientById(mission.client);
    const clientName =response.nomcontact + ' ' + response.prenom;
   setClient(clientName)
    }
    fetchClientName();
    async function fetchConsultantName() {
    
      const response  = await MissionService.fetchConsultantById(mission.consultant);
      const consultantName =response. firstName + ' ' + response.lastName; 
     setConsultant(consultantName)
      }
      fetchConsultantName();

  if (!mission) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p style={{backgroundColor: '#D7E9F7', textAlign: 'center',  fontSize: '24px', color: '#393053',  fontFamily: 'sans-serif'}}>Mission de  
      <span style={{fontWeight: 'bold', color: '#6C9BCF'}}> {consultant} </span> chez
      <span style={{fontWeight: 'bolder', color: '#6C9BCF'}}> {client}</span> </p>


      <Table style={{backgroundColor: '#EEEEEE' , borderCollapse: 'collapse', borderRadius: '0.7em', overflow: 'hidden'}}>
        <TableHead>
          <TableRow>
           
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>TJM</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Date de début</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Date de fin</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Ref du Contrat</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Date de contrat</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Ref du bon de commande</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Taux de commision</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>NB de jour du bon de commande</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Client</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Consultant</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Type mission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
      
            <TableCell style={{ textAlign: 'center' }}>{mission.tjm}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.startDate}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.endDate}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.refContrat}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.contratDate}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.ref}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.taux}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.nb}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.client}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.consultant}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{mission.typeMission.name}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br/>
      <Button variant="contained" onClick={handleClickOpen}style={{textTransform: 'lowercase', borderCollapse: 'collapse', borderRadius: '0.5em', overflow: 'hidden' }}>
      <span style={{textTransform: 'uppercase'}}>A</span>jouter une préstation</Button>
      <MissionActivitiesList isAdded={isAdded}/>

      <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>Ajouter une préstation
        </DialogTitle>
      <DialogContent>
        
        <form onSubmit={handleSubmit}>
        <TextField margin="dense"name="name"label="Nom du préstation" fullWidth value={activity.name} onChange={handleChange}/> 
        <FormControl fullWidth margin="dense">
        <InputLabel id="type-activite-label">Type de préstation</InputLabel>
        
        <Select
          labelId="type-activite-label"
          id="type-activite"
          
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            choisir un type de préstation
          </MenuItem>
          {Types.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        <FormControl fullWidth margin="dense">
        <InputLabel id="type-activite-label">Nature de préstation</InputLabel>
        <Select
          labelId="nature-activite-label"
          id="nature-activite"
          
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            choisir une nature de préstation
          </MenuItem>
          {Natures.map((nature) => (
            <MenuItem key={nature.id} value={nature.id}>
              {nature.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </FormControl>
      
 
  
    <FormControl fullWidth style={{marginBottom: '10px'}}>
  <InputLabel htmlFor="year">Année</InputLabel>
  <Select
    value={activity.year}
    onChange={handleChange}
    inputProps={{
      name: 'year',
      id: 'year',
    }}
  >
    {years.map(year => (
      <MenuItem key={year} value={year}>{year}</MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel htmlFor="month">Mois</InputLabel>
  <Select
    value={activity.month}
    onChange={handleChange}
    inputProps={{
      name: 'month',
      id: 'month',
    }}
  >
    {months.map(month => (
      <MenuItem key={month} value={month}>{month}</MenuItem>
    ))}
  </Select>
</FormControl>
<TextField
  margin="dense"
  name="valeur"
  label="Valeur"
  fullWidth
  value={activity.valeur}
  onChange={handleChange}
/>    
      <DialogActions>
        <Button type="submit" color="primary"sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} >
          Ajouter 
        </Button>
        <Button onClick={handleClose} sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} >Annuler</Button>
        
      </DialogActions>
  </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default MissionActivities;