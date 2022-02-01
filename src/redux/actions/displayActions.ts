export const showCart = (move: number) => {
    return {
        type: SHOW_CART,
        move,
    };
};

export const SHOW_CART = 'SHOW_CART';

export const showHeader = (bool: boolean) => {
    return {
        type: SHOW_HEADER,
        bool,
    };
};

export const SHOW_HEADER = 'SHOW_HEADER';
