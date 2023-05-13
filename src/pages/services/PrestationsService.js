import axios from "../../../node_modules/axios/index";

const Prestation_URL= `${process.env.REACT_APP_URL}/activities`;
const token=localStorage.getItem("token")
class PrestationsService {
    getAllPrestations(){
        return axios.get(Prestation_URL,{ headers: {"Authorization":`Bearer ${token}`}})
    }
    updatePrestations(id,updatetypePrestation){
        return axios.put(Prestation_URL +'/'+ id,updatetypePrestation,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    postPrestation(activity){
        return axios.post(Prestation_URL,activity,{
            headers: {"Authorization":`Bearer ${token}`}
          });
    }
    deletePrestation(id){
        
        return axios.delete(Prestation_URL+'/'+id,{
            headers: {"Authorization":`Bearer ${token}`}
          });
    }
}

export default new PrestationsService();