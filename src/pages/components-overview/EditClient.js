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
const EditClient = () => {
     const location = useLocation();
     const [user, setUser] = useState({});
     useEffect(() => {
       setUser(location.state.user);
    }, []);
     console.log('user', user);
     const { raisonsocial, siret, nomcontact, prenom, tel, responsabilite, email,addressId} = user;
     
    const token=localStorage.getItem("token")
    const { id } = useParams();
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [addressObject,setAddressObject] = useState({});
    const handleAddressChange = (newAddress) => {
      setAddress(newAddress);
      console.log("New address:", address);  
    };
  
    useEffect(() => {
        loadClients();
    }, []);
    const loadClients = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/client/`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setClients(result.data);
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
          const result = await axios.get(`${process.env.REACT_APP_URL}/client/clients/${id}`,{
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
          await axios.put(`${process.env.REACT_APP_URL}/client/clients/${user.id}`,user,{
            headers: {"Authorization":`Bearer ${token}`}
          });
          loadClients(); 
        } else {
          // handle the invalid form values
          alert('Veuillez remplir correctement tous les champs obligatoires');
        }
      };
    const onValueChange = (e) => {
        setUser({ ...user, raisonsocial: e.target.value });
    };
    const onInputChange = (e) => {
        setUser({ ...user, siret: e.target.value });
    };
    const onNomChange = (e) => {
        setUser({ ...user, nomcontact: e.target.value });
    };

    const onPrenomChange = (e) => {
        setUser({ ...user, prenom: e.target.value });
    };

    const onTelChange = (e) => {
        setUser({ ...user, tel: e.target.value });
    };

    const onResChange = (e) => {
        setUser({ ...user, responsabilite: e.target.value });
    };
    const onEmailChange = (e) => {
        setUser({ ...user, email: e.target.value });
    };
    const navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1);
    };
    return (
        <ComponentSkeleton>
            <h2 style={{color: '#00416a'}}>Modifier Client</h2>
            <MainCard style={{ width: '800px',
                              margin: '0 auto'}}>
                        <FormWrapper onSubmit={(e) => onEdit(e)}>
                            <TextField
                                id="my-input"
                                onChange={(e)=> onValueChange(e)}
                                label="raisonsocial"
                                name="raisonsocial"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={raisonsocial}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onInputChange(e)}
                                label="siret"
                                name="siret"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={siret}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onNomChange(e)}
                                label="nomcontact"
                                variant="outlined"
                                name="nomcontact"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={nomcontact}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onPrenomChange(e)}
                                label="prenom"
                                variant="outlined"
                                name="prenom"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={prenom}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onTelChange(e)}
                                label="tel"
                                variant="outlined"
                                name="tel"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={tel}
                            />
                            <TextField
                                id="my-input"
                                onChange={(e) => onResChange(e)}
                                label="responsabilite"
                                variant="outlined"
                                name="responsabilite"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={responsabilite}
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
                                onChange={(e) => onEmailChange(e)}
                                label="email"
                                variant="outlined"
                                name="email"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={email}
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

export default EditClient;
