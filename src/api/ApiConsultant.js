import axios from 'axios';
import { getConsultant } from 'store/reducers/menu';
var token = localStorage.getItem('token')

var profile = localStorage.getItem('profile');
var username = localStorage.getItem('username');
var userId = localStorage.getItem('userId');
/*********************All payslip *********************/
export function getConsultantFromApi() {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/consultants/`, { headers: {"Authorization" : `Bearer ${token}`} 

    }).then((res) => dispatch(getConsultant(res.data)));
    }
}

