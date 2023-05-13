import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, Typography, TextField } from '@mui/material';
import axios from "axios"
import { Link } from 'react-router-dom';

import { Dialog, DialogTitle } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import Search from "layout/MainLayout/Header/HeaderContent/Search";
import { FormControl, InputLabel, Select, MenuItem ,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { Download, DownloadOutlined, Input, UpdateOutlined } from "../../../node_modules/@mui/icons-material/index";
import UploadFileModal from "./UploadFileModal";
import FileSaver from 'file-saver';

function GestionFolder() {

  const token=localStorage.getItem('token')

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("grgrtgtrg"+file)
     
  
}

  const handleAddFolder = async () => {

    axios.post('http://localhost:8090/api/folder/', 
     {
      name: newFolderName,
     
    }  ,
    { headers: {"Authorization" : `Bearer ${token}`} }    )
    .then(response => {
      window.location.reload()
    })
   ;
   
  };

  
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);

  const closeModalFile = () =>{
    setIsModalFolderOpen(false);
    setMessage("");
  }
  const [newFolderName, setNewFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const closeModalFolder = () =>{
    setIsModalFolderOpen(false);
    setMessage("");
  }
    
   
  
    const handefolderState = (folder) => {
        if (folderSelectionnee === folder) {
            return setfolderSelectionnee(null);
        } else {
            return setfolderSelectionnee(folder);
        }
    };

useEffect(() => {
  refreshProjectList();
  refreshfileList();
}, [])
const [fileList, setFilelist] = useState([])

function refreshfileList() {
  const FileAPI = axios.get('http://localhost:8090/api/file/all', 
  { headers: {"Authorization" : `Bearer ${token}`} }

  )
    .then(res => setFilelist(res.data)     )
    .catch(err => console.log(err))
    console.log("ycucgiihoiuhuohiupgbhogoyugi"+FileAPI)
}




/*************************************** */
const [projectList, setFolderList] = useState([])

function refreshProjectList() {
  const ProjectAPI = axios.get('http://localhost:8090/api/folder/', 
  { headers: {"Authorization" : `Bearer ${token}`} }
  )
    .then(res => setFolderList(res.data)    )
    .catch(err => console.log(err))
}
function deleteFile(fileid){
  axios.delete(`http://localhost:8090/api/file/${fileid}`, 
  { headers: {"Authorization" : `Bearer ${token}`} }

  )
    .then(res => console.log("bbb"+res.data),
    window.location.reload(false)

    )
    .catch(err => console.log(err))

}
const[folderId,setFolderId]=useState("")


function downloadFile(fileid, fileName, fileType) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios
    .get(`http://localhost:8090/api/file/${fileid}`, { headers, responseType: 'blob' })
    .then(response => {
      const blob = new Blob([response.data], { type: fileType });
      FileSaver.saveAs(blob, fileName);
    })
    .catch(err => console.log(err));
}


function deleteFolder(floderid){
  axios.delete(`http://localhost:8090/api/folder/${floderid}`, 
  { headers: {"Authorization" : `Bearer ${token}`} }

  )
    .then(res =>
      {
        window.location.reload(false)

      }

    )
    .catch(err => console.log(err))

}
const [folderSelectionnee, setfolderSelectionnee] = useState(projectList || 0); // l'NameFolder 2023 sera sélectionnée par défaut
const [nameFolder, setNameFolder] = useState("")

const handleFolderChange = (event) => {
  const folderName = event.target.value;
  setNameFolder(folderName)
  console.log("test folder "+folderName)

}

    return (<>
    <br></br>
    <br></br>
<div style={{ display:'flex', justifyContent:'space-between'}}>

<div>

<Button variant="contained" style={{
            fontSize: '15px',
            padding: '6px 16px',
            borderRadius: '4px',
            color: 'info',
            backgroundColor: ' info',
            width: '60px'
        }} onClick={() => setIsModalFolderOpen(true)}>
          <AddIcon
         
          /> 
          </Button>
          
          <Dialog  open={isModalFolderOpen} onClose={closeModalFolder}>
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
                  <span style={{ flex: 1, textAlign: "center" }}>Ajouter un nouveau dossier</span>
                  <IconButton onClick={() => setIsModalFolderOpen(false)}>
                <CloseIcon />
                </IconButton>

                </DialogTitle>
                <Divider style={{ marginTop: "0px",paddingTop:"0px", marginBottom: "8px" ,fontWeight: 'bold'}} />

                <div style={{ 
                padding: 20, 
                backgroundColor: "white", 
                }}>
                <TextField
                label="Nom dossier"

                value={newFolderName}
                onChange={(event) => setNewFolderName(event.target.value)}
                sx={{ mb: 2 }}
                />
                <br></br>
                <Button style={{
            fontSize: '15px',
            padding: '6px 16px',
            borderRadius: '4px',
            color: 'info',
            backgroundColor: ' info',
            width: '60px'
            
        }} variant="contained" onClick={handleAddFolder}>
                Créer
                </Button>
            </div>
              











                </Dialog>
               
</div>
<div>



  <UploadFileModal        />
    
          </div>
</div>
<br></br>
<br></br>
<TableContainer component={Paper} Style={{ maxWidth: 800, margin: 'auto', marginTop: 50 }}>
            <Table aria-label="fiche de paie table">
                <TableHead>
                    <>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} rowSpan={3}>
                            Nom dossier    
                            </TableCell>
                         
                       
                            <TableCell rowSpan={3} style={{ fontWeight: 'bold' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    
                    </>
                </TableHead>
                <TableBody>
                    {projectList.map((folder) => (
                        <>
                         
                            <TableRow hover onClick={() => handefolderState(folder.name)} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                <TableCell sx={{ postion: 'relative' }}>
                                    {folder.name}   
                                    {folderSelectionnee === folder.name ? (
                                        <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                            <ExpandMoreIcon fontSize="medium" />
                                        </span>
                                    ) : (
                                        <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                            <ExpandLessIcon fontSize="medium" />
                                        </span>
                                    )}
                                </TableCell>
                             <TableCell>

                                  </TableCell>
                                <TableCell>

                                <Button variant="outlined" endIcon={<DeleteIcon />}onClick={() => {deleteFolder(folder.id)}} ></Button>                                  
</TableCell>

                            </TableRow>
                            
                           
 {folderSelectionnee === folder.name && 
                                fileList.map((file) => 

                                ( 
                                   
                                    

                                   
                                        (file.folder.name === folderSelectionnee)?

                                   
                                    <TableRow 
                                        sx={{ 'background-color': '#f5f5f5' }}
                                        key={`${folder.name}-${file.filename}`}

                                      
                                    >
                                        
                                        <TableCell sx={{ position: 'relative' }}>
                                            {file.filename} 
                                         
                                        </TableCell>
                                        
                                       
                                      
                                        <TableCell><Button variant="outlined" onClick={() => {downloadFile(file.id,file.filename,file.fileType)}}><DownloadOutlined  /></Button></TableCell>

                                        
                                        <TableCell><Button variant="outlined" onClick={() => {deleteFile(file.id)}}><DeleteOutlined  /></Button></TableCell>
                                    </TableRow>:<></>
                                ))}
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
       
    );
}
export default GestionFolder;

