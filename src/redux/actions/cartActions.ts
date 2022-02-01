type CartProduct = {
    id: number;
    name: string;
    brand: string;
    price: number;
    img: string;
    size: number;
    quantity: number;
};

export const addToCart = (product: CartProduct) => {
    return {
        type: ADD_TO_CART,
        product,
    };
};

export const ADD_TO_CART = 'ADD_TO_CART';

export const removeToCart = (id: number, size: number, price: number) => {
    return {
        type: REMOVE_TO_CART,
        id,
        size,
        price,
    };
};

export const REMOVE_TO_CART = 'REMOVE_TO_CART';

export const addQuantity = (id: number, size: number, price: number) => {
    return {
        type: ADD_QUANTITY,
        id,
        size,
        price,
    };
};

export const ADD_QUANTITY = 'ADD_QUANTITY';

export const removeQuantity = (id: number, size: number, price: number) => {
    return {
        type: REMOVE_QUANTITY,
        id,
        size,
        price,
    };
};

export const REMOVE_QUANTITY = 'REMOVE_QUANTITY';

export const eraseCart = () => {
    return {
        type: ERASE_CART,
    };
};

export const ERASE_CART = 'ERASE_CART';
