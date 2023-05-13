import axios from 'axios';
var token = localStorage.getItem('token')
export const createFolder = (data) => {
    console.log("yelow",token)
    //window.location.reload();
    return () => {
        axios.post(
         
            'http://localhost:8088/api/folder/', data,
              //{ headers: {"Authorization" : `Bearer ${token}`} }
          )
        .then((response) => {
            console.log("response",response);
          }).catch((error) => {
            console.error(error)
          }
          );
    }
}