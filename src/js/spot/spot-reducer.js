import {SPOT_UPDATE_SELECTED, SPOT_PURCHASE} from './spot-actions';

const initialState = {
    selected: null,
};

export default function spot(state = initialState, {type, payload}) {
    switch (type) {
        case SPOT_UPDATE_SELECTED: {
            return {
                ...state,
                selected: payload || null
            };
        }

        case SPOT_PURCHASE: {
            return {
                ...state,
                selected: null
            };
        }

        default:
            return state;
    }
}
