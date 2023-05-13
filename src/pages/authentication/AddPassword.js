import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import{AddPasswordApi} from'api/AddPasswordApi'
import jwt from 'jwt-decode' // import dependency
import { useState ,useEffect } from 'react';
import { useParams } from "react-router-dom";
// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import {useLocation} from 'react-router-dom';
import MainCard from "../../components/MainCard"
import RegisterCSS from "./css/Register.css"
import {useNavigate} from "react-router-dom" 

const FormWrapper = styled('form')(() => ({
    align: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%'
}));



const AddPassword = () => {
 
    

  const search = useLocation();
  console.log('name: ',search.pathname)
  


  let navigate = useNavigate() 


  const [password, setPassword] = useState('');
  const handleChangePassword = (event) => {
      setPassword( event.target.value);
      console.log(password)
   };

  function addPasswordMethod(){

  
    let tokenStorage =localStorage.getItem("token")
                  var tokenEncoded=jwt(tokenStorage)
                  localStorage.setItem('username', tokenEncoded.sub);
    dispatch(AddPasswordApi({
      
            "username":localStorage.getItem('username'),
            "password":password
          
      
  
      
  
    })
    
    )
  }
  

  const dispatch =useDispatch();

    const location = useLocation();
    const token = location.pathname.substring(22);
    localStorage.setItem("token",token)
  return (
    <div class="container"   >
    <div class="centered-element" align="center">
<br> 
</br>
<br> 
</br>

<TextField label="Nouveau mot de passe" variant="outlined" name="password"  type="password" onChange={handleChangePassword} req/>
<TextField label="Confirmez  mot de passe" variant="outlined" name="confirmPassword" type="password" />
<Button type="submit"variant="contained" onClick={addPasswordMethod}  
  disableElevation
  fullWidth
  size="large"
  color="primary"


>VALIDER </Button>

</div>
</div>

  )
}
export default AddPassword;
