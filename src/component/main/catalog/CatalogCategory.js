import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {categoryReducer_start, categoryReducer_start_param, categorySelector} from "../../../store/categoryReducer";


// Корзина
export default function CatalogCategory(props) {

    const {categories, loading, error} = useSelector(categorySelector);
    const dispatch = useDispatch();

    const [category_id, setCategoryID] = useState(props.сategory_id);

    const style_active = {
        color: 'red'
    };

    // Выбор категории
    const onClickCategory = (evt, id) => {

        evt.preventDefault();

        setCategoryID(id);
        props.onSelect(id);
    }

    // После загрузки страницы считываем данные
    useEffect(() => {

        // Запускаем загрузку данных (только при первом обращении)
        if (categories.length === 0) {
            dispatch(
                categoryReducer_start(
                    categoryReducer_start_param(process.env.REACT_APP_URL_CATEGORIES)
                ));
        }

    }, []);

    if (categories.length === 0)
        return null;


    return (
        <ul className="catalog-categories nav justify-content-center">
            <li key="0" className="nav-item">
                <Link
                    className={(category_id === 0) ? 'nav-link active' : 'nav-link'}
                    style={(category_id === 0) ? style_active : null}
                    strict
                    to="/"
                    onClick={(evt) => onClickCategory(evt, 0)}
                >
                    Все
                </Link>
            </li>
            {
                categories.map(item =>
                    <li key={item.id} className="nav-item">
                        <Link
                            className={(category_id === item.id) ? 'nav-link active' : 'nav-link'}
                            style={(category_id === item.id) ? style_active : null}
                            strict
                            to="/"
                            onClick={(evt) => onClickCategory(evt, item.id)}
                        >
                            {item.title}
                        </Link>
                    </li>
                )
            }
        </ul>
    );

}

CatalogCategory.propTypes =
    {
        onSelect: PropTypes.func.isRequired,
        сategory_id: PropTypes.number.isRequired,
    }
