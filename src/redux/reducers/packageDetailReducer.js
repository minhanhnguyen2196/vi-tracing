let packageDetails = {
    "qrCode": "",
    "productType": "",
    "quantity": 0,
    "descr": "N/A"
}

const packageDetailReducer = (state = packageDetails, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_TYPE':
            return {
                ...state, productType: action.payload
            }
        case 'SET_QUANTITY':
            return {
                ...state, quantity: action.payload
            }
        case 'SET_DESCRIPTION':
            return {
                ...state, descr: action.payload
            }
        default:
            return state;
    }
};

export default packageDetailReducer;