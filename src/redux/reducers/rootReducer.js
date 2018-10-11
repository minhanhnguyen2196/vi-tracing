import { combineReducers } from 'redux';
import selectRoleReducer from './selectRoleReducer';
import packageDetailReducer from './packageDetailReducer';
import getShipmentReducer from './getShipmentReducer';
import getUserInfoReducer from './getUserInfoReducer';

const rootReducer = combineReducers({
    role: selectRoleReducer,
    packageDetail: packageDetailReducer,
    shipment: getShipmentReducer,
    userInfo: getUserInfoReducer
});

export default rootReducer;