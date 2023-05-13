import axios from "../../../node_modules/axios/index";

const Mission_URL = `${process.env.REACT_APP_URL}/missions`;
const Activity_URL =`${process.env.REACT_APP_URL}/activities`;
const Consultant_URL =`${process.env.REACT_APP_URL}/consultants/`
const Client_URL =`${process.env.REACT_APP_URL}/client/`;

const token=localStorage.getItem("token");

class MissionService{
    
    getAllMission(){
        return axios.get(Mission_URL +'/',{ 
            headers: {"Authorization":`Bearer ${token}`}})
    }
    updateMission(id,updatedMission){
      return axios.put(`${Mission_URL}/${id}`, updatedMission,{
        headers: {"Authorization":`Bearer ${token}`}});
    }
    deleteMission(id){
        return axios.delete(Mission_URL +'/'+id,{ 
            headers: {"Authorization":`Bearer ${token}`}});
    }
    createMission(mission){
        return axios.post(`${Mission_URL}/`,mission,{ 
            headers: {"Authorization":`Bearer ${token}`}});
    }
    /* createMission = async (mission) => {
        const response = await axios.post(`${Mission_URL}`,mission,{ 
            headers: {"Authorization":`Bearer ${token}`}
            });
        return response.data; // La réponse contient la mission créée avec son ID
      }; */
    getMissionById(id){
        return axios.get(Mission_URL ,id,{ 
            headers: {"Authorization":`Bearer ${token}`}});
      }
      getAllactivities = async()=>{
        const response= await axios.get(Activity_URL,{
            headers: {"Authorization":`Bearer ${token}`}
        })
        return response.data
      }
      getAllmissionByIdConsultant = async(id)=>{
        const response= await axios.get(`${Mission_URL}/${id}/missions`,{
            headers: {"Authorization":`Bearer ${token}`}
        })
        return response.data

      }
      fetchYears = async()=>{
        const response = await axios.get(`${Activity_URL}/years`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        return response.data
      }
      fetchMonths = async()=>{
        const response = await axios.get(`${Activity_URL}/months`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        return response.data
      }
      getConsultantByUserId = async(id)=>{
        const response = await axios.get(`${Consultant_URL}userId/${id}`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        return response.data;
      }
      fetchClients = async()=>{
        const response = await axios.get(`${Client_URL}`,{
          headers:{"Authorization":`Bearer ${token}`}
        })
        
        return(response.data);
      }
      fetchConsultants = async()=>{
        const response =await axios.get(`${Consultant_URL}`,{
            headers:{"Authorization":`Bearer ${token}`}  
        })
          return(response.data);
      }
      fetchTypes = async()=>{
        const response =await axios.get(`${Mission_URL}/types`,{
            headers:{"Authorization":`Bearer ${token}`}  
        })
          return(response.data);
      }
      fetchMission = async(id)=>{
        const response =await axios.get(`${Mission_URL}/${id}`,{
          headers:{"Authorization":`Bearer ${token}`}  
      })
        return(response.data);

      }
      fetchActivityByIdMission = async(id)=>{
        const response =await axios.get(`${Mission_URL}/${id}/activities`,{
          headers:{"Authorization":`Bearer ${token}`}  
      })
        return(response.data);

      }
      fetchConsultantById = async(id)=>{
        const response = await axios.get(`${Consultant_URL}${id}`,{
          headers:{"Authorization":`Bearer ${token}`} 
        })
        return(response.data);
      }
      fetchClientById = async(id)=>{
        const response = await axios.get(`${Client_URL}${id}`,{
          headers:{"Authorization":`Bearer ${token}`} 
        })
        return(response.data);
      }

}

export default new MissionService();