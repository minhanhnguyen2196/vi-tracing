let userInfo = {};

const getUserInfoReducer = (state = userInfo, action) => {
    if (action.type === 'GET_USER_INFO') {
        return action.payload;
    }
    return state;
};

export default getUserInfoReducer;