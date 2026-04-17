const initialState = {
    user: null
};

const LOG_IN = 'app/auth/LOG_IN';
const LOG_OUT = 'app/auth/LOG_OUT';

export const logIn = payload => ({ type: LOG_IN, payload});
export const logOut = payload => ({ type: LOG_OUT});

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOG_IN:
            return { ...statePart, user: action.payload }
        case LOG_OUT:
            return { ...statePart, user: null };
        default:
            return statePart;
    }
};