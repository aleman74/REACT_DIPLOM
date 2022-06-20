import {createSlice} from '@reduxjs/toolkit';


// Структура данных
const initialState = {
    search_text: ''
};


const searchReducer = createSlice({
    name: 'search',
    initialState,
    reducers: {

        searchReducer_set(state, action)
        {
            state = {...state, search_text: action.payload.search_text}

            return state;
        }
    },
});

export default searchReducer.reducer;

export const searchReducer_set_param = (search_text) => (
    {search_text: search_text}
);

export const { searchReducer_set } =  searchReducer.actions;

// Value Selector
export const searchSelector = (store) => store.searchReducer;
