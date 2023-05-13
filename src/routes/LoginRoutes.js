import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AddPassword = Loadable(lazy(() => import('pages/authentication/AddPassword')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },{
            path:'addPassword/:tokenurl' ,
            element:<AddPassword/>
     
            
        }
    ]
};

export default LoginRoutes;
