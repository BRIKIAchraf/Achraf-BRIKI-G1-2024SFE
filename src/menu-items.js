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
  AccountTreeOutlinedIcon,
  AppsOutlinedIcon,
  ContactSupportOutlinedIcon,
  BlockOutlinedIcon,
  ChromeReaderModeOutlinedIcon,
  SecurityOutlinedIcon,
  HelpOutlineOutlinedIcon,
  AccessTimeIcon,
  PersonOutlinedIcon,
  EventNoteOutlinedIcon,
  EventAvailableOutlinedIcon,
  DevicesOutlinedIcon,
  AddCircleOutlineIcon,
  LockOpenIcon,
  BusinessOutlinedIcon
};

// Configuration du menu
export default {
  items: [
    {
      id: 'navigation',
      title: '',
      caption: 'Dashboard',
      type: 'group',
      icon: icons.NavigationOutlinedIcon,
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons.HomeOutlinedIcon,
          url: '/dashboard/default'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      caption: 'Prebuild Pages',
      type: 'group',
      icon: icons.NavigationOutlinedIcon,
      children: [
        {
          id: 'sample-page',
          title: 'Employe',
          type: 'collapse',
         // url: '/sample-page',
          icon: icons.PersonOutlinedIcon,
          children:[
            {
              id: 'add-employee',
              title: 'Ajouter un employe',
              type: 'item',
              url: '/AddEmployee',
              icon: icons.PersonOutlinedIcon
            },
            {
              id :'EmployeeDetails',
              title: 'Liste des employes',
              type: 'item',
              url: '/sample-page',
              icon: icons.PersonOutlinedIcon
            }
          ]
        },
        {
          id: 'leave-management',
          title: 'Congé ',
          type: 'collapse',
          icon: icons.EventNoteOutlinedIcon,
          children: [
            {
              id: 'add-leave-form',
              title: 'Ajouter un congé',
              type: 'item',
              url: '/AddLeaveForm1',
              icon: icons.EventNoteOutlinedIcon,
            },
            {
              id: 'list-leave-form',
              title: 'Voir les conges',
              type: 'item',
              url: '/LeaveManagement',
              icon: icons.EventNoteOutlinedIcon,
            }
          ]
        },
        {
          id: 'planning-management',
          title: 'Horraire',
          type: 'collapse',
          icon: icons.AccessTimeIcon,
          children: [
            {
              id: 'add-planning',
              title: 'Ajouter un Horraire',
              type: 'item',
              url: 'AddPlanning',
              icon: icons.AccessTimeIcon,
            },
            {
              id: 'list-planning',
              title: 'Liste des Horraires',
              type: 'item',
              url: 'PlanningManagement',
              icon: icons.AccessTimeIcon,
            }
          ]
        },
        {
          id: 'attendance',
          title: 'Presence',
          type: 'item',
          url: '/attendance',
          icon: icons.EventAvailableOutlinedIcon
        },
        {
          id: 'device-management',
          title: 'Appareils',
          type: 'item',
          url: '/devicemanagement',
          icon: icons.DevicesOutlinedIcon
        },
        {
          id: 'login-methods',
          title: 'Methodepointage',
          type: 'item',
          url : '/LoginMethods',
          icon: icons.LockOpenIcon,
        },
        {
          id: 'department-management',
          title: 'Department',
          type: 'item',
          url: '/departmentmanagement',
          icon: icons.BusinessOutlinedIcon
        },
      ]
    },
  ]
};
