import {createSlice} from '@reduxjs/toolkit';
import {CartItem_clone} from "../data/global";


// Структура данных
const initialState = {
    items: [],
    order_loading: false,
    order_error: null,
    order_complete: false
};


const cartReducer = createSlice({
    name: 'search',
    initialState,
    reducers: {

        cartReducer_add(state, action)
        {
            // Проверяем наличие такого же товара в корзине
            let index = -1;

            for (let i = 0; i < state.items.length; i++)
            {
                if ((state.items[i].id === action.payload.item.id) && (state.items[i].size === action.payload.item.size))
                {
                    index = i;
                    break;
                }
            }

            let new_items = [];

            if (index === -1) {
                new_items = state.items.slice(0);
                new_items.push(action.payload.item);
            } else {
                for (let i = 0; i < state.items.length; i++)
                {
                    let v = null;

                    if (i === index)
                        v = CartItem_clone(state.items[i], action.payload.item.count, action.payload.item.amount);
                    else
                        v = state.items[i];  // CartItem_clone(state.items[i]);

                    new_items.push(v);
                }
            }

            state = {...state, items: new_items, order_error: null, order_complete: false};

            return state;
        },

        cartReducer_delete(state, action)
        {
            const new_items = state.items.filter(item => item.cart_id !== action.payload.cart_id);
            state = {...state, items: new_items, order_error: null, order_complete: false};

            return state;
        },

        cartReducer_order_start(state, action)
        {
            state = {...state, order_loading: true, order_error: null, order_complete: false}
            return state;
        },

        cartReducer_order_success(state, action)
        {
            state = {...state, order_loading: false, items: [], order_complete: true}
            return state;
        },

        cartReducer_order_failure(state, action)
        {
            state = {...state, order_loading: false, order_error: action.payload.error, order_complete: false}
            return state;
        }
    },
});

export default cartReducer.reducer;

export const cartReducer_add_param = (item) => (
    {item: item}
);
export const cartReducer_delete_param = (cart_id) => (
    {cart_id: cart_id}
);
export const cartReducer_order_start_param = (url, data) => (
    {url: url, data: data}
);
export const cartReducer_order_failure_param = (error) => (
    {error: error}
);

export const { cartReducer_add, cartReducer_delete,
    cartReducer_order_start, cartReducer_order_success, cartReducer_order_failure } =  cartReducer.actions;

// Value Selector
export const cartSelector = (store) => store.cartReducer;
