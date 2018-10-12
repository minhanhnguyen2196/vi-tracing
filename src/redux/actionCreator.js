export function selectRole(role) {
    switch (role) {
        case 'farmer':
            return { type: 'SELECT_FARMER' };
        case 'verifier':
            return { type: 'SELECT_VERIFIER' };
        case 'shipper':
            return { type: 'SELECT_SHIPPER' };
        case 'market':
            return { type: 'SELECT_MARKET' };
        default:
            break;
    }
}

export function setProductName(productName) {
    return { type: 'SET_PRODUCT_NAME', payload: productName};
}

export function setQuantity(quantity) {
    return { type: 'SET_QUANTITY', payload: quantity};
}

export function setDescription(descr) {
    return { type: 'SET_DESCRIPTION', payload: descr};
}

export function getShipment(shipment) {
    return { type: 'GET_SHIPMENT', payload: shipment };
}

export function getUserInfo(userInfo) {
    return { type: 'GET_USER_INFO', payload: userInfo}
}

export function setQRCode(code) {
    return { type: 'SET_QRCODE', payload: code}
}