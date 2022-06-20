import {spawn} from 'redux-saga/effects';
import {watch_category} from "./categorySaga";
import {watch_hit} from "./hitSaga";
import {watch_catalog} from "./catalogSaga";
import {watch_product} from "./productSaga";
import {watch_cart_order} from "./cartSaga";


// Коренная sagas - необязательная
export default function *sagas() {
    yield spawn(watch_category);     // spawn изолирует дочернюю sagas от коренной
    yield spawn(watch_hit);
    yield spawn(watch_catalog);
    yield spawn(watch_product);
    yield spawn(watch_cart_order);
}