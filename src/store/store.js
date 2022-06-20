import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import categoryReducer from "./categoryReducer";
import sagas from "../saga/sagas";
import hitReducer from "./hitReducer";
import catalogReducer from "./catalogReducer";
import searchReducer from "./searchReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";


// Конфигурируем Saga
const sagaMiddleware = createSagaMiddleware();

// Конфигурируем Store
const store = configureStore({
    reducer: {
        categoryReducer,
        hitReducer,
        catalogReducer,
        searchReducer,
        productReducer,
        cartReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(sagas);

export default store;