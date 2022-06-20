import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import HeaderCart from "./HeaderCart";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {searchReducer_set, searchReducer_set_param} from "../../store/searchReducer";

// Логотип сайта
export default function HeaderSearch(props) {

//    console.log('window.location.pathname', window.location.pathname);

    const dispatch = useDispatch();

    const location = useLocation();

    const [is_search_show, setSearchShow] = useState(props.is_search_show);
    const [search_text, setSearchText] = useState('');
    const [is_redirect, setRedirect] = useState(false);

    const onSearchClick = (evt) => {
        setSearchShow(prev => {
            // Если поле было скрыто, то отображаем его
            if (prev === false)
                return true;

            // Если поле было открыто и поле с текстом пустое, то скрываем его
            if ((prev === true) && (search_text === ''))
                return false;

            // Если поле было открыто и поле с текстом заполнено, то выполняем переадресацию,
            // т.е. поле не закрываем
            return prev;
        });

        if (search_text !== '')
        {
            // Сохраняем введённый текст
            dispatch(
                searchReducer_set(
                    searchReducer_set_param(search_text)
                ));

            setRedirect(true);
        }
        else
            setRedirect(false);
    }

    const onTextChange = (evt) => {
        setSearchText(evt.target.value);
    }

    const onKeyDown = (evt)=> {

        if (evt.keyCode === 13) {
            evt.preventDefault();
            console.log('press enter')

            if (search_text !== '')
            {
                // Сохраняем введённый текст
                dispatch(
                    searchReducer_set(
                        searchReducer_set_param(search_text)
                    ));

                setRedirect(true);
            }
        }
    }

    // Устанавливаем фокус на поле поиска
    useEffect(
        () => {

            if (is_search_show)
            {
                const searchFormEl = document.querySelector('[data-id=search-form]');
                searchFormEl.querySelector('input').focus();
            }
        }, [is_search_show]
    );

    // Сбрасываем флаг перехода на страницу каталога
    useEffect(
        () => {

            if (is_redirect && (location.pathname === '/catalog'))
            {
                setRedirect(false);
            }
        }, [is_redirect, location.pathname]
    );

    // Если текст для поиска введён и нажата повторно кнопка поиска, то переходим на страницу каталога     <Navigate to='/catalog' replace />
    if (is_redirect && (location.pathname !== '/catalog'))
        return (
            <Navigate to='/catalog' />
        );

    return (
        <>
            <form id="search-form" data-id="search-form"
                  className={'header-controls-search-form form-inline' + (is_search_show ? '' : ' invisible') }>
                <input className="form-control" placeholder="Поиск" value={search_text} onChange={onTextChange} onKeyDown={onKeyDown} />
            </form>
            <div id="header-button">
                <div className="header-controls-pics">
                    <div data-id="search-expander"
                         className="header-controls-pic header-controls-search"
                         onClick={onSearchClick}
                    />

                    <HeaderCart />
                </div>
            </div>
        </>
    );
}

HeaderSearch.propTypes =
    {
        is_search_show: PropTypes.bool.isRequired
    }
