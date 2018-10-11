let shipment = {};

const getShipmentReducer = (state = shipment, action) => {
    if (action.type === 'GET_SHIPMENT') {
        return action.payload;
    }
    return state;
};

export default getShipmentReducer;