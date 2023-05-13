import React, { useState, useEffect } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Modal, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import NatureTypeTable from "./NatureTypeTable";
import TypeMissionService from 'pages/services/TypeMissionService';
import { useNavigate, useParams } from 'react-router-dom';
import NatureService from "pages/services/NatureService";
import * as Yup from 'yup';

const Nature = () => {
  const [name, setName] = useState('');
  const [natures, setNatures] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false)
  const [isAdded , setIsAdded]=useState(false)
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateType = () => {
     if (!name) {
      setErrors({ name: "Le champ 'Nom' est obligatoire." });
      setNameError(true);
      return;
    }
    schema.validate({ name }).then((data) => {
      const type = { name };
      NatureService.createNature(type)
        .then((response) => {
          console.log(response.data);
          handleClose();          
        })
        .catch((error) => {
          console.log(error);
        });
        setIsAdded(true)
        setErrors({});
        setNameError(false);
        setName("");
    }).catch((error) => {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      setNameError(true);
    });
};

  useEffect(() => {
    NatureService.getAllNature()
      .then((response) => {
        setNatures(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <DialogTitle>Modifier un type</DialogTitle>
    } else {
      return <DialogTitle>Ajouter un type</DialogTitle>
    }
  }
  const schema = Yup.object().shape({
    name: Yup.string()
    //.required("Le champ 'Nom' est obligatoire.")
    .test('is-blank', 'Le champ ne doit pas être vide', (value) => {
      return value.trim() !== '';
    }),
  });
  return (
    <ComponentSkeleton>
      <MainCard title="Types des préstations">
      <Button variant="contained" onClick={handleAdd} style={{textTransform: 'lowercase', borderCollapse: 'collapse', borderRadius: '0.5em', overflow: 'hidden' }} >
      <span style={{textTransform: 'uppercase'}}>A</span>jouter un type des préstations</Button>
        <div className="typemission-table">
          <NatureTypeTable natures={natures} isAdded={isAdded} />
        </div>
       
        <Dialog open={open} onClose={handleClose}>
          {title()}
          <DialogContent sx={{ width: '300px' }}>
            <form>
              <TextField label="Nom" variant="outlined" name="name" sx={{ width: '100%', marginBottom: '1rem' }} value={name} onChange={(e) => setName(e.target.value)} required />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </form>
          </DialogContent>
          <DialogActions>
            <Button type="submit" sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} onClick={handleCreateType}>Valider</Button>
            <Button sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} onClick={handleClose}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </ComponentSkeleton>
  );
};

export default Nature;
