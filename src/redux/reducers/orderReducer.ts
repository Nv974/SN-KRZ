import { ADD_ORDER, PAY_ORDER } from '../actions/orderActions';

const initialState = {
    order: [],
    payment: 'none',
};

type Action = {
    type: string;
    total: number;
    order: object;
    payment: string;
};

const orderReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                order: action.order,
            };
        case PAY_ORDER:
            return {
                ...state,
                payment: action.payment,
            };

        default:
            return state;
    }
};

export default orderReducer;
