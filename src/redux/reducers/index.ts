import { combineReducers } from 'redux';

import cartReducer from './cartReducer';
import displayReducer from './displayReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    display: displayReducer,
    order: orderReducer,
});

export default rootReducer;
