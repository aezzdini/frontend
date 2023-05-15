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



const Contrat = () => {
    const token=localStorage.getItem("token")
    const { id } = useParams();
    const [contrats, setContrat] = useState([]);
    const [contratAddresses, setContratAddresses] = useState({});

    useEffect(() => {
        loadContrats();
    }, []);

    const loadContrats = async () => {
        const result = await axios.get(`${process.env.REACT_APP_URL}/contrat/`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setContrats(result.data);
        console.log(result.data);
    };
    useEffect(() => {
        const fetchAddresses = async () => {
          const addresses = {};
          for (const {} of contrats) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/address/${contrat.addressId}`, {
                  headers: { 
                   "Authorization": `Bearer ${token}`
                   }
                });
                addresses[contrat.id] = response.data;
              } catch (error) {
                console.log(error);
              }
            }
          setContratAddresses(addresses);
        };
        fetchAddresses();
      }, [contrats,token]);
    const deleteUser = async (id) => {
        await axios.delete(`${process.env.REACT_APP_URL}/contrat/${id}`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        loadContrats();
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
        const result = await axios.get(`${process.env.REACT_APP_URL}/contrat/contrats/${id}`,{
          headers: {"Authorization":`Bearer ${token}`}
        });
        setUser(result.data);
    };

    return (
        <ComponentSkeleton>
            <h2  style={{color: '#00416a'}}>Liste des Contrats</h2>
            <MainCard>
                <Button variant="contained" color="info" component={Link} to="/AddContrat" >Ajouter Contrat</Button>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{color: '#00416a'}}>Type De Contrat</TableCell>
                            <TableCell style={{color: '#00416a'}}>Nom De Socite</TableCell>
                            <TableCell style={{color: '#00416a'}}>Regles</TableCell>
                            <TableCell style={{color: '#00416a'}}>Prénom Client</TableCell>
                            <TableCell style={{color: '#00416a'}}>Consultant</TableCell>
                            <TableCell style={{color: '#00416a'}}>Date De but</TableCell>
                            <TableCell style={{color: '#00416a'}}>Adresse</TableCell>
                            <TableCell style={{color: '#00416a'}}>Date De Fin</TableCell>
                            <TableCell style={{color: '#00416a'}}>RefContrat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contrats.map((contrat) => (
                            <TableRow key={contrat.id}>
                                <TableCell>{contrat.typedecontrat}</TableCell>
                                <TableCell>{contrat.nomdesocite}</TableCell>
                                <TableCell>{contrat.regles}</TableCell>
                                <TableCell>{contrat.prénomclient}</TableCell>
                                <TableCell>{contrat.consultant}</TableCell>
                                <TableCell>{contrat.datedebut}</TableCell>
                                <TableCell>{contrat.datedefin}</TableCell>
                                <TableCell>{contratAddresses[contrat.id]?.addressText}</TableCell>
                                <TableCell>{contrat.refcontrat}</TableCell>
                                <TableCell>
                                    <IconButton variant="contained" onClick={()=>handleEditContrat(contrat)} aria-label="edit contrat"> 
                                     <Edit/>                                  
                                    </IconButton>
                                    <IconButton onClick={() => deleteUser(contrat.id)} aria-label="delete contrat">
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
  const typedecontratRef = useRef()
  
  function handleValues(event){
  event.preventDefault();
  const typedecontrat = event.target.elements.typedecontrat.Value;
  const nomdesocite = event.target.elements.nomdesocite.Value;
  const regles = event.target.elements.regles.Value;
  const prénomclient = event.target.elements.prénomclient.Value;
  const Consultant= event.target.elements.Consultant.Value;
  const datedebut= event.target.elements.DateDebut.Value;
  const datedefin= event.target.elements.datedefin.Value;
  const adresse =event.target.elements.adresse.Value;
  const refcontrat=event.target.elements.refcontrat.Value;
  const newMembre = {
  id : 4,
  typedecontrat,
  nomdesocite,
  regles,
  prénomclient,
  Consultant,
  datedebut,
  datedefin,
  adresse,
  refcontrat,
  }
  SetData(prevData => prevData.concat(newMembre))
  
  }
return(
  <form>
   <input type="text" name="typedecontrat" placeholder="Type De Contrat"/>
   <input type="text" name="nomdesocite" placeholder="Nom De Socite"/>
   <input type="text" name="regles" placeholder="Regles"/>
   <input type="text" name="prénomclient" placeholder="Prénom Client"/>
   <input type="text" name="Consultant" placeholder="Consultant"/>
   <input type="date" name="datedebut" placeholder="Date De But"/>
   <input type="date" name="datedefin" placeholder="Date De Fin"/>
   <input type="text" name="adresse" placeholder="Adresse"/>
   <input type="text" name="refcontrat" placeholder="Ref Contrat"/>
   <button> Add</button>
  </form>
  
  
  )


}


export default Contrat;
