import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    hits: [],
    loading: false,
    error: null,
    time_update: 0            // Дата последнего обновления данных
};


const hitReducer = createSlice({
    name: 'hit',
    initialState,
    reducers: {

        hitReducer_start(state, action)
        {
            state = {...state, loading: true, error: null}

            return state;
        },

        hitReducer_success (state, action)
        {
            let hits = [];

            if (action.payload.hits)
                hits = action.payload.hits;

            const date = new Date();

            state = {...state, hits: hits, loading: false, error: null, time_update: date.getTime()};

//            console.log('state', state);

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

export default hitReducer.reducer;

export const hitReducer_start_param = (url) => (
    {url: url, params: ''}
);
export const hitReducer_success_param = (hits) => (
    {hits: hits}
);
export const hitReducer_failure_param = (error) => (
    {error: error}
);
export const { hitReducer_start, hitReducer_success, hitReducer_failure } =  hitReducer.actions;

// Value Selector
export const hitSelector = (store) => store.hitReducer;
