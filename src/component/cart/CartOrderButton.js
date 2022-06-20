import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {cartReducer_order_start, cartReducer_order_start_param, cartSelector} from "../../store/cartReducer";
import {GetOrderObject, SetLocalStorage_user} from "../../data/global";


// Заказ
export default function CartOrderButton(props) {

    const dispatch = useDispatch();
    const {items, order_loading} = useSelector(cartSelector);

    // Отправляем заказ на сервер (в случае успеха очищаем корзину)
    const onClickOrder = (evt) => {
        evt.preventDefault();

        // Сохраняем данные о пользователе в localStorage
        SetLocalStorage_user(props.phone, props.address);

        dispatch(
            cartReducer_order_start(
                cartReducer_order_start_param(process.env.REACT_APP_URL_ORDER, GetOrderObject(items, props.phone, props.address))
            ));
    }

    // Блокируем кнопку, если нет товаров в корзине или пользователь не поставил галочку "Согласен с правилами доставки"
    if (order_loading || (items.length === 0) || (!props.is_agree) || (props.phone === '') || (props.address === ''))
    {
        return (
            <button type="submit" className="btn btn-outline-secondary" disabled onClick={onClickOrder}>Оформить</button>
        );
    }

    return (
        <button type="submit" className="btn btn-outline-secondary" onClick={onClickOrder}>Оформить</button>
    );
}

CartOrderButton.propTypes =
    {
        is_agree: PropTypes.bool.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }