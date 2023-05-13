// project import
//import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import pages from './pages';
// ==============================|| MENU ITEMS ||============================== //
var token = localStorage.getItem('token')
let menuItems = { items: []}
console.log("token fffffff",token)

token !=null?
 menuItems = {
    items: [dashboard,  utilities, support] 
}
//console.log("token11",token)
:
 menuItems = {
    items: [pages]
};
//console.log("token22",token)
export default menuItems;
