import React, {useEffect, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";


// Логотип сайта
export default function HeaderCart(props) {

    const location = useLocation();
    console.log('HeaderCart location.pathname', location.pathname);

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
                <div className="header-controls-cart-full">10</div>
                <div className="header-controls-cart-menu" />
            </div>
    );
}
