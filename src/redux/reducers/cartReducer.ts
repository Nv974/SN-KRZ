import {
    ADD_TO_CART,
    ADD_QUANTITY,
    REMOVE_QUANTITY,
    REMOVE_TO_CART,
    ERASE_CART,
} from '../actions/cartActions';

const initialState = {
    list: [],
    sub: 0,
    total: 0,
};

type CartProduct = {
    id: number;
    name: string;
    brand: string;
    price: number;
    img: string;
    size: string;
    quantity: number;
};

type Action = {
    type: string;
    payload?: number;
    product?: CartProduct;
    price: number;
    id: number;
    size: string;
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newList = [...state.list, action.product];
            const productPrice = action.product!.price;

            return {
                ...state,
                list: newList,
                sub: state.sub + productPrice,
            };
        case REMOVE_TO_CART:
            const { id, size } = action;

            const newArr = state.list.filter((product: CartProduct) => {
                return product.id !== id || product.size !== size;
            });

            return {
                ...state,
                list: newArr,
                sub: state.sub - action.price,
            };
        case ADD_QUANTITY:
            const addQuantityList = state.list;
            addQuantityList.forEach(
                (product: CartProduct) =>
                    product.id === action.id &&
                    action.size === product.size &&
                    ++product.quantity,
            );

            return {
                ...state,
                list: addQuantityList,
                sub: state.sub + action.price,
            };
        case REMOVE_QUANTITY:
            const removeQuantityList = state.list;
            removeQuantityList.forEach(
                (product: CartProduct) =>
                    product.id === action.id &&
                    action.size === product.size &&
                    --product.quantity,
            );
            return {
                ...state,
                list: removeQuantityList,
                sub: state.sub - action.price,
            };
        case ERASE_CART:
            return {
                ...state,
                list: [],
                sub: 0,
                total: 0,
            };

        default:
            return state;
    }
};

export default cartReducer;
