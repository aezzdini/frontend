import React, { useState, useEffect } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Modal, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import TypeNatureTable from "./TypeNatureTable"; 
import { useNavigate, useParams } from 'react-router-dom';
import TypeNatureService from "pages/services/TypeNatureService";
import NatureService from "pages/services/NatureService";
import * as Yup from 'yup';
const TypeNature = () => {
  const [name, setName] = useState('');
  const [typeNature, setTypeNature] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [natures, setNatures] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [nature, setNature] = useState({});
  const [types, setTypes] = useState([]);
  const [type_id, setType_Id] = useState([]);
  const [isAdded, setIsAdded]=useState(false);
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    NatureService.getAllNature().then((response) => {
      setNatures(response.data)
      console.log(response.data);
    })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const handleNatureChange = (e) => {
    setSelectedTypeId(e.target.value);
  };

  const handleCreateTypeNature = () => {
    if (!name.trim() && !selectedType) {
      setErrors({ 
        name: "Le champ 'Nom' est obligatoire.", 
        type: "Veuillez sélectionner un type" 
      });
      setNameError(true);
      setTypeError(true);
      return;
    }
    if (!name.trim()) {
      setErrors({ name: "Le champ 'Nom' est obligatoire." });
      setNameError(true);
      setTypeError(false);
      return;
    }
    if (!selectedType) {
      setErrors({ type: "Veuillez sélectionner un type" });
      setNameError(false);
      setTypeError(true);
      return;
    }
    
    schema.validate({ name }).then((data) => {
      const nature = {
        name: data.name,
        type: {
          id: selectedType,
          name: types.find((type) => type.id === selectedType)?.name,
        },
      };
      console.log(nature);
      TypeNatureService.createTypeNature(nature)
        .then((response) => {
          console.log(response.data);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
      setIsAdded(true);
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

const schema = Yup.object().shape({
  name: Yup.string()
  //.required("Le champ 'Nom' est obligatoire.")
  .test('is-blank', 'Le champ ne doit pas être vide', (value) => {
    return value.trim() !== '';
  }),
});

//get by id d'un type naturess


//getNatures
const getAllNature = () => {
  /*if (!name) {
    alert("Le champ 'name' est obligatoire.");
    return;
  }*/
  NatureService.getAllNature().then((response)=>{
      setNatures(response.data)
      console.log(response.data)
  } ).catch(error =>{
      console.log(error);
  })
}





useEffect(()=> {
  getAllNature();
},[])



  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    

  useEffect(() => {
    NatureService.getAllNature().then(response => {
    setTypes(response.data);
  })
  .catch(error => {
  console.error('Erreur lors de la récupération des types', error);
  });
  }, []);

  const title = () => {
    if (id) {
      return <DialogTitle>Modifier une nature</DialogTitle>
    } else {
      return <DialogTitle>Ajouter une nature</DialogTitle>
    }
  }

  return (
    <ComponentSkeleton>
      <MainCard title="Natures des préstations">
      <Button variant="contained" onClick={handleAdd} style={{textTransform: 'lowercase', borderCollapse: 'collapse', borderRadius: '0.5em', overflow: 'hidden' }} >
      <span style={{textTransform: 'uppercase'}}>A</span>jouter une nature des préstations
      </Button>
        <div className="typemission-table">
          <TypeNatureTable typeNature={typeNature} isAdded={isAdded}/>
        </div>
       
        <Dialog open={open} onClose={handleClose}>
          {title()}
          <DialogContent sx={{ width: '300px' }}>
            <form>
              <TextField label="Nom" variant="outlined" name="name" sx={{ width: '100%', marginBottom: '1rem' }}  onChange={(e) => setName(e.target.value)} required />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
              <br/>
              <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '1rem' }}>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    label="Type"
                  
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                {types.map(type => (
                <MenuItem key={type.id} value={type.id}>
                {type.name}
                </MenuItem>
                ))}
                </Select>
                {typeError && (
                  <span style={{ color: 'red' }}>Veuillez sélectionner un type</span>
                )}              
                </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button type="submit" sx={{ bgcolor: '#2196f3', color: 'white', '&:hover': { bgcolor: '#1565c0' } }} onClick={handleCreateTypeNature}>Valider</Button>
            <Button sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#424242' } }} onClick={handleClose}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    </ComponentSkeleton>
  );
};


export default TypeNature;
