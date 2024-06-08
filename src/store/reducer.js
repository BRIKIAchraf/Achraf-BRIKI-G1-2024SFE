// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import dashboardReducer from './dashboardSlice'; // Import the dashboard slice reducer
import attendanceReducer from './attendanceSlice'; // Import the attendance slice reducer
import planningReducer from './planningSlice'; // Import the planning slice reducer
import employeeReducer from './employeeSlice'; // Import the employee slice reducer
import searchReducer from './searchSlice'; // Import the search slice reducer
import departementReducer from './departementSlice'; // Import the departement slice reducer
import leaveReducer from './leaveSlice'; // Import the leave slice reducer
import loginMethodsReducer from './loginMethodsSlice'; // Import the leave slice reducer
import deviceReducer from './deviceSlice';
// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  dashboard: dashboardReducer ,// Add the dashboard slice reducer to the root reducer
  attendances: attendanceReducer,
  planning: planningReducer,
  search: searchReducer,
  departements: departementReducer,
  leaves: leaveReducer,
  employees: employeeReducer, // Add the employee slice reducer to the root reducer
  loginMethods: loginMethodsReducer, // Add the loginMethods slice reducer to the root reducer
  devices: deviceReducer,
});

export default reducer;
