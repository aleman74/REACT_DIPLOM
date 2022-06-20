import {takeLatest, put, retry} from 'redux-saga/effects';
import {RETRY_COUNT, RETRY_DELAY} from "../data/global";
import {loadData} from "../api/load";
import {
    productReducer_failure, productReducer_failure_param,
    productReducer_start,
    productReducer_success,
    productReducer_success_param
} from "../store/productReducer";


// watcher
export function *watch_product() {

    yield takeLatest(productReducer_start, handle_product);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handle_product(action) {

//    console.log('handle_hit', action);

    try {
        const data = yield retry(RETRY_COUNT, RETRY_DELAY, loadData, action.payload.url, action.payload.params);

        yield put(
            productReducer_success(
                productReducer_success_param(data)
            ));
    }
    catch(ex) {
        yield put(
            productReducer_failure(
                productReducer_failure_param(ex.message)
            ));
    }
}
