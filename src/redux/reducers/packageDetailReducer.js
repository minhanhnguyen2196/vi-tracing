let packageDetails = {
    "qrCode": "",
    "productName": "",
    "quantity": 0,
    "descr": "N/A"
}

const packageDetailReducer = (state = packageDetails, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_NAME':
            return {
                ...state, productName: action.payload
            }
        case 'SET_QUANTITY':
            return {
                ...state, quantity: action.payload
            }
        case 'SET_DESCRIPTION':
            return {
                ...state, descr: action.payload
            }
        case 'SET_QRCODE':
            return {
                ...state, qrCode: action.payload
            }
        default:
            return state;
    }
};

export default packageDetailReducer;