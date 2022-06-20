import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {FormatPrice, ITEM_COUNT, TIME_DELAY} from "../../../data/global";
import CatalogNext from "./CatalogNext";
import {catalogReducer_start, catalogReducer_start_param, catalogSelector} from "../../../store/catalogReducer";
import Preloader from "../../preloader/Preloader";


// Каталог
export default function CatalogData(props) {

    const data = useSelector(catalogSelector);
    const dispatch = useDispatch();


//    const [data, setData] = useState(new LoadInfo());
    const [offset_data, setOffset] = useState({
        offset: 0,
        сategory_id: 0,
        search_text: '',
        timeout: 0,
        is_add: false,
    });

    // Следующие записи
    const onNext = () => {

        setOffset(prev => ({
            ...prev,
            offset: prev.offset + ITEM_COUNT,
            timeout: 0,
            is_add: true,
        }));
    }

    // После загрузки страницы считываем данные
    useEffect(() => {

        // Если был изменён фильтр по категориям или строка поиска, то сбрасываем смещение
        if ((offset_data.сategory_id !== props.сategory_id) || (offset_data.search_text !== props.search_text)) {

            // Определяем timeout (при изменении текста ставим timeout - 100)
            let time = 0;
            if (offset_data.search_text !== props.search_text) {
                time = TIME_DELAY;
            }

            setOffset(prev => ({
                ...prev,
                offset: 0,
                сategory_id: props.сategory_id,
                search_text: props.search_text,
                timeout: time,
                is_add: false,
            }));
        }
        else {
            // Запускаем загрузку данных (с задержкой или без неё)
            if (offset_data.timeout > 0)
                setTimeout(loadStart, offset_data.timeout, true);
            else
                loadStart(false);
        }
    }, [offset_data, props]);

    // Загрузка данных
    const loadStart = (is_check_search_text) => {

        let is_ok = true;

        if (is_check_search_text)
        {
            // Проверяем текущее значение фильтра
            let cur_search_text = '';
            let html_input = document.getElementById('catalog_search');
            if (html_input)
                cur_search_text = html_input.value;

            is_ok = (props.search_text === cur_search_text);
        }


        // Если параметры поиска не изменились, то выполняем загрузку
        if (is_ok)
        {
            dispatch(
                catalogReducer_start(
                    catalogReducer_start_param(process.env.REACT_APP_URL_ITEMS, getParam(), offset_data.is_add)
                ));
        }
    }

    // Определяем параметры для считывания данных с сервера
    const getParam = () => {
        // http://localhost:7070/api/items ? categoryId=X & offset=6 & q=

        let result = '';

        // Добавляем параметер - выбранная категория
        if (props.сategory_id > 0) {
            if (result !== '')
                result += '&';
            result += 'categoryId=' + props.сategory_id;
        }

        // Добавляем параметер - смещение
        if (offset_data.offset > 0) {
            if (result !== '')
                result += '&';
            result += 'offset=' + offset_data.offset;
        }

        // Добавляем параметер - текст поиска
        if (props.search_text !== '') {
            if (result !== '')
                result += '&';
            result += 'q=' + props.search_text;
        }


        if (result !== '')
            result = '?' + result;

//        console.log('CatalogData getParam = ' + result);
        return result;
    }


    // Если ошибка при загрузке данных, то не отображаем секцию
    if (data.error)
    {
        console.log('CatalogData Ошибка при загрузке каталога: ' + data.error);
        return null;
    }

    // Если в процессе загрузки данные (показываем индикатор)
    if (data.loading)
        return (
            <Preloader />
        );


    // Если данных нет, то не отображаем секцию
    if (data.items.length === 0)
        return null;


    // Отображаем полученные данные
    return (
        <>
            <div className="row">
                {
                    data.all_items.map(item =>

                        <div key={item.id} className="col-4">
                            <div className="card catalog-item-card">
                                <img src={item.images[0]}
                                     className="card-img-top img-fluid" alt={item.title} />
                                <div className="card-body">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{FormatPrice(item.price, ' ') + ' руб.'}</p>
                                    <Link to={'/catalog/' + item.id} className="btn btn-outline-primary">Заказать</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                (data.items.length >= ITEM_COUNT) && (<CatalogNext onNext={onNext} />)
            }
        </>
    );
}

CatalogData.propTypes =
    {
        search_text: PropTypes.string.isRequired,
        сategory_id: PropTypes.number.isRequired,
    }