// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import dashboardReducer from './dashboardSlice'; // Import the dashboard slice reducer
import attendanceReducer from './attendanceSlice'; // Import the attendance slice reducer
import planningReducer from './planningSlice'; // Import the planning slice reducer
// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  dashboard: dashboardReducer ,// Add the dashboard slice reducer to the root reducer
  attendance: attendanceReducer,
  planning: planningReducer,
});

export default reducer;
