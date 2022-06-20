import {takeLatest, put, retry} from 'redux-saga/effects';
import {RETRY_COUNT, RETRY_DELAY} from "../data/global";
import {loadData} from "../api/load";
import {
    hitReducer_failure,
    hitReducer_failure_param,
    hitReducer_start,
    hitReducer_success,
    hitReducer_success_param
} from "../store/hitReducer";


// watcher
export function *watch_hit() {

    yield takeLatest(hitReducer_start, handle_hit);     // takeLatest - отменяет предыдущую задачу
}


// worker
function *handle_hit(action) {

//    console.log('handle_hit', action);

    try {
        const data = yield retry(RETRY_COUNT, RETRY_DELAY, loadData, action.payload.url, action.payload.params);

        yield put(
            hitReducer_success(
                hitReducer_success_param(data)
            ));
    }
    catch(ex) {
        yield put(
            hitReducer_failure(
                hitReducer_failure_param(ex.message)
            ));
    }
}
