import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities

const PaySlip = Loadable(lazy(() => import('pages/components-overview/PaySlip')));
const PaySlipInterfaceAdmin = Loadable(lazy(() => import('pages/components-overview/PaySlipAdmin')));

const FicheDePaieTable = Loadable(lazy(() => import('pages/components-overview/FicheDePaieTable')));
const Profiluser = Loadable(lazy(() => import('pages/components-overview/Profiluser')));
const GestionFolder=Loadable(lazy(()=>import('pages/components-overview/GestionDocument')))

const Missions = Loadable(lazy(() => import('pages/components-overview/Missions')));
const Profile = Loadable(lazy(() => import('pages/components-overview/Profile')));
const Contrat = Loadable(lazy(() => import('pages/components-overview/Contrat')));
const AddContrat = Loadable(lazy(() => import('pages/components-overview/AddContrat')));
const EditContrat = Loadable(lazy(() => import('pages/components-overview/EditContrat')));
const SendMail = Loadable(lazy(() => import('pages/components-overview/SendMail')));
const Client = Loadable(lazy(() => import('pages/components-overview/Client')));
const AddClient =Loadable(lazy(() => import('pages/components-overview/AddClient')));
const EditClient =Loadable(lazy(() => import('pages/components-overview/EditClient')));
const Collaborateur = Loadable(lazy(() => import('pages/components-overview/Collaborateur')));
const Activity = Loadable(lazy(() => import('pages/components-overview/MissionActivities')));
const Prestation = Loadable(lazy(() => import('pages/components-overview/Prestation')));
const TypeMission = Loadable(lazy(() => import('pages/components-overview/TypeMission')));
const Viewprestations = Loadable(lazy(() => import('pages/components-overview/Viewprestations')));

const Ecranparametrage = Loadable(lazy(() => import('pages/components-overview/Ecranparametrage')));
const Nature = Loadable(lazy(() => import('pages/components-overview/Nature')));
const TypeNature = Loadable(lazy(() => import('pages/components-overview/TypeNature')));

const AddConsultant =Loadable(lazy(() => import('pages/components-overview/AddConsultant')));

const Consultants =Loadable(lazy(() => import('pages/components-overview/Consultants')));
const Editprofil =Loadable(lazy(() => import('pages/components-overview/Editprofil')));
const NotFound =Loadable(lazy(() => import('pages/components-overview/NotFound')));
const AddPassword = Loadable(lazy(() => import('pages/authentication/AddPassword')));

const ViewConsultant = Loadable(lazy(() => import('pages/components-overview/ViewConsultant')));

// ==============================|| MAIN ROUTING ||============================== //

const role = localStorage.getItem('profile');
var token = localStorage.getItem('token')
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
        path: 'addPassword/:tokenurl',
        /* element: (role === 'CONSULTANT' || role === 'ADMIN') ? <NotFound /> : <AddPassword />, */
        element: <AddPassword />, 
      },
    {
      path: 'dashboard/default',
      element: <DashboardDefault />,
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
    {
      path: 'mission',
   
      element: role === 'ADMIN' ? <Missions /> : <NotFound />,
    },
    {
      path: 'gestiondoc',
     
      element: role === 'ADMIN' ? <GestionFolder /> : <NotFound />,
    },
    {
      path: 'profile',
      element: role === 'CONSULTANT' ? <Profile /> : <NotFound />,
    },
    {
      path: 'Editprofil',
      element: role === 'CONSULTANT' ? <Editprofil /> : <NotFound />,
    },
    ,
    {
      path: 'addclient',
      element: role === 'ADMIN' ? <AddClient /> : <NotFound />,
    },
    {
      path: 'Contrat',
      element: role === 'ADMIN' ? <Contrat /> : <NotFound />,
    },
    {
      path: 'AddContrat',
      element: role === 'ADMIN' ? <AddContrat /> : <NotFound />,
    },
    {
      path: 'editclient',
      element: role === 'ADMIN' ? <EditClient/> : <NotFound />,
    },
    {
      path: 'prestation',
      element: role === 'CONSULTANT' ? <Prestation /> : <NotFound />,
    },
    {
      path: 'viewprestations',
      element: role === 'CONSULTANT' ? <Viewprestations /> : <NotFound />,
    },
    {
      path: 'Profiluser',
      element: role === 'CONSULTANT' ? <Profiluser /> : <NotFound />,
    },
    {
      path: 'Consultants',
      element: role === 'ADMIN' ? <Consultants /> : <NotFound />,
    },
    {
      path: 'addconsultant',
      element: role === 'ADMIN' ? <AddConsultant /> : <NotFound />,
    },
    {
      path: 'client',
      element: role === 'ADMIN' ? <Client /> : <NotFound />,
    },
    {
      path: 'sendmail',
      element: role === 'ADMIN' ? <SendMail /> : <NotFound />,
      
    },
    {
      path: 'collaborateur',
      element: role === 'ADMIN' ? <Collaborateur /> : <NotFound />,
    },
    {
      path: 'nature',
      lement: role === 'ADMIN' ? <Nature /> : <NotFound />,
     
    },
    {
      path: 'typemission',
     
      lement: role === 'ADMIN' ? <TypeMission /> : <NotFound />,
    },
    {
      path: 'typenature',
      element:role === 'ADMIN' ?<TypeNature />: <NotFound />,
    },
    {
      path: 'ecranparametrage',
      element:role === 'ADMIN' ? <Ecranparametrage />: <NotFound />,
    },
    {
      path: 'activity/:missionId',
      element: role === 'ADMIN' ?  <Activity />: <NotFound />,
    },
    {
      path: 'viewConsultant/:consultantId',
      element: role === 'ADMIN' ?  <ViewConsultant />: <NotFound />,
    },
    {
      path: 'FichesPaie',
      element: (role === 'ADMIN') ?   <PaySlipInterfaceAdmin/>: <PaySlip />,
    },
    
    {
      path: 'FicheDePaieTable',
      element: (role === 'CONSULTANT' || role === 'ADMIN') ?  <FicheDePaieTable /> : <NotFound />,
    },
    
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default MainRoutes;
