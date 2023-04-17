import {CHECKOUT_UPDATE_EMAIL} from './checkout-actions';

const initialState = {
    email: null,
};

export default function checkout(state = initialState, {type, payload}) {
    switch (type) {
        case CHECKOUT_UPDATE_EMAIL: {
            return {
                ...state,
                email: payload || null
            };
        }

        default:
            return state;
    }
}
