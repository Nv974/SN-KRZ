import { SHOW_CART, SHOW_HEADER } from '../actions/displayActions';

const initialState = {
    showCart: 1,
    showHeader: true,
};

type Action = {
    type: string;
    move: number;
    bool: boolean;
};

const cartReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SHOW_CART:
            return {
                ...state,
                showCart: action.move,
            };
        case SHOW_HEADER:
            return {
                ...state,
                showHeader: action.bool,
            };

        default:
            return state;
    }
};

export default cartReducer;
