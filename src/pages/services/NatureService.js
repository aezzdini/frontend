import axios from "../../../node_modules/axios/index";
const Nature_URL = `${process.env.REACT_APP_URL}/types/ `;
const token=localStorage.getItem("token")
class NatureService{
    getAllNature(){
        return axios.get(Nature_URL,{ headers: {"Authorization":`Bearer ${token}`}})
    }
    createNature(nature){
        return axios.post(Nature_URL, nature,{ headers: {"Authorization":`Bearer ${token}`}})
    }
    deleteNature(id){
        return axios.delete(`${process.env.REACT_APP_URL}/types/`+ id,{ headers: {"Authorization":`Bearer ${token}`}})
    }
    updateNature(id, updatedNature) {
        return axios.put(Nature_URL + id, updatedNature, { headers: {"Authorization": `Bearer ${token}`}});
      }
}

export default new NatureService();