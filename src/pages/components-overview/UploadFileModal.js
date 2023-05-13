


import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, InputLabel, Select, MenuItem ,IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle } from "@mui/material";
import Divider from '@mui/material/Divider';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';
const UploadFileModal = () => {

    const token=localStorage.getItem('token')

    const [isModalFileOpen, setIsModalFileOpen] = useState(false);

    const [projectList, setFolderList] = useState([])
    useEffect(() => {
        refreshProjectList();
      }, [])
    function refreshProjectList() {
        const ProjectAPI = axios.get(`${process.env.REACT_APP_URL}/folder/`, 
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
          .then(res => setFolderList(res.data)   
          
          )
          .catch(err => console.log(err))
      }
    const [nameFolder, setNameFolder] = useState("")
    
    const handleFolderChange = (event) => {
        const folderName = event.target.value;
        setNameFolder(folderName)
        console.log("test folder "+folderName)
      
      }
      const [file, setFile] = useState(null);
      const handleFileChange = (e) => {
        let selectedFile = e.target.files[0];
            setFile(selectedFile);
            console.log("grgrtgtrg"+file)
         
      
    }
    const handleChangementFile=async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nameFolder', nameFolder);
    
        axios.post(`${process.env.REACT_APP_URL}/file/`, 
        formData ,
        { headers: {"Authorization" : `Bearer ${token}`} }    )
        .then(response => {
          console.log(response.data.message);
          window.location.reload()
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            console.error(error.response.data.message);
        
  
          } else {
            console.error(error);
          }
        });
       
      };
return(
  <>
  <Button variant="contained"style={{
            fontSize: '15px',
            padding: '6px 16px',
            borderRadius: '4px',
            color: 'info',
            backgroundColor: ' info',
            width: '60px'
        }} onClick={() => setIsModalFileOpen(true)}>    <UploadOutlined/> 
        </Button>

<Dialog  open={isModalFileOpen} >
                <DialogTitle  style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#00416a',
                  justifyContent: 'space-between', 
                  fontWeight: "bold" ,
                  paddingTop: 10,
                  paddingBottom:0, 
                  fontFamily: "Arial"}}
                sx={{ pr: 1 }}>
                  <span style={{ flex: 1, textAlign: "center" }}>Chargement du fichier</span>
                  <IconButton onClick={() => setIsModalFileOpen(false)}>
                <CloseIcon />
                </IconButton>

                </DialogTitle>
                <Divider style={{ marginTop: "0px",paddingTop:"0px", marginBottom: "15px" ,fontWeight: 'bold'}} />

                <div style={{ 
                padding: 20, 
                backgroundColor: "white", 
                }}>
                  <TextField
          id="folder"
          label="Selectionner un dossier  "
          variant="outlined"
          required
          fullWidth
          select
          onChange={handleFolderChange}

          sx={{ mb: 2 }}
          style={{ display: "block" }}
          >
          <MenuItem value=""></MenuItem>
          {projectList.map((folder) => (
          <MenuItem key={folder.name} value={folder.name}>
          {folder.name}
          </MenuItem>
          ))}
          </TextField>

          <br></br>
          <input name="file" type="file"    onChange={(e) => handleFileChange(e)} />

         
      

                <br></br>
                <Button style={{marginTop:7, marginLeft:5}}  variant="contained" onClick={handleChangementFile}>
                Valider
                </Button>
                </div>
              
                 
                </Dialog>
  </>

)}

export default UploadFileModal

