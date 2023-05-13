import axios from 'axios';
var token = localStorage.getItem('token')
export const sendMailToApi = (data) => {
    console.log("yelow",token)
    //window.location.reload();
    return () => {
        axios.post(
         
          `${process.env.REACT_APP_URL}/mail/sendMail`, data,
              { headers: {"Authorization" : `Bearer ${token}`} 

          })
        .then((response) => {
            console.log("response",response);
          }).catch((error) => {
            console.error(error)
          }
          );
    }
}