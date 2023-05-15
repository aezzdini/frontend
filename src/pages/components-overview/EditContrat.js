import React, { useEffect, useState } from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import {
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddressModal from 'pages/components-overview/AddressModal';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressModalEdit from './AddressModalEdit';
// styles
const FormWrapper = styled('form')(() => ({
    
    width: '700px',
    margin: '0 auto'
}));
 const validationSchema = yup.object({
    raisonsocial: yup.string().required('La raison social est obligatoire'),
    siret: yup.string().required("Le siret est obligatoire"),
    nomcontact: yup.string().required("Le nom du contact est obligatoire"),
    prenom: yup.string().required("Le prénom est obligatoire"),
    tel: yup.number().required("Le numéro de téléphone est obligatoire."),
    responsabilite: yup.string().required("La responsabilité est obligatoire"), 
    email: yup.string().required("L'email est obligatoire"), 
  }); 
const EditContrat = () => {
     const location = useLocation();
     const [user, setUser] = useState({});
     useEffect(() => {
       setUser(location.state.user);
    }, []);
     console.log('user', user);
     const { typedecontrat, nomdesocite, regles, prénomclient, Consultant, datedebut, datedefin,refcontrat,addressId} = user;
     
    const token=localStorage.getItem("token")
    const { id } = useParams();
    const [contrats, setContrats] = useState([]);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [addressObject,setAddressObject] = useState({});
    const handleAddressChange = (newAddress) => {
      setAddress(newAddress);
      console.log("New address:", address);  
    };
  
    useEffect(() => {
        loadContrats();
    }, []);
    const loadContrats = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/contrat/`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setContrats(result.data);
        console.log(result.data);
    };
    useEffect(() => {
        const fetchAddressById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/address/${user.addressId}`, {
                  headers: { 
                   "Authorization": `Bearer ${token}`
                   }
                });
                setAddress(response.data.addressText);
               
                setAddressObject(response.data.address);
    
              } catch (error) {
                console.log(error);
              }
        };
        fetchAddressById ();
      },[token,user]);
    const handleOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };
      
    useEffect(() => {
        const loadUsers = async () => {
          const result = await axios.get(`${process.env.REACT_APP_URL}/contrat/contrats/${id}`,{
            headers: {"Authorization":`Bearer ${token}`}
          });
          setUser(result.data);
          console.log("User",result.data);
        };
        loadUsers();
      }, [id, token]);
  
      const onEdit = async (e) => {
        e.preventDefault();
      
        const isValid = await validationSchema.isValid(user);
      
        if (isValid) {
          // update form values
          await axios.put(`${process.env.REACT_APP_URL}/contrat/contrats/${user.id}`,user,{
            headers: {"Authorization":`Bearer ${token}`}
          });
          loadContrats(); 
        } else {
          // handle the invalid form values
          alert('Veuillez remplir correctement tous les champs obligatoires');
        }
      };
    const onTypeDeContratChange = (e) => {
        setUser({ ...user, typedecontrat: e.target.value });
    };
    const onNomDeSociteChange = (e) => {
        setUser({ ...user, nomdesocite: e.target.value });
    };
    const onReglesChange = (e) => {
        setUser({ ...user, regles: e.target.value });
    };

    const onPrenomClientChange = (e) => {
        setUser({ ...user, prénomclient: e.target.value });
    };

    const onConsultantChange = (e) => {
        setUser({ ...user, Consultant: e.target.value });
    };

    const onDateDebutChange = (e) => {
        setUser({ ...user, datedebut: e.target.value });
    };
    const onDateDeFinChange = (e) => {
        setUser({ ...user, datedefin: e.target.value });
    };
    const onRefContratChange = (e) => {
        setUser({ ...user, refcontrat: e.target.value });
    };
    const navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1);
    };
    return (
        <ComponentSkeleton>
            <h2 style={{color: '#00416a'}}>Modifier Contrat</h2>
            <MainCard style={{ width: '800px',
                              margin: '0 auto'}}>
                        <FormWrapper onSubmit={(e) => onEdit(e)}>
                            <TextField
                                id="my-input"
                                onChange={(e)=> onValueChange(e)}
                                label="typedecontrat"
                                name="typedecontrat"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={typedecontrat}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onNomDeSociteChange(e)}
                                label="nomdesocite"
                                variant="outlined"
                                name="nomdesocite"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={nomdesocite}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onReglesChange(e)}
                                label="regles"
                                variant="outlined"
                                name="regles"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={regles}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onPrénomClientChange(e)}
                                label="prénomclient"
                                variant="outlined"
                                name="prénomclient"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={prénomclient}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onConsultantChange(e)}
                                label="Consultant"
                                variant="outlined"
                                name="Consultant"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={Consultant}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onDateDeFinChange(e)}
                                label="datedefin"
                                variant="outlined"
                                name="datedefin"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={datedefin}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onRefContratChange(e)}
                                label="refcontrat"
                                variant="outlined"
                                name="refcontrat"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={refcontrat}
                            />
                            <TextField
                                id="address"
                                label="adresse"
                                variant="outlined"
                                name="address"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={address}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <HelpOutlineIcon onClick={handleOpen} />
                                      </InputAdornment>
                                    ),
                                  }}       
                            />
                             <Box sx={{ m: 2 }}>
                             <AddressModalEdit  open={open} onClose={handleClose} handleAddressChange={handleAddressChange} addressObject={addressObject} />
                            </Box>
                            <TextField
                                id="my-input"
                                onChange={(e) => onDateDebutChange(e)}
                                label="datedebut"
                                variant="outlined"
                                name="datedebut"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={datedebut}
                            />
                                <Button
                                variant="contained"
                                color="info"
                                onClick={handleGoBack}
                                style={{marginRight: "8px",
                                fontSize: "1.5rem",
                                color: "white",
                                width: "100px",
                                height: "40px",
                                borderRadius: "8px"}}
                                startIcon={<ArrowBackIcon/>}
                                >
                                </Button>
                                <Button  variant="contained"
                                color="secondary" style={{
                                    marginRight: "8px",
                                    width: "100px",
                                    height: "40px",
                                    borderRadius: "8px",
                                }} onClick={() => setOpen(false)}>Cancel</Button>
                                <Button 
                                 variant="contained"
                                color="info"
                                style={{ width: "100px",
                                height: "40px",
                                borderRadius: "8px",}}type="submit">
                                    Submit
                                </Button>    
                        </FormWrapper>
            </MainCard>
        </ComponentSkeleton>
    );
};

export default EditContrat;
