// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
  };
  
  const role = localStorage.getItem('profile');
  const token = localStorage.getItem('token');
  
  // Define the default utilities object with no items
  const defaultUtilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [],
  };
  
  // Define the utilities object with items based on the user's role and token value
  let utilities = defaultUtilities;
  
  if (token && role === 'ADMIN') {
    utilities = {
      id: 'utilities',
      title: '',
      type: 'group',
      children: [
        {
          id: 'missions',
          title: 'Missions',
          type: 'item',
          url: 'mission',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'Contrat',
          title: 'Contrat',
          type: 'item',
          url: 'Contrat',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'sendMail',
          title: 'Mail',
          type: 'item',
          url: 'sendMail',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'Consultants',
          title: 'Consultants',
          type: 'item',
          url: 'Consultants',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'Clients',
          title: 'Clients',
          type: 'item',
          url: 'client',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'ecranparametrage',
          title: 'Ecran paramétrage',
          type: 'item',
          url: 'ecranparametrage',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'FicheDePaieTable',
          title: 'Table Fiche De Paie',
          type: 'item',
          url: 'FicheDePaieTable',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        , {
          id: 'PaySlipInterfaceAdmin',
          title: 'Fiches de Paie',
          type: 'item',
          url: 'FichesPaie',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },

        {
          id: 'gestiondoc',
          title: 'Gestion  des documents',
          type: 'item',
          url: 'gestiondoc',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
      ],
    };
  } else if (token) {
    utilities = {
      id: 'utilities',
      title: '',
      type: 'group',
      children: [
        {
          id: 'prestation',
          title: 'CRA',
          type: 'item',
          url: 'viewprestations',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'Profiluser',
          title: 'Profil user',
          type: 'item',
          url: 'Profiluser',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },
        {
          id: 'FicheDePaieTable',
          title: 'Table Fiche De Paie',
          type: 'item',
          url: 'FicheDePaieTable',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        },   {
          id: 'PaySlip',
          title: 'Fiches Paie',
          type: 'item',
          url: 'FichesPaie',
          icon: icons.AntDesignOutlined,
          breadcrumbs: false,
        }

      
      ],
    };
  } else {
    utilities = defaultUtilities;
  }
  
  export default utilities;
  