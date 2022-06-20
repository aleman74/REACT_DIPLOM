import {useState} from 'react';
import PropTypes from "prop-types";
import {nanoid} from "nanoid";
import {CartItem_new} from "../../../data/global";
import {useDispatch} from "react-redux";
import {cartReducer_add, cartReducer_add_param} from "../../../store/cartReducer";


// Добавить в корзину продукт
export default function ProductCart(props) {

    const dispatch = useDispatch();

    const sizes = [];

    // Оставляем только доступные размеры
    for (let i = 0; i < props.item.sizes.length; i++)
    {
        if (props.item.sizes[i].avalible)
        {
            let v = {id: nanoid(), size: props.item.sizes[i].size};
            sizes.push(v);
        }
    }
//    const sizes = props.item.sizes.filter(item => item.avalible === true);

    let first_size = '';
    if (sizes.length > 0)
        first_size = sizes[0].size;

    const [product_size, setSize] = useState(first_size);
    const [product_count, setCount] = useState(1);


    const onSizeClick = (size) => {
        if (product_size !== size)
            setSize(size);
    }

    const onCountClick = (value) => {

        if (product_count + value < 1)
            value = 1;
        else
            value += product_count;

        if (product_count !== value)
            setCount(value);
    }

    const onCartClick = (evt) => {
        evt.preventDefault();

        const cart_item = CartItem_new(props.item, product_size, product_count);

        // Добавляем товар в корзину
        dispatch(
            cartReducer_add(
                cartReducer_add_param(cart_item)
            ));
    }


    // Отображаем полученные данные
    return (
        <>
            <div className="text-center">
                <p>Размеры в наличии:
                    {
                        sizes.map(item =>
                            <span
                                key={item.id}
                                className={'catalog-item-size' + ((item.size === product_size) ? ' selected' : '')}
                                onClick={() => onSizeClick(item.size)}
                            >{item.size}</span>
                        )
                    }
                </p>

                <p>Количество:
                    <span className="btn-group btn-group-sm pl-2">
                        <button className="btn btn-secondary" onClick={() => onCountClick(-1)}>-</button>
                        <span className="btn btn-outline-primary">{product_count}</span>
                        <button className="btn btn-secondary" onClick={() => onCountClick(1)}>+</button>
                    </span>
                </p>
            </div>
            <button className="btn btn-danger btn-block btn-lg" onClick={onCartClick}>В корзину</button>
        </>
    );
}

ProductCart.propTypes =
    {
        item: PropTypes.object.isRequired,
    }