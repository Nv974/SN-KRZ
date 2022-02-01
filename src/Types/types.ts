export interface stateInterface  {
    cart : {
        list : [];
        sub : number;
        total : number;
    };
    display : {
        showCart : number;
        showHeader : boolean
    }
    order : {
        order : [];
        payment : string
    }
}

export interface productInterface  {
    brand : string;
    id : number;
    img : string;
    name : string;
    price : number;
    quantity : number;
    size : number
}

export interface FormInputs {
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

export interface CartProps {
    id : number;
    img : string;
    name : string;
    price : number;
    quantity : number;
    size : number;
    brand :string
}