import React, { useEffect, useState } from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import {
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddressModal from 'pages/components-overview/AddressModal';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/reducers/actions';
import { useSelector } from 'react-redux';
import EditClient from './EditClient';


const Client = () => {
    const token=localStorage.getItem("token")
    const { id } = useParams();
    const [clients, setClients] = useState([]);
    const [clientAddresses, setClientAddresses] = useState({});

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/client/`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setClients(result.data);
        console.log(result.data);
    };
    useEffect(() => {
        const fetchAddresses = async () => {
          const addresses = {};
          for (const client of clients) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/address/${client.addressId}`, {
                  headers: { 
                   "Authorization": `Bearer ${token}`
                   }
                });
                addresses[client.id] = response.data;
              } catch (error) {
                console.log(error);
              }
            }
          setClientAddresses(addresses);
        };
        fetchAddresses();
      }, [clients,token]);
    const deleteUser = async (id) => {
        await axios.delete(`${process.env.REACT_APP_URL}/client/${id}`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        loadClients();
        console.log(id);
    };
    const [address, setAddress] = useState('');
    const [addressId, setAddressId] = useState('');
    const handleAddressChange = (newAddress,addressId) => {
      setAddress(newAddress);
      //formik.setFieldValue("address", address);
      setAddressId(addressId);
      console.log("New address ID:", addressId);
    };
  
     const user = useSelector(state => state.user);
      /* const [user, setUser] = useState({
        id:'',
        raisonsocial: '',
        siret: '',
        nomcontact: '',
        prenom: '',
        tel: '',
        responsabilite: '',
        addressId: '',
        email: ''
    }); */
 
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleEditClient = async(user) =>{
        dispatch(setUser(user));
        console.log(user);
        navigate('/EditClient', { state: { user } });
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/client/clients/${id}`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setUser(result.data);
    };

    return (
        <ComponentSkeleton>
            <h2  style={{color: '#00416a'}}>Liste des clients</h2>
            <MainCard>
                <Button variant="contained" color="info" component={Link} to="/AddClient" >Ajouter Client</Button>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{color: '#00416a'}}>Raison social</TableCell>
                            <TableCell style={{color: '#00416a'}}>Siret</TableCell>
                            <TableCell style={{color: '#00416a'}}>Nom contact</TableCell>
                            <TableCell style={{color: '#00416a'}}>Prénom</TableCell>
                            <TableCell style={{color: '#00416a'}}>Tél</TableCell>
                            <TableCell style={{color: '#00416a'}}>Responsabilité</TableCell>
                            <TableCell style={{color: '#00416a'}}>Adresse</TableCell>
                            <TableCell style={{color: '#00416a'}}>Email</TableCell>
                            <TableCell style={{color: '#00416a'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.raisonsocial}</TableCell>
                                <TableCell>{client.siret}</TableCell>
                                <TableCell>{client.nomcontact}</TableCell>
                                <TableCell>{client.prenom}</TableCell>
                                <TableCell>{client.tel}</TableCell>
                                <TableCell>{client.responsabilite}</TableCell>
                                <TableCell>{clientAddresses[client.id]?.addressText}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>
                                    <IconButton variant="contained" onClick={()=>handleEditClient(client)} aria-label="edit client"> 
                                     <Edit/>                                  
                                    </IconButton>
                                    <IconButton onClick={() => deleteUser(client.id)} aria-label="delete client">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </MainCard>
        </ComponentSkeleton>
    );
};
function AddMembre() {
  const raisonsocialRef = useRef()
  
  function handleValues(event){
  event.preventDefault();
  const raisonsocial = event.target.elements.raisonsocial.Value;
  const siret = event.target.elements.siret.Value;
  const nom = event.target.elements.nom.Value;
  const prenom = event.target.elements.prenom.Value;
  const telephone= event.target.elements.telephone.Value;
  const responsabilite= event.target.elements.responsabilite.Value;
  const adresse =event.target.elements.adresse.Value;
  const email=event.target.elements.email.Value;
  const newMembre = {
  id : 4,
  raisonsocial,
  siret,
  nom,
  prenom,
  telephone,
  responsabilite,
  adresse,
  email,
  }
  SetData(prevData => prevData.concat(newMembre))
  
  }
return(
  <form>
   <input type="text" name="raisonsocial" placeholder="raison social"/>
   <input type="text" name="siret" placeholder="siret"/>
   <input type="text" name="nom" placeholder="nom"/>
   <input type="text" name="prenom" placeholder="prenom"/>
   <input type="text" name="telephone" placeholder="telephone"/>
   <input type="text" name="responsabilite" placeholder="responsabilite"/>
   <input type="text" name="adresse" placeholder="adresse"/>
   <input type="text" name="email" placeholder="email"/>
   <button> Add</button>
  </form>
  
  
  )


}


export default Client;
