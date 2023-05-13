// project import
import Routes from 'routes';
import ThemeCustomization from 'themes'
import ScrollTop from 'components/ScrollTop';
import ThemeRoutes from 'routes/index';
import Login from 'pages/authentication/Login';
import AddPassword from 'pages/authentication/AddPassword';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
var token = localStorage.getItem('token')
const App = () => (
    <ThemeCustomization>
        <ScrollTop>
          {/* {token !=null?  
            <ThemeRoutes />:<Login/>}   */} 
            <ThemeRoutes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
