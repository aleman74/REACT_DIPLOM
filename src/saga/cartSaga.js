import {takeLatest, put, retry} from 'redux-saga/effects';
import {RETRY_COUNT, RETRY_DELAY} from "../data/global";

import {
    cartReducer_order_failure,
    cartReducer_order_failure_param,
    cartReducer_order_start,
    cartReducer_order_success
} from "../store/cartReducer";
import {saveData} from "../api/save";



// watcher
export function *watch_cart_order() {

    yield takeLatest(cartReducer_order_start, handle_cart_order);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handle_cart_order(action) {

    try {
        const result = yield retry(RETRY_COUNT, RETRY_DELAY, saveData, action.payload.url, action.payload.data);

        yield put(
            cartReducer_order_success()
            );
    }
    catch(ex) {
        yield put(
            cartReducer_order_failure(
                cartReducer_order_failure_param(ex.message)
            ));
    }
}
