import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {link,useNavigate}from "react-router-dom"
import { Grid, Stack, Typography } from '@mui/material';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import { useFormik } from 'formik';

import { Card, CardContent ,Paper} from '@mui/material';


import * as yup from 'yup';
 
const token =localStorage.getItem('token');


const validationSchema = yup.object({
  firstName: yup.string().required('Prénom est obligatoire '),
  lastName: yup.string().required('Nom est obligatoire'),
 email: yup.string().email('Enter a valid email').required('Email est obligatoire ').test(
    'uniqueEmail',
    'This email is already in use',
    async function (value) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/Email?email=${value}`,
        {
              headers: {"Authorization" : `Bearer ${token}`} 
            }
        );
        return !response.data.length; // true if email is unique, false otherwise
      } catch (error) {
        console.error(error);
        return true; // treat error as if email is unique to avoid blocking form submission
      }
       }
  ),
    
  });

  

export default function Consultant() {

  let navigate =useNavigate();
  const [error, setError] = useState(null);



  const [consultant,setConsultant]= useState({

    firstName:"",
    lastName: "",
    email:"",
   
    

  })



  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
     
      
    },
    validationSchema: validationSchema,
    
    onSubmit: async (values) => {
      try {
        console.log(values);
        console.log("this token"+token)
        const response = await axios.post(`${process.env.REACT_APP_URL}/consultants/`, values, {
          headers: {"Authorization" : `Bearer ${token}`}
        });
        return response.data;
      } catch(error) {
        console.error(error.response.data);
        setError(error.response.data);
        throw new Error(error.response.data);
      }
    }
    
  });
  const { handleChange, handleBlur, errors, isValid , dirty } = formik;


  return ( 
    <Grid container justifyContent="center">
    <Grid item xs={12} sm={10} md={8} lg={6}>
      <Paper sx={{ p: 2, mt: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Ajouter un consultant
          </Typography>

    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        '& > :not(style)': { m: 1,  },
        display: 'flex',
    flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >  
      
           <TextField id="email" label="Email" variant="outlined" required  email="Enter a valid mail"
          onChange={handleChange} onBlur={handleBlur}  error={!!errors.email} helperText={errors.email}/>

                {error && <div style={{ color: 'red'}}>{error}</div>}

          <Box sx={{ display: 'flex', flexDirection: 'row' ,gap: '16px'  }}>
          <TextField  id="firstName" label="Nom" variant="outlined" required  fullWidth onChange={formik.handleChange} value={formik.values.firstName} error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}/>                

           <TextField id="lastName" label="Prénom" variant="outlined" required fullWidth  value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName} />
            </Box>
     
     
      
            <Box sx={{ mt: 2 }}>
     
            <Button  fullWidth type="submit"  variant="contained" sx={{ marginTop: '16px'}}> Enregistrer </Button>
             </Box>
            
    </Box>

    </Stack>
        </Paper>
      </Grid>
    </Grid>
    
    
  );
}