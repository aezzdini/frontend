import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddressModal from 'pages/components-overview/AddressModal';
import InputAdornment from '@mui/material/InputAdornment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export default function Consultant() {
    const token =localStorage.getItem('token');
  const userId =localStorage.getItem('userId');
  const email =localStorage.getItem('username');


  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [addressId, setAddressId] = useState('');

  const handleAddressChange = (newAddress,addressId) => {
    setAddress(newAddress);
    formik.setFieldValue("address", address);
    setAddressId(addressId);
  }
  let navigate = useNavigate();

  const [user,setUser]= useState({

    firstName:"",
    lastName: "",
    userId:"",
    poste: "",

    dateOfBirth:"",
    secNum:"",
    phoneNumber:"",
    addressId :""   
  })
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const { firstName, lastName ,poste,secNum,phoneNumber} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/consultants/consultant/${userId}`, user,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/consultants/userId/${userId}`, {
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                firstname
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                lastName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your lastname"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="address" className="form-label">
              address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <HelpOutlineIcon onClick={handleOpen} />
                      </InputAdornment>
                    ),
                  }}
              />
              
                 <Box sx={{ m: 2 }}>
                 <AddressModal  open={open} onClose={handleClose} handleAddressChange={handleAddressChange} />
                </Box>

            </div>

            <div className="mb-3">
              <label htmlFor="poste" className="form-label">
              poste
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="poste"
                value={poste}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
              phoneNumber
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="secNum" className="form-label">
              secNum
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="secNum"
                value={secNum}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
              dateOfBirth
                            </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => onInputChange(e)}
              />
            </div>




            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
