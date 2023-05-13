import { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Modal,Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import ClientsTable from './ClientTable';





const Prestation = () => {
 

  
  const staticClients = [
    {
      id: 1,
      entreprise: 'entrep1',
      nomContrat: 'contrat1',
      sireN: 'n1',
      sireT: 't1',
      email: 'email@',
      tel: '06060606',
      ville: 'ville1'
    }
    // Add more missions as needed
  ];

    const [entreprise, setEntreprise] = useState('');
    const [nomContrat, setNomContrat] = useState('');
    const [sireN, setSireN] = useState('');
    const [sireT, setSireT] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ville, setVille] = useState('');
    const [fonction, setFonction] = useState('');
    const [postal, setPostal] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [commentaire, setCommentaire] = useState('');
  const handleEntrepriseChange = (event) => {
    setEntreprise(event.target.value);
  };
  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log({client,consultant,refContrat,contratDate,ref,nb,startDate,endDate,tjm,taux,missionType});
  }

  const handleNomContratChange = (event) => {
    setNomContrat(event.target.value);
  };

  const handleSireNChange = (event) => {
    setSireN(event.target.value);
  };

  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
  };

  const handleFonctionChange = (event) => {
    setFonction(event.target.value);
  };

  const handleSireTChange = (event) => {
    setSireT(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handlePostalChange = (event) => {
    setPostal(event.target.value);
  };

  const handleVilleChange = (event) => {
    setVille(event.target.value);
  };

  const handleCommentaireChange = (event) => {
    setCommentaire(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };
  const [open, setOpen]=useState(false)


  return (
    <ComponentSkeleton onSubmit={handleSubmit}>
      <MainCard title="Clients">
        <div className="clients-table">
        <div className="clients-table">
  <ClientsTable clients={staticClients} />
        </div>
        </div>
        <Button variant="contained"onClick={()=>setOpen(true)} >Ajouter un client</Button>
<Dialog open={open}
onClose={()=>setOpen(false)}>
<DialogTitle>Ajouter un client</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Entreprise" variant="outlined" name="entreprise" sx={{ width: '100%', marginBottom: '1rem' }} value={entreprise} onChange={handleEntrepriseChange} />
          <TextField label="Nom du contrat" variant="outlined" name="nomContrat" sx={{ width: '100%', marginBottom: '1rem' }} value={nomContrat} onChange={handleNomContratChange} />
          <TextField label="Num de sireN" variant="outlined" name="sireN" sx={{ width: '100%', marginBottom: '1rem' }} value={sireN} onChange={handleSireNChange} />
          <TextField label="Num de sireT" variant="outlined" name="sireT" sx={{ width: '100%', marginBottom: '1rem' }} value={sireT} onChange={handleSireTChange} />
          <TextField label="Fonction" variant="outlined" name="fonction" sx={{ width: '100%', marginBottom: '1rem' }} value={fonction} onChange={handleFonctionChange} />
          <TextField label="Adresse" variant="outlined" name="adresse" sx={{ width: '100%', marginBottom: '1rem' }} value={adresse} onChange={handleAdresseChange} />
          <TextField label="Email" variant="outlined" name="email" sx={{ width: '100%', marginBottom: '1rem' }} value={email} onChange={handleEmailChange} />
          <TextField label="Téléphone" variant="outlined" name="tel" sx={{ width: '100%', marginBottom: '1rem' }} value={tel} onChange={handleTelChange}/>
          <TextField label="Ville" variant="outlined" name="ville" sx={{ width: '100%', marginBottom: '1rem' }} value={ville} onChange={handleVilleChange} />
          <TextField label="Code postale" variant="outlined" name="postal" sx={{ width: '100%', marginBottom: '1rem' }} value={postal} onChange={handlePostalChange} />
          <TextField label="Commentaire" variant="outlined" name="commentaire" sx={{ width: '100%', marginBottom: '1rem' }} value={commentaire} onChange={handleCommentaireChange} />
</form>
</DialogContent>
<DialogActions>
  <Button type="submit" sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} onClick={()=>setOpen(false)} >Valider</Button>
  <Button sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} onClick={()=>setOpen(false)}>Annuler</Button>
</DialogActions>
</Dialog>
       
      </MainCard>
    </ComponentSkeleton>
  );
};

export default Prestation;
