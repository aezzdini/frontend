import axios from "../../../node_modules/axios/index";
const TypeNatureType_URL = `${process.env.REACT_APP_URL}/natures/`;
const token=localStorage.getItem("token")
class TypeNatureService{
    getAllTypeNature(){
        return axios.get(TypeNatureType_URL+'/',{ headers: {"Authorization":`Bearer ${token}`}});
    }
    deleteTypeNature(id){
        return axios.delete(TypeNatureType_URL+'/'+id,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    createTypeNature(typenature){
        return axios.post(TypeNatureType_URL ,typenature,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    getTypeNatureById(id){
        return axios.get(TypeNatureType_URL +'/'+ id,{ headers: {"Authorization":`Bearer ${token}`}});
    }
    updateTypeNature(id,updatetypeNature){
        return axios.put(TypeNatureType_URL +'/'+ id,updatetypeNature,{ headers: {"Authorization":`Bearer ${token}`}});
    }
}
export default new TypeNatureService();