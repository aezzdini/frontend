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
import { useFormik } from 'formik';
import * as yup from 'yup';
//import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// styles
const FormWrapper = styled('form')(() => ({
    
    width: '700px',
    margin: '0 auto'
}));
const validationSchema = yup.object({
   // addressNotes: yup.string().required('Required'),
  //  country: yup.mixed().required("Country is required"),
   /*  city: yup.mixed().required("City is required"),
    street: yup.mixed().required("Street is required"),
    postCode: yup.string().required("Postcode is required"),
    streetNumber: yup.string().required("streetNumber is required"), */
  });
const AddClient = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // logic for submitting form data
    };
    const token=localStorage.getItem("token")
    const { id } = useParams();
    const [clients, setClients] = useState([]);
    
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

    const handleOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };
      
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [newAddressId, setNewAddressId] = useState('');
    const handleAddressChange = (newAddress,addressId) => {
      setAddress(newAddress);
      console.log("New address:", address);
      formik.setFieldValue("address", address);
      setNewAddressId(addressId);
      console.log("New address ID:", addressId);
    };
    const handleInputChange = () => {
        formik.setFieldValue("address", address);
      };
      
    const [user, setUser] = useState({
        raisonsocial: '',
        siret: '',
        nomcontact: '',
        prenom: '',
        tel: '',
        responsabilite: '',
        addressId: '',
        email: ''
    });
    const formik = useFormik({
        initialValues: {
            raisonsocial: '',
            siret: '',
            nomcontact: '',
            prenom: '',
            tel: '',
            responsabilite: '',
            addressId: '',
            email: '',
            address:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const {  raisonsocial, siret, nomcontact,prenom,responsabilite,email,tel } = values;
          console.log("values:", JSON.stringify(values));
          console.log("adressid:", newAddressId);
          // Send the data to the server create an address
            axios.post(`${process.env.REACT_APP_URL}/client/`, {
                raisonsocial: raisonsocial,
                siret: siret,
                nomcontact: nomcontact,
                prenom:prenom,
                tel:tel,
                responsabilite:responsabilite,
                addressId:newAddressId,
                email:email
            }, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
            })
            .then(response => {
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
               });
               loadClients();
               } 
              });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/client/clients/${id}`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setUser(result.data);
    };
   console.log("values",formik.values)

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
    return (
        <ComponentSkeleton>
            <h2 style={{color: '#00416a'}}>Ajouter Client</h2>
            <MainCard style={{ width: '800px',
                              margin: '0 auto'}}>
                        <FormWrapper onSubmit={formik.handleSubmit}>
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="raisonsocial"
                                name="raisonsocial"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.raisonsocial}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="siret"
                                name="siret"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.siret}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="nomcontact"
                                variant="outlined"
                                name="nomcontact"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.nomcontact}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="prenom"
                                variant="outlined"
                                name="prenom"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.prenom}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="tel"
                                variant="outlined"
                                name="tel"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.tel}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="responsabilite"
                                variant="outlined"
                                name="responsabilite"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.responsabilite}
                            />
                            <TextField
                                id="address"
                                onChange={handleInputChange}
                                label="adresse"
                                variant="outlined"
                                name="address"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address} 
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <HelpOutlineIcon onClick={handleOpen} />
                                      </InputAdornment>
                                    ),
                                  }}       
                            />
                             <Box sx={{ m: 2 }}>
                             <AddressModal  open={open} onClose={handleClose} handleAddressChange={handleAddressChange} />
                            </Box>
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="email"
                                variant="outlined"
                                name="email"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.email}
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

export default AddClient;
