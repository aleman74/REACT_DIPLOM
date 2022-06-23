import {useSelector} from "react-redux";
import {cartSelector} from "../../store/cartReducer";
import {FormatPrice} from "../../data/global";
import CartInfoItem from "./CartInfoItem";
import Message from "../message/Message";
import Preloader from "../preloader/Preloader";


// Содержимое корзины
export default function CartInfo() {

    const {items, order_loading, order_error, order_complete} = useSelector(cartSelector);

    // Рассчитываем полную стоимость
    let all_amount = 0;

    for (let i = 0; i < items.length; i++)
        all_amount += items[i].amount;

    let num = 1;

    let msg = [];
    let msg_type = '';

    if (order_loading) {
        msg = ['Идёт оформление заказа!', 'Подождите пожалуйста.'];
        msg_type = 'normal';
    }
    else if (order_complete) {
        msg = ['Заказ успешно оформлен!', 'Приятных покупок на сайте.'];
        msg_type = 'ok';
    }
    else if (order_error) {
        msg = ['Возникла ошика: ' + order_error, 'Попробуйте повторить операцию позднее.'];
        msg_type = 'error';
    }

    return (
            <section className="cart">
                <h2 className="text-center">Корзина</h2>

                <Message msg={msg} msg_type={msg_type} />
                {
                    (order_loading) && <Preloader />
                }

                <table id="table-cart" className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item =>
                                    <CartInfoItem key={item.cart_id} item={item} num={num++} />
                            )
                        }
                    <tr>
                        <td colSpan="5" className="text-right">Общая стоимость</td>
                        <td>{FormatPrice(all_amount, ' ') + ' руб.'}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
    );
}
