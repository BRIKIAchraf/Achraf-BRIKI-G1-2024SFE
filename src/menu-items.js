// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import LeaveManagement from './views/Conge/LeaveManagement'; // Importation de LeaveManagement
import PlanningManagement from './views/planning/index'; // Importation de PlanningManagement
import AttendanceManagement from './views/attendances/index'; // Importation de AttendanceManagement

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// Configuration du menu
// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: '',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'sample-page',
          title: 'gestion de employe',
          type: 'item',
          url: '/sample-page',
          icon: icons['ChromeReaderModeOutlinedIcon']
        },
        {
          id: 'leave-management', // ID pour la gestion des congés
          title: 'Leave Management', // Titre du menu
          type: 'item', // Type d'élément de menu
          url: '/leavemanagement', // URL de la page de gestion des congés
          icon: icons['AppsOutlinedIcon'] // Icône du menu
        },
        {
          id: 'planning-management', // ID pour la gestion des plannings
          title: 'Planning Management', // Titre du menu
          type: 'item', // Type d'élément de menu
          url: '/planningmanagement', // URL de la page de gestion des plannings
          icon: icons['AppsOutlinedIcon'] // Icône du menu
        
        },
        {
          id: 'attendance-management',
          title: 'Attendance Management',
          type: 'item',
          url: '/attendancemanagement',
          icon: icons['AppsOutlinedIcon']

        },
        {
         id :  'device-management',
         title : 'Device Management',
         type : 'item',
         url : '/devicemanagement',
         icon : icons['AppsOutlinedIcon']
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/application/login',
              target: true
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/application/register',
              target: true
            }
          ]
        }
      ]
    },
  ]
};
