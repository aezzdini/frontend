import axios from "axios"
import jwt from 'jwt-decode' // import dependency

// Importing toastify module
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const loginApi =(el)=>{
  
 
    return()=>{
        axios.post(`${process.env.REACT_APP_URL}/auth/authenticate`,
          el  
        )
              .then((response) => {




                console.log(response.status)
              
                

                const  {token}  = response.data;
                localStorage.setItem('token', token);
                let tokenStorage =localStorage.getItem("token")
                var tokenEncoded=jwt(tokenStorage)
                localStorage.setItem('username', tokenEncoded.sub);
                localStorage.setItem('userId', tokenEncoded.userId);
                console.log("tokenEncoded",tokenEncoded)
                tokenEncoded.roles.map( role => {
                  console.log("profile"+role)         
                  localStorage.setItem('profile', role.name);})
          


               

                
                    if (response.status === 200)
                     {
                     // toast.info("You're added offer successfully !")
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "You're added offer successfully !",
                        showConfirmButton: false,
                        timer: 1500
                      })
                      window.location.replace('http://localhost:3000/dashboard/default');
                    }
                 
               }).catch(err => {
                if (!err?.response) {
                  console.log('No Server Response');
              } 
              else if (err.response?.status === 403) {
               // alert("Missing password");
                Swal.fire({
                  title: 'Error!',
                  text: 'Missing password',
                  icon: 'error',
                  confirmButtonText: 'ok'
                })
              } 
              else if (err.response?.status === 404) {
               // alert('Missing Username  ');
               Swal.fire({
                title: 'Error!',
                text: 'Missing Username',
                icon: 'error',
                confirmButtonText: 'ok'
              })
          
                //alert('Missing Username  ')
              } 
              else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Login Failed',
                  icon: 'error',
                  confirmButtonText: 'ok'
                })
                //alert('Login Failed');
              }               });
    }
  }