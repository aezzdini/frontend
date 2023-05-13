import { useRoutes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================
export default function ThemeRoutes() {

 
    return useRoutes([MainRoutes,LoginRoutes]);
   
}
