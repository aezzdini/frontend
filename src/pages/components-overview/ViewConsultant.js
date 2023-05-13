import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom"
import Consultant from './Editprofil';

const ViewConsultant = () => {
    const{consultantId}=useParams();
    console.log("consid",consultantId)
  const [user, setUser] = useState([]);
   const email = localStorage.getItem('username')
  //  console.log("userId"+userId)

   const [showConsultant, setShowConsultant] = useState(false);
   const token = localStorage.getItem('token'); // Get the token from local storage
   const [uploadedImage,setUploadedImage]=useState("")
   const defaultProfileImage = 'https://i38.photobucket.com/albums/e149/eloginko/profile_male_large_zpseedb2954.jpg';

   const handleEditProfileClick = () => {
     setShowConsultant(!showConsultant);
   };
   const [address, setAddress] = useState('');
   const [changed, setChanged] = useState(false);

 //*********** send receive data *****************/

  const [messageAdrss, setMessageAdrss] = useState(address);


  const changeAdresse = (messageAdrss) => {
    setMessageAdrss(messageAdrss);
  };

  var today = new Date();
  var birth= new Date(user.dateOfBirth)
  var age= today.getFullYear() - birth.getFullYear()
  //*********** send receive data *****************/
   



  useEffect(() => {
    const getUserById = async () => {
      try {

        const response1 = await axios.get(`${process.env.REACT_APP_URL}/consultants/${consultantId}`, {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });
          console.log(response1.data)

         const userid =response1.data.userId


        const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/userId/${userid}`, {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        setUser(response.data);

        const resp = await axios.get(`${process.env.REACT_APP_URL}/file/${response.data.imageId}`, {
          headers:{
            Authorization:`Bearer ${token}`,
          },
          responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
        });
        
        const imageBlob = new Blob([resp.data], { type: resp.headers['content-type'] });
        const imageURL = URL.createObjectURL(imageBlob);
        setUploadedImage(imageURL);
     
      } catch (error) {
        console.log(error);

      }

    };
  console.log('user.addressid', user.addressId)
    getUserById();

  }, []);


  useEffect(() => {
   
    displayAddress(user.addressId)
    console.log('adresse from useEffect',address)
  },[changed] );


  const displayAddress = async (addressId)=> {
    let ad
  try {
    const response =await axios.get(`${process.env.REACT_APP_URL}/address/${addressId}`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }})
  
  
    ad=response.data.addressText
    console.log("add from profileUser  ",ad)
  
   setAddress(ad)

  
  
  } catch (error) {
    console.error(error);
  }

  setChanged(!false)
  console.log(changed)
  console.log("addres text from displayAddress after set  ",address)
  return ad 
  }





  console.log("profiluser",user);


  return (
    <section style={{backgroundColor: '#eee'}}>
   
      {/* {console.log(user,"user")} */}
      {user && (
        <div className="container py-5">
          <div className="row">
            <div className="col">
              {/* Avatar and Name */}
            </div>
          </div>
          <div className="row">
            <div className="row-lg-8">
              <div className="card mb-4">
              <div className="card-body text-center">

              {uploadedImage ? (
              
              <img
                src={uploadedImage}
                
                alt="Profile"
                className="rounded-circle  border border-primary"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={defaultProfileImage} 
                // URL.createObjectURL(upploadedImageUrl)
                alt="Profile"
                className="rounded-circle   border border-primary"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            )}

                  <h5 className="my-3">{user.firstName} {user.lastName}</h5>
                  <p className="text-muted mb-1">{user.poste}</p>
                  <p className="text-muted mb-4">{address}</p>
                  <div className="d-flex justify-content-center mb-2">
                    
                  
                  </div>

                  <div className="d-flex justify-content-center mb-2">
                  {showConsultant && <Consultant changeAdresse={changeAdresse} />}                  
                  </div>

                </div>
              </div>
              {/* <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg" style={{color: '#333333'}} />
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="row-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Nom et prénom</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  
                  <hr />
                <div className="row">
                <div className="col-sm-3">
                <p className="mb-0">Titre du poste</p>
                </div>
               <div className="col-sm-9">
                 <p className="text-muted mb-0">{user.poste}</p>
                 </div>
                 </div>
                  
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                <p className="mb-0">Adresse</p>
                 </div>
                 <div className="col-sm-9">
                <p className="text-muted mb-0">{address}</p>
                {/* <p className="text-muted mb-4">{messageAdrss}</p> */}
                  </div>
                 </div>

                 <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Numéro Sécurité Social</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.secNum}</p>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Numéro téléphone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.phoneNumber}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">age </p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{age} ans</p>
                    </div>
                  </div>


              <hr />
                     {/* Add more fields as needed */}
                </div>
                   </div>

            {/* <div className="row">
          <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">Etat de la mission</span> 
                </p>
                <p className="mb-1" style={{fontSize: '.77rem'}}>Web Design</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website Markup</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>One Page</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile Template</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend API</p>
                <div className="progress rounded mb-2" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1"> Etat de la mission</span> 
                </p>
                <p className="mb-1" style={{fontSize: '.77rem'}}>Web Design</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website Markup</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>One Page</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile Template</p>
                <div className="progress rounded" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend API</p>
                <div className="progress rounded mb-2" style={{height: 5}}>
                  <div className="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        </div>
</div>
</div>
)}
</section>
);
};

export default ViewConsultant;

