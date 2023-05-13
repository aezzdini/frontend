import axios from 'axios';

export const sendMessionToApi = (data) => {
    const token=localStorage.getItem("token")
    data.preventDefault()
    const mission = {client, consultant,refContrat,contratDate,ref,nb,startDate,endDate,tjm,taux,missionType }
    console.log(mission)
    fetch('http://localhost:8090/missions/', {
        method: "POST",
        headers: {"Authorization":`Bearer ${token}`},
        body:JSON.stringify(mission)
    }).then(()=>{
        console.log("New mission")
    })
/*console.log("hello",data)
    return () => {
        axios.post('http://localhost:8085/missions/', data)
        .then((response) => {
            console.log("response",response);
          });
    }*/
    
}