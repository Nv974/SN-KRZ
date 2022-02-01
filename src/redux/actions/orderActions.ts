interface FormInputs {
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    country: string;
    company?: string;
    street: string;
    sup: string;
    zip: string;
    city: string;
    delivery: string;
    phone: string;
}

type Order = {
    id: number;
    userInformations: FormInputs;
    products: [];
    subPrice: number;
    deliveryPrice: number;
    totalPrice: number;
    finish: boolean;
};

export const addOrder = (order: Order) => {
    return {
        type: ADD_ORDER,
        order,
    };
};

export const ADD_ORDER = 'ADD_ORDER';

export const payOrder = (payment: string) => {
    return {
        type: PAY_ORDER,
        payment,
    };
};

export const PAY_ORDER = 'PAY_ORDER';
