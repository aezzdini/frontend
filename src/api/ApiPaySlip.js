import axios from 'axios';
import { getPaySlip } from 'store/reducers/menu';
var token = localStorage.getItem('token')

var profile = localStorage.getItem('profile');
var username = localStorage.getItem('username');
var userId = localStorage.getItem('userId');
/*********************All payslip *********************/
export function getPaySlipFromApi() {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_URL}/payslips/`, { headers: {"Authorization" : `Bearer ${token}`} 

    }).then((res) => dispatch(getPaySlip(res.data)));
    }
}

