let role = {
    farmer: true,
    verifier: false,
    shipper: false,
    market: false
}

const selectRoleReducer = (state = role, action) => {
    switch (action.type) {
        case 'SELECT_FARMER':
            return {
                farmer: true,
                verifier: false,
                shipper: false,
                market: false
            }
        case 'SELECT_VERIFIER':
            return {
                farmer: false,
                verifier: true,
                shipper: false,
                market: false
            }
        case 'SELECT_SHIPPER':
            return {
                farmer: false,
                verifier: false,
                shipper: true,
                market: false
            }
        case 'SELECT_MARKET':
            return {
                farmer: false,
                verifier: false,
                shipper: false,
                market: true
            }
        default:
            return state;
    }
};

export default selectRoleReducer;