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
const AddContrat = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // logic for submitting form data
    };
    const token=localStorage.getItem("token")
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [contrats, setContrats] = useState([]);
    
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
        typedecontrat: '',
        nomdesocite: '',
        regles : '',
        prénomclient: '',
        Consultant: '',
        datedebut: '',
        datedefin: '',
        adresseId: '',
        refcontrat: ''
    });
    const formik = useFormik({
        initialValues: {
            typedecontrat: '',
            nomdesocite: '',
            regles : '',
            prénomclient: '',
            Consultant: '',
            datedebut: '',
            datedefin: '',
            addressId: '',
            adresse: '',
            refcontrat: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const {  typedecontrat, nomdesocite, regles,prénomclient,Consultant,datedebut,datedefin,refcontrat } = values;
          console.log("values:", JSON.stringify(values));
          console.log("adressid:", newAddressId);
          // Send the data to the server create an address
            axios.post(`${process.env.REACT_APP_URL}/client/`, {
                typedecontrat: typedecontrat,
                nomdesocite: nomdesocite,
                regles: regles,
                prénomclient:prénomclient,
                Consultant:Consultant,
                datedebut:datedebut,
                datedefin:datedefin,
                addressId:newAddressId,
                refcontrat:refcontrat
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
               loadContrats();
               } 
              });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/contrat/contrats/${id}`,{
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
            <h2 style={{color: '#00416a'}}>Ajouter Contrat</h2>
            <MainCard style={{ width: '800px',
                              margin: '0 auto'}}>
                        <FormWrapper onSubmit={formik.handleSubmit}>
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Type De Contrat"
                                name="Type De Contrat"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.typedecontrat}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Nom De Socite"
                                name="Nom De Socite"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.nomdesocite}
                            />
                            <TextField
                                id="address"
                                onChange={handleInputChange}
                                label="Adresse"
                                variant="outlined"
                                name="adresse"
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
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Prénom Client"
                                variant="outlined"
                                name="Prénom Client"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.prénomclient}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Consultant"
                                variant="outlined"
                                name="Consultant"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.Consultant}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Date Debut"
                                variant="outlined"
                                name="Date Debut"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.datedebut}
                            />
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Date De Fin"
                                variant="outlined"
                                name="Date De Fin"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.datedefin}
                            />
                            
                             <Box sx={{ m: 2 }}>
                             <AddressModal  open={open} onClose={handleClose} handleAddressChange={handleAddressChange} />
                            </Box>
                            <TextField
                                id="my-input"
                                onChange={formik.handleChange}
                                label="Regles"
                                variant="outlined"
                                name="Regles"
                                sx={{ width: '100%', marginBottom: '1rem' }}
                                value={formik.values.Regles}
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

export default AddContrat;
