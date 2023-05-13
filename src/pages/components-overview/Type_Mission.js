import React, { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import TypeMissionService from 'pages/services/TypeMissionService';
import { Button, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../../../node_modules/axios/index";


const Type_Mission = () => {
    const [typemissions, setTypeMissions] = useState([]);
    const [RowTypeMission, setRowTypeMission] = useState([])
    //For show model 
    const [ViewShow, setViewShow] = useState(false)
    const handleViewShow = () => { setViewShow(true)}
    const handleViewClose = () => {setViewShow(false)}
    //For Add new nature model
    const [ViewPost, setPostShow] = useState(false)
    const handlePostShow = () => { setPostShow(true)}
    const handlePostClose = () => {setPostShow(false)}
    //For Edit Model
    const [ViewEdit, setEditShow] = useState(false)
    const handleEditShow = () => { setEditShow(true)}
    const handleEditClose = () => {setEditShow(false)}
    //define local state that store the form nature
    const [name, setName] = useState("");
    const navigate = useNavigate();

    //getAll typemission
    const getAllTypeMission =  () => {
        TypeMissionService.getAllTypeMission().then((response) => {
            setTypeMissions(response.data)
            //console.log(response);
        }).catch(error =>{
            console.log(error);
        })
    }
    useEffect(() =>  {
       getAllTypeMission();
    }, [])
    //add type mission
    const saveTypeMission = (e) =>{
        e.preventDefault();
        const typemission = {name}
        TypeMissionService.createTypeMission(typemission).then((response) =>{
            console.log(response.data)
            //window.location.reload();
            //navigate('.');
            setTypeMissions([...typemissions, response.data]); // Mettre à jour la liste des types de mission avec le nouveau type de mission créé
            setName(""); // Réinitialiser la valeur du champ 'name'
        }).catch(error => {
            console.log(error)
        })
    }
    //supp une type mission 
    const deleteTypeMission = (id) => {
        TypeMissionService.deleteTypeMission(id).then((response) =>{
            getAllTypeMission();
        }).catch(error => {
            console.log(error);
        })

    }
    //const {id} = useParams();
    useEffect(() => {
        TypeMissionService.getTypeMissionById(id).then((response) => {
            setName(response.data.setName)
        }).catch(error =>{
            console.log(error)
        })
    },[])
    //edit type mission 
    const [id, setId] = useState("");
    
    
  return (
    <div>
        {/**types des missions */}
        <div className="row">
            <h5 style={{ textAlign: 'center', backgroundColor: 'rgb(66, 88, 215)',fontSize: '23px', color: 'white', fontWeight: 'bold' }}>Type mission</h5>
            <div className='mt-5 mb-4'>
                <Button variant='primary' onClick={()=>{handlePostShow()}}  ><i className="fa fa-plu" ></i> Ajouter un type mission</Button>                            
            </div>
        </div>
        <div className="row">
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {typemissions.map(
                                    typemission=> 
                                    <tr key={typemission.id}>
                                    <td>{typemission.id}</td>
                                    <td>{typemission.name}</td>
                                    <td style={{minWidth:190, color:'white'}}>
                                        <Button size="sm" variant="primary" onClick={() => { handleViewShow(setRowTypeMission(typemission))}} style = {{marginLeft:"10px"}}>View</Button>
                                        <Button size="sm" variant="warning" style = {{marginLeft:"10px"}} onClick={()=> {handleEditShow(setRowTypeMission(typemission), setId(typemission._id))}}>Edit</Button>
                                        <Button size="sm" variant="danger" onClick={() => deleteTypeMission(typemission.id)} style = {{marginLeft:"10px"}}>Delete</Button>
                                    </td>
                                </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        {/**Model box view */}
        <div className="model-box-view">
                    <Modal
                    show={ViewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                    style={{ marginTop: '70px' }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>View type mission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={RowTypeMission.id} readOnly/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" value={RowTypeMission.name} readOnly/>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleViewClose} >Close</Button>
                        </Modal.Footer>
                    </Modal>
        </div>
        {/**Modal for submit data to database */}
        <div className="model-box-view">
                    <Modal
                    show={ViewPost}
                    onHide={handlePostClose}
                    backdrop="static"
                    keyboard={false}
                    style={{ marginTop: '70px' }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter un type mission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="entrer le nom du type"/>
                                </div>
                                <Button type='submit' className='btn btn-success mt-4' onClick={(e) => saveTypeMission(e) } >Valider</Button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handlePostClose} >Close</Button>
                        </Modal.Footer>
                    </Modal>
        </div>
        {/**Modal for edit  */}        
        <div className="model-box-view">
                    <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                    style={{ marginTop: '70px' }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier un type mission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="nomInput">Nom</label>
                                    <input type="text" id="nomInput" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="entrer le nom du type" defaultValue={RowTypeMission.name}/>
                                </div>
                                <Button type='submit' className='btn btn-warning mt-4' onClick={(e) => editTypeMission(e) } >Modifier</Button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditClose} >Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
    </div>
  );
};

export default Type_Mission;
