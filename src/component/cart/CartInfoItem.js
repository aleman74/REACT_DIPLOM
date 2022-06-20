import {useDispatch} from "react-redux";
import {FormatPrice} from "../../data/global";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {
    cartReducer_delete,
    cartReducer_delete_param
} from "../../store/cartReducer";


// Содержимое корзины
export default function CartInfoItem(props) {

    const dispatch = useDispatch();

    // Удаляем позицию из корзины
    const onDelete = (evt, cart_id) => {

        evt.preventDefault();

        dispatch(
            cartReducer_delete(
                cartReducer_delete_param(cart_id)
            ));
    }

    return (
            <tr>
                <td scope="row">{props.num}</td>
                <td>
                    <Link to={'/catalog/' + props.item.id}>{props.item.title}</Link>
                </td>
                <td>{props.item.size}</td>
                <td>{props.item.count}</td>
                <td>{FormatPrice(props.item.price, ' ') + ' руб.'}</td>
                <td>{FormatPrice(props.item.amount, ' ') + ' руб.'}</td>
                <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={(evt) => onDelete(evt, props.item.cart_id)}>Удалить</button>
                </td>
            </tr>
    );
}

CartInfoItem.propTypes =
    {
        num: PropTypes.number.isRequired,
        item: PropTypes.object.isRequired,
    }