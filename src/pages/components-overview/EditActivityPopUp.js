import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import TypeNatureService from 'pages/services/TypeNatureService';
import NatureService from 'pages/services/NatureService';
import PrestationsService from 'pages/services/PrestationsService';

const EditActivityPopup = ({ activity, openPopup, setOpenPopup, setActivities }) => {
  const [updatedActivity, setUpdatedActivity] = useState(activity);
  const [types, setTypes] = useState([]);
  const [natures, setNatures] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await TypeNatureService.getAllTypeNature();
        setTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTypes();
    async function fetchNatures() {
      const response = await NatureService.getAllNature();
        setNatures(response.data);
      }
      fetchNatures();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedActivity({ ...updatedActivity, [name]: value });
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    const type = types.find((t) => t.id === value);
    setUpdatedActivity({ ...updatedActivity, type });
  };
  const handleNatureChange =(event)=>{
    const { value } = event.target;
    const nature = natures.find((t) => t.id === value);
    setUpdatedActivity({ ...updatedActivity, nature });

  }

  const handleSave = async () => {
    try {
      const response = await PrestationsService.updatePrestations(activity.id,updatedActivity)
      if (response.status === 200) {
        setActivities((prevActivities) =>
          prevActivities.map((prevActivity) => (prevActivity.id === activity.id ? updatedActivity : prevActivity))
        );
        setOpenPopup(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Modifier une préstation</DialogTitle>
      <DialogContent>
        <form>
          <TextField name="name" label="Nom de préstation" value={updatedActivity.name} onChange={handleInputChange} margin="dense" fullWidth /> 
          <div style={{ marginTop: '4px' }}>
          <Select name="nature" label="Nature d'activité " value={updatedActivity.nature.id} onChange={handleNatureChange} margin="dense" fullWidth>
            <MenuItem value="">Choisir un type de préstation</MenuItem>
            {natures.map((nature) => (
              <MenuItem key={nature.id} value={nature.id}>
                {nature.name}
              </MenuItem>
            ))}
          </Select>
          </div>
          <div style={{ marginTop: '6px' }}>
          <Select name="type" label="Type" value={updatedActivity.type.id} onChange={handleTypeChange} margin="dense" fullWidth>
            <MenuItem value="">Choisir une nature de préstation</MenuItem>
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
            
          </Select>
         </div>
          <TextField name="month" label="Mois" value={updatedActivity.month} onChange={handleInputChange} margin="dense" fullWidth />
          <TextField name="year" label="Année" value={updatedActivity.year} onChange={handleInputChange} margin="dense" fullWidth />
          <TextField name="valeur" label="Valeur" value={updatedActivity.valeur} onChange={handleInputChange} margin="dense" fullWidth />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} >Modifier</Button>
        <Button onClick={() => setOpenPopup(false)} sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }}>Annuler</Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default EditActivityPopup;
