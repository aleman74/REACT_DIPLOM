import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    categories: [],
    loading: false,
    error: null,
};


const categoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {

        categoryReducer_start(state, action)
        {
            state = {...state, loading: true, error: null}

            return state;
        },

        categoryReducer_success (state, action)
        {
            let categories = [];

            if (action.payload.categories)
                categories = action.payload.categories;

            state = {...state, categories: categories, loading: false, error: null};

            return state;
        },

        categoryReducer_failure(state, action)
        {
            const error = action.payload.error;
            state = {...state, loading: false, error: error}

            return state;
        }
    },
});

export default categoryReducer.reducer;

export const categoryReducer_start_param = (url) => (
    {url: url, params: ''}
);
export const categoryReducer_success_param = (categories) => (
    {categories: categories}
);
export const categoryReducer_failure_param = (error) => (
    {error: error}
);
export const { categoryReducer_start, categoryReducer_success, categoryReducer_failure } =  categoryReducer.actions;

// Value Selector
export const categorySelector = (store) => store.categoryReducer;
