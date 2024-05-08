import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'; // New icon for department

const icons = {
  NavigationOutlinedIcon,
  HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon,
  AccountTreeOutlinedIcon,
  BlockOutlinedIcon,
  AppsOutlinedIcon,
  ContactSupportOutlinedIcon,
  AccessTimeIcon,
  PersonOutlinedIcon,
  EventNoteOutlinedIcon,
  EventAvailableOutlinedIcon,
  DevicesOutlinedIcon,
  AddCircleOutlineIcon,
  LockOpenIcon,
  BusinessOutlinedIcon,
  AddCircleOutlineIcon
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
          title: 'Employe',
          type: 'item',
          url: '/sample-page',
          icon: icons['PersonOutlinedIcon']
        },
        {
          id: 'leave-management',
          title: 'Congé ',
          type: 'collapse',
          icon: icons['EventNoteOutlinedIcon'],
          children: [
            {
              id: 'add-leave-form',
              title: 'Liste des congés',
              type: 'item',
              url: '/leavemanagement/AddLeaveForm1',
              icon: icons['EventNoteOutlinedIcon'],
            }
          ]
        },
        {
          id: 'planning-management',
          title: 'Planning Management',
          type: 'collapse',
          icon: icons['AccessTimeIcon'],
          children: [
            {
              id: 'add-planning',
              title: 'Add Planning',
              type: 'item',
              url: '/addplanning',
              icon: icons['AccessTimeIcon'],
            }
          ]
        },
        {
          id: 'attendance-management',
          title: 'Presence',
          type: 'item',
          url: '/attendancemanagement',
          icon: icons['EventAvailableOutlinedIcon']
        },
        {
          id: 'device-management',
          title: 'Device Management',
          type: 'item',
          url: '/devicemanagement',
          icon: icons['DevicesOutlinedIcon']
        },
        {
          id: 'login-methods',
          title: 'Methode de pointage',
          type: 'item',
          url: '/login',
          icon: icons['LockOpenIcon']
        },
        {
          id: 'Department',
          title: 'Department',
          type: 'item',
          url: '/DepartmentManagement',
          icon: icons['BusinessOutlinedIcon']
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
