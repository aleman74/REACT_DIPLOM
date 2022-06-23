import {createSlice} from '@reduxjs/toolkit';
import {JoinArray} from "../data/global";


// Структура данных
const initialState = {
    items: [],
    all_items: [],
    loading: false,
    error: null,
    is_add: false           // Режим добавления данных (не перезапись)
};


const catalogReducer = createSlice({
    name: 'catalog',
    initialState,
    reducers: {

        catalogReducer_start(state, action)
        {
            state = {...state, items: [], loading: true, error: null, is_add: action.payload.is_add}

            return state;
        },

        catalogReducer_success (state, action)
        {
            let items = [];
            let all_items = [];

            if (action.payload.items)
                items = action.payload.items;

            if (state.is_add)
                all_items = JoinArray(state.items, items);
            else
                all_items = items;

            state = {...state, items: items, all_items: all_items, loading: false, error: null};

            return state;
        },

        catalogReducer_failure(state, action)
        {
            const error = action.payload.error;
            state = {...state, loading: false, error: error}

            return state;
        }
    },
});

export default catalogReducer.reducer;

export const catalogReducer_start_param = (url, params, is_add) => (
    {url: url, params: params, is_add: is_add}
);
export const catalogReducer_success_param = (items) => (
    {items: items}
);
export const catalogReducer_failure_param = (error) => (
    {error: error}
);
export const { catalogReducer_start, catalogReducer_success, catalogReducer_failure } =  catalogReducer.actions;

// Value Selector
export const catalogSelector = (store) => store.catalogReducer;
