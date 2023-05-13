import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
//api
import {sendMailToApi}  from '../../api/apiMail';
// styles
const FormWrapper = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%'
}));


const SendMail = () => {
const [mailTo, setMailTo] = useState('');
const [cc, setCc] = useState('');
const [subject, setsubject] = useState('');
const [body, setbody] = useState('');

const handlesubjectContenu= (event) => {
  setbody(event.target.value);
};
const handlemailToChange = (event) => {
    setMailTo(event.target.value);
  };
  const handlesubjectChange = (event) => {
    setsubject(event.target.value);
  };
 
  const handleCcChange = (event) => {
    setCc(event.target.value);
  };
 
  function sendMail(e) {
    dispatch(sendMailToApi({
        mailTo:mailTo,
        subject:subject, 
        cc:cc,
        body:body
    },  console.log("sendMail fct",mailTo,subject,cc)));
  
  }
    const dispatch = useDispatch();
  return (
    <div>  <ComponentSkeleton>
    <MainCard title="Envoyer un courrier">
        <FormWrapper  >
            <TextField label="Envoyer  à" variant="outlined" name="mailTo" onChange={handlemailToChange} />
            <TextField label="CC" variant="outlined" name="cc" onChange={handleCcChange} />
            <TextField label="Objet" variant="outlined" name="subject" onChange={handlesubjectChange} />
            <TextField label="Message" variant="outlined" name="body" onChange={handlesubjectContenu} />

{/* <input
  type="file"
  id="docpicker"
  accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
  */}      
            <Button type="submit"variant="contained"  onClick={sendMail}> Envoyer </Button> 
        </FormWrapper>
    </MainCard>
</ComponentSkeleton></div>
  )
}

export default SendMail