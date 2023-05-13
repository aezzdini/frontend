import Box from '@mui/material/Box';
import React, { useState, useEffect,useRef } from 'react';
import axios from "axios";
import {link,useNavigate}from "react-router-dom"
import jwt_decode from "jwt-decode";
import InputAdornment from '@mui/material/InputAdornment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import { useFormik } from 'formik';
import { Card, CardContent } from '@mui/material';
import { Grid, Stack, Typography } from '@mui/material';
import AddressModal from 'pages/components-overview/AddressModal';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText
} from '@mui/material';
import * as yup from 'yup';




const validationSchema = yup.object({
  firstName: yup.string().required('Prénom is required'),
  lastName: yup.string().required('Nom is required'),
  username: yup.string().email('Enter a valid email').required('Email is required'),
    poste: yup.string().required('Poste is required'),

    secNum: yup.string().required('Numéro SS is required'),
    phoneNumber: yup.string().required('Numéro de téléphone is required'),
   address: yup.string().required('Adresse is required'),
    
  });

  


export default function Consultant({ changeAdresse }) {
  let navigate =useNavigate();

  const token =localStorage.getItem('token');
  const userId =localStorage.getItem('userId');
  const email =localStorage.getItem('username');

  const [changed, setchanged] = useState(false);
  const [changedAdress, setchangedAdress] = useState(false);
  const [test, setTest] = useState(false);

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [addressText, setAddressText]=useState('')
  const [addressId, setAddressId] = useState('');
  const handleAddressChange = (newAddress,addressId) => {
    setAddress(newAddress);
    formik.setFieldValue("address", address);
    setAddressId(addressId);
    console.log("New address ID:", addressId);
    console.log("New addresSSSSSSSs:", address)
    
    setUser((prev) => ({
      ...prev,
      addressId: addressId
    }));
    ;
  };


  

  const [user,setUser]= useState({
    email:email,
    firstName:"",
    lastName: "",
    userId:"",
    poste: "",
    dateOfBirth:"",
    secNum:"",
    phoneNumber:"",
    // addressId:""    ,
  })

  const formik = useFormik({
    initialValues: user,
   validationSchema,

  //  onSubmit: async(values) => {

  //   setUser((prev) => ({
  //     ...prev,
  //     firstName: values.firstName,
  //     lastName: values.lastName,
  //     userId: values.userId,
  //     poste: values.poste,  
  //     dateOfBirth: values.dateOfBirth,
  //     secNum: values.secNum,
  //     phoneNumber: values.phoneNumber,
      
  //     // addressId:user.addressId
      
  //   }));
  //     console.log("*******finishfrom onsubmit ******",addressId)
  //   },
      
  });

    console.log("userrrrrr",user)
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};



const displayAddress = async (addressId)=> {
  let ad
try {
  const response =await axios.get(`${process.env.REACT_APP_URL}/address/${addressId}`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }})
    console.log("response from displayAddress   ",response)
 console.log("address text from displayAddress  ",response.data.addressText)

 formik.setValues((prevValues) => ({
  ...prevValues,
  address: response.data.addressText,
}));

console.log("user from displayAddress  ",user)

  ad=response.data.addressText
  console.log("add from displayAddress  ",ad)

 setAddressText(ad)
 console.log("addres text from displayAddress after set  ",addressText)

} catch (error) {
  console.error(error);
}
return ad
}

  //DISPLAY USER
  const displayeUser = async (userId) => {

    
    try {      
      const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/userId/${userId}`, {
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      const userData = response.data;
      // const userWithAdress={...userData,address:displayAddress(userData.addressId)}

      const address = await displayAddress(userData.addressId);

      console.log('userData from display user',userData)

       setUser(userData);


       console.log('addressid from display user',userData.addressId)

    //   const responsee =await axios.get(`http://localhost:8090/api/address/${userData.addressId}`,{
    // headers:{
    //   Authorization:`Bearer ${token}`,
    // }})
    // const add = responsee.data.addressText
    // console.log('addressText from display user',add)
      // setchanged(!changed)
      //n3abiw fl form
      formik.setValues((prevValues) => ({
        ...prevValues,
        firstName: userData.firstName,
        
        lastName: userData.lastName,
        userId: userData.userId,
        poste: userData.poste,
        dateOfBirth: userData.dateOfBirth,
        secNum: userData.secNum,
        phoneNumber: userData.phoneNumber,
        // address:address
      }),
      setAddressText(address),

      console.log("adress text from dislayuser AFTER SETADDRESS ",addressText),


      );


      // setUpdateUserId(user.id);
    } catch (error) {
      console.error(error);
    }
  };

    //UPDATE USER

    const updateUser = async (userId, user) => {
      try {
        const updatedUser = {
          ...user,
          email:email,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        userId: formik.values.userId,
        poste: formik.values.poste,
        dateOfBirth: formik.values.dateOfBirth,
        secNum: formik.values.secNum,
        phoneNumber: formik.values.phoneNumber,
        addressId: user.addressId
      };
  
        const res = await axios.put(`${process.env.REACT_APP_URL}/consultants/consultant/${userId}`, updatedUser,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(res);
        setTest(!test)
        window.location.reload();
        // setchanged(!changed);
      } catch (error) {
        console.error(error);
      }
      //sthg was updated
      // setchanged(!changed);

      console.log("*******finish*****",user)

    };

  useEffect(() => {

    displayeUser(userId)
    
  
  }, [userId,token,test]);

///use effect Adress //////

useEffect( () => {
const add=user.addressId
console.log('adress from use Effect',user.addressId)
// if (add) {
  displayAddress(user.addressId)
// }
}, [addressId]);


changeAdresse(addressText);




console.log('display user lbarra *******************************',user)
console.log('display addressid lbarra *******************************',user.addressId)
console.log('address text  *******************************',addressText)
console.log('email lbarra   *******************************',email)




  return (
   

    <>


    <Grid container spacing={3}>
        <Grid item xs={12}>  
       

    <Box  component="form"  onSubmit={formik.handleSubmit}  sx={{   '& > :not(style)': { m: 1,  },   display: 'flex', flexDirection: 'column',  }}  noValidate autoComplete="off"   >

<TextField id="email" label="Email" variant="outlined" required email="Enter a valid mail" value={email}
          onChange={formik.handleChange}  onBlur={formik.handleBlur} />

          <Box sx={{ display: 'flex', flexDirection: 'row' ,gap: '16px'  }}>
          <TextField  id="firstName" label="Nom" variant="outlined" required onChange={formik.handleChange} 
           onBlur={formik.handleBlur} value={formik.values.firstName} />                

           <TextField id="lastName" label="Prénom" variant="outlined" required  value={formik.values.lastName}
            onChange={formik.handleChange}  onBlur={formik.handleBlur}
           />
            </Box>
     
            <TextField  id="address" 
            label="Adresse"
            // ref={refAddress} 
            variant="outlined" 
            required  
            value={addressText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

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
            
            <TextField id="poste" label="Poste" variant="outlined" required     value={formik.values.poste}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
           
           
            <TextField id="phoneNumber" label="Numéro de téléphone" variant="outlined" required  
              onChange={formik.handleChange}

            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}/>




            <TextField id="secNum" label="Numéro SS" variant="outlined" required value={formik.values.secNum}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />


        <TextField   sx={{ mt: 1}}  id="dateOfBirth" type="date"   variant="outlined" required value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

      
            <Box sx={{ mt: 2 }}>

            {/* <Button  fullWidth type="submit"  variant="contained" sx={{ marginTop: '16px'}}
            > Enregistrer </Button> */}
     
               
           
    </Box>

    
    <Button  fullWidth   variant="contained" sx={{ marginTop: '16px'}}
              onClick={() => updateUser(userId, user)} > Modifier </Button>
             </Box>
         
    </Grid>
            
        </Grid>
      
        {/* </Dialog> */}
   </>
    
  );
}