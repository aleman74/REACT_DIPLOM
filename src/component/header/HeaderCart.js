import {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {cartSelector} from "../../store/cartReducer";


// Логотип сайта
export default function HeaderCart(props) {

    const location = useLocation();
    const {items: cart_items} = useSelector(cartSelector);

//    console.log('HeaderCart location.pathname', location.pathname);         // location.pathname = '/'

    const [is_redirect, setRedirect] = useState(false);

    // Щелчок по иконке с корзиной
    const onClickCart = (evt) => {
        setRedirect(true);
    }


    // Сбрасываем флаг перехода на страницу корзины
    useEffect(
        () => {

            if (is_redirect && (location.pathname === '/cart'))
            {
                setRedirect(false);
            }
        }, [is_redirect, location.pathname]
    );

    // Переходим в корзину     <Navigate to='/cart' replace />
    if (is_redirect && (location.pathname !== '/cart'))
        return (
            <Navigate to='/cart' />
        );

    return (
            <div className="header-controls-pic header-controls-cart" onClick={onClickCart}>
                {
                    (cart_items.length > 0) &&
                        <>
                            <div className="header-controls-cart-full">{(cart_items.length > 0) && cart_items.length}</div>
                            <div className="header-controls-cart-menu" />
                        </>
                }
            </div>
    );
}
