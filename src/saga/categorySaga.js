import {takeLatest, put, retry} from 'redux-saga/effects';
import {
    categoryReducer_failure,
    categoryReducer_failure_param,
    categoryReducer_start,
    categoryReducer_success,
    categoryReducer_success_param
} from "../store/categoryReducer";
import {RETRY_COUNT, RETRY_DELAY} from "../data/global";
import {loadData} from "../api/load";


// watcher
export function *watch_category() {

    yield takeLatest(categoryReducer_start, handle_category);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handle_category(action) {

//    console.log('handle_category', action);

    try {
        const data = yield retry(RETRY_COUNT, RETRY_DELAY, loadData, action.payload.url, action.payload.params);

        yield put(
            categoryReducer_success(
                categoryReducer_success_param(data)
            ));
    }
    catch(ex) {
        yield put(
            categoryReducer_failure(
                categoryReducer_failure_param(ex.message)
            ));
    }
}
