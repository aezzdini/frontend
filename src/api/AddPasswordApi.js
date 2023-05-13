import axios from "axios"
import jwt from 'jwt-decode' // import dependency

export const AddPasswordApi =(el)=>{
    const token=localStorage.getItem("token")
    console.log(el)
    console.log(token)

    return()=>{
        axios.put(`${process.env.REACT_APP_URL}/auth/`,
          el,
          { headers: {"Authorization" : `Bearer ${token}`} }
          )
          .then(res => {
            window.location.replace("http://localhost:3000/login")
          })}}