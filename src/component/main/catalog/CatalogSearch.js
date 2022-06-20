import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {searchReducer_set, searchReducer_set_param, searchSelector} from "../../../store/searchReducer";


// Корзина
export default function CatalogSearch(props) {

    const dispatch = useDispatch();
    const {search_text: search} = useSelector(searchSelector);

    const [search_text, setData] = useState(props.search_text);


    // Выбор категории
    const onChangeText = (evt) => {

        setData(evt.target.value);

        // Сохраняем введённый текст
        dispatch(
            searchReducer_set(
                searchReducer_set_param(evt.target.value)
            ));
    }

    // Получаем изменения в строке поиска
    useEffect(() => {

        if (search !== search_text)
            setData(search);

    }, [search]);


    return (
        <form className="catalog-search-form form-inline">
            <input id="catalog_search" className="form-control" placeholder="Поиск" value={search_text} onChange={onChangeText} />
        </form>
    );

}

CatalogSearch.propTypes =
    {
        search_text: PropTypes.string.isRequired,
    }
