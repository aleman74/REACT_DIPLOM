import {takeLatest, put, retry} from 'redux-saga/effects';
import {RETRY_COUNT, RETRY_DELAY} from "../data/global";
import {loadData} from "../api/load";
import {
    catalogReducer_failure,
    catalogReducer_failure_param,
    catalogReducer_start,
    catalogReducer_success,
    catalogReducer_success_param
} from "../store/catalogReducer";


// watcher
export function *watch_catalog() {

    yield takeLatest(catalogReducer_start, handle_catalog);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handle_catalog(action) {

//    console.log('handle_category', action);

    try {
        const data = yield retry(RETRY_COUNT, RETRY_DELAY, loadData, action.payload.url, action.payload.params);

        yield put(
            catalogReducer_success(
                catalogReducer_success_param(data)
            ));
    }
    catch(ex) {
        yield put(
            catalogReducer_failure(
                catalogReducer_failure_param(ex.message)
            ));
    }
}
