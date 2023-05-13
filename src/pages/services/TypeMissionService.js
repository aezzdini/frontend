import axios from "../../../node_modules/axios/index";
const TypeMission_URL = `${process.env.REACT_APP_URL}/missions/types`;
const token=localStorage.getItem("token")
class TypeMissionService{
    getAllTypeMission(){
        return axios.get(TypeMission_URL,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    deleteTypeMission(id){
        return axios.delete(TypeMission_URL+'/'+id,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    createTypeMission(typeMission){
        return axios.post(TypeMission_URL,typeMission,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    getTypeMissionById(id){
        return axios.get(TypeMission_URL+'/'+id,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    updateTypeMission(id, updatedTypeMission) {
        return axios.put(TypeMission_URL + '/' + id, updatedTypeMission, { headers: {"Authorization": `Bearer ${token}`}});
      }
      
}


export default new TypeMissionService();