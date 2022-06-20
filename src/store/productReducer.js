import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    item: null,
    loading: false,
    error: null,
};


const productReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {

        productReducer_start(state, action)
        {
            state = {...state, loading: true, error: null}

            return state;
        },

        productReducer_success (state, action)
        {
            let item = null;

            if (action.payload.item)
                item = action.payload.item;

            state = {...state, item: item, loading: false, error: null};

            return state;
        },

        productReducer_failure(state, action)
        {
            const error = action.payload.error;
            state = {...state, loading: false, error: error}

            return state;
        }
    },
});

export default productReducer.reducer;

export const productReducer_start_param = (url, params) => (
    {url: url, params: params}
);
export const productReducer_success_param = (item) => (
    {item: item}
);
export const productReducer_failure_param = (error) => (
    {error: error}
);
export const { productReducer_start, productReducer_success, productReducer_failure } =  productReducer.actions;

// Value Selector
export const productSelector = (store) => store.productReducer;
