// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import dashboardReducer from './dashboardSlice'; // Import the dashboard slice reducer

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  dashboard: dashboardReducer // Add the dashboard slice reducer to the root reducer
});

export default reducer;
