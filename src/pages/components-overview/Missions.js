import { Button, TextField, Dialog,DialogTitle,DialogContent,DialogActions,FormControl,InputLabel ,Select ,MenuItem  } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import MissionsTable from './MissionTable';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MissionService from 'pages/services/MissionService';
import { useNavigate, useParams } from 'react-router-dom';
import './Mission.css';

const Missions = () => {
    const [client, setClient] = useState('');
    const [consultant, setConsultant] = useState('');
    const [refContrat, setRefContrat] = useState('');
    const [contratDate, setContratDate] = useState('');
    const [ref, setRef] = useState('');
    const [tjm, setTjm] = useState('');
    const [nb, setNb] = useState('');
    const [taux, setTaux] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [missionTypes, setMissionTypes] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedClientId, setSelectedClientId] = useState('');
    const [selectedConsultantId,setSelectedConsultantId]=useState('');
    const [typeMission, setTypeMission] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    const token=localStorage.getItem("token")
    const [clients, setClients] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [missionName, setMissionName]=useState([]);
    const [isAdded, setIsAdded]=useState(false);
    const mission = {
      client: selectedClientId,
      consultant: selectedConsultantId,
      refContrat,
      contratDate,
      ref,
      tjm,
      nb,
      taux,
      startDate,
      endDate,
      typeMission: {
        id: selectedTypeId
      }
    };
   
    console.log("fffffff"+mission);
  
    useEffect(() => {
      async function fetchClientsAndConsultants() {
        const response = await MissionService.fetchClients();
        setClients(response);
        const response1 = await MissionService.fetchConsultants();
        setConsultants(response1);
       
      }
      fetchClientsAndConsultants();
      async function fetchMissionTypes() {
        const response = await MissionService.fetchTypes();
        setMissionTypes(response);
       
      }
      fetchMissionTypes();
      
    }, []);

    
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
    
    const handleSubmit = (e) => {
      e.preventDefault();
      //champ client
      if (!selectedClientId) {
        alert("Le champ client est obligatoire.");
        return;
      }
      //champ consultant
      if (!selectedConsultantId) {
        alert("Le champ consultant est obligatoire.");
        return;
      }
      //champ start date 
      if (!startDate) {
        alert("Le champ Date de début est obligatoire");
        return;
      }
      //champ type mission selectedTypeId
      if (!selectedTypeId) {
        alert("Le champ type mission est obligatoire");
        return;
      }
      MissionService.createMission(mission).then((response) => {
        console.log(response.data)
      }).catch(error =>{
      console.log(error)
    })
    window.location.reload();
  };
//get by id d'une mission
    useEffect(() => {
      MissionService.getMissionById(id).then((response) => {
        setClient(response.data.client)
        setConsultant(response.data.consultant)
        setRefContrat(response.data.refContrat)
        setContratDate(response.data.contratDate)
        setRef(response.data.ref)
        setNb(response.data.nb)
        setStartDate(response.data.startDate)
        setEndDate(response.data.endDate)
        setTjm(response.data.tjm)
        setTaux(response.data.taux)
        setMissionType(response.data.typeMission.name)
      }).catch(error => {
        console.log(error)
      })
    },[])
    const title = () => {
      if(id){
        return <DialogTitle>Modifier une mission</DialogTitle>
      }else{
        return <DialogTitle>Ajouter une mission</DialogTitle>
      }
    }
  const [open, setOpen]=useState(false)
  const dispatch = useDispatch();
  

  
  return (
    <ComponentSkeleton >
      <MainCard title="Missions">
        <Button variant="contained"onClick={()=>setOpen(true)} style={{textTransform: 'lowercase', borderCollapse: 'collapse', borderRadius: '0.5em', overflow: 'hidden' }} >
        <span style={{textTransform: 'uppercase'}}>A</span>jouter une mission</Button>
        <div className="missions-table">
          <MissionsTable isAdded={isAdded}/>
        </div>
        
      <Dialog open={open}
      onClose={()=>setOpen(false)}>
      {
        title()
      }
      <DialogContent>
        <form >
              <FormControl variant="outlined" fullWidth margin="dense">
        <InputLabel id="client-label">Client</InputLabel>
        <Select
          labelId="client-label"
          id="client"
        /*   value={selectedClientId} */
          onChange={handleClientChange}
          label="Client" 
          required
        >
          <MenuItem value="" disabled>
            choisir un client
          </MenuItem>
          {clients?.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.nomcontact} {client.prenom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="dense">
        <InputLabel id="consultant-label">Consultant</InputLabel>
        <Select
          labelId="consultant-label"
          id="consultant"
          /* value={selectedClientId} */
          onChange={handleConsultantChange}
          label="Consultant"
          required
        >
          <MenuItem value="" disabled>
            choisir un consultant
          </MenuItem>
          {consultants.map((consultant) => (
            <MenuItem key={consultant.id} value={consultant.id}>
              {consultant.firstName} {consultant.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

 
          <TextField label="Ref du contrat" variant="outlined" name="refContrat" sx={{ width: '100%', marginBottom: '1rem' }} /* value={refContrat} */ onChange={ (e) => setRefContrat(e.target.value) } />
          <TextField label="Date de contrat" variant="outlined" name="contratDate" type="date" sx={{ width: '100%', marginBottom: '1rem' }} /* value={contratDate} */ onChange={ (e) => setContratDate(e.target.value) } InputLabelProps={{shrink: true}}/>
          <TextField label="Ref du bon de commande" variant="outlined" name="ref" sx={{ width: '100%', marginBottom: '1rem' }} /* value={ref} */ onChange={ (e) => setRef(e.target.value) } />
          <TextField label="Nb de jour du bon de commande" variant="outlined" name="nb" sx={{ width: '100%', marginBottom: '1rem' }} /* value={nb} */ onChange={ (e) => setNb(e.target.value) } />
          <TextField label="Date de début" variant="outlined" name="startDate" type="date" sx={{ width: '100%', marginBottom: '1rem' }} /* value={startDate} */ onChange={ (e) => setStartDate(e.target.value) } InputLabelProps={{shrink: true}} required/>
          <TextField label="Date de fin" variant="outlined" name="endDate" type="date" sx={{ width: '100%', marginBottom: '1rem' }} /* value={endDate}  */onChange={ (e) => setEndDate(e.target.value) } InputLabelProps={{shrink: true}} />
          <TextField label="TJM" variant="outlined" name="tjm" sx={{ width: '100%', marginBottom: '1rem' }} /* value={tjm}  */onChange={ (e) => setTjm(e.target.value) } />
          <TextField label="Taux de commission" variant="outlined" name="taux" sx={{ width: '100%', marginBottom: '1rem' }} /* value={taux}  */onChange={ (e) => setTaux(e.target.value) } />
          <FormControl fullWidth margin="dense">
            <InputLabel id="mission-type-label">Type de mission</InputLabel>
            <Select labelId="mission-type-label"/* value={selectedTypeId} */ onChange={handleMissionTypeChange} required>
              {missionTypes.map((typeMission) => (
                <MenuItem key={typeMission.id} value={typeMission.id}>
                  {typeMission.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </form>
</DialogContent>
<DialogActions>
  <Button type="submit" sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} onClick={(e)=>{setOpen(false),handleSubmit(e)}} >Valider</Button>
  <Button sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} onClick={()=>setOpen(false)}>Annuler</Button>
</DialogActions>
</Dialog>
       
      </MainCard>
    </ComponentSkeleton>
  );
};

export default Missions;
