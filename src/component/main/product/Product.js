import React, {useState, useEffect, useRef} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productReducer_start, productReducer_start_param, productSelector} from "../../../store/productReducer";
import {hitReducer_start, hitReducer_start_param} from "../../../store/hitReducer";
import Preloader from "../../preloader/Preloader";
import ProductCart from "./ProductCart";

// Каталог
export default function Product(props) {

    const {item, loading, error} = useSelector(productSelector);
    const dispatch = useDispatch();

    // Определяем переданное ID
    const v = useParams();
//    console.log('Product id = ', v.id);

    // После загрузки страницы считываем данные
    useEffect(() => {

        const params = '/' + v.id;

        dispatch(
            productReducer_start(
                productReducer_start_param(process.env.REACT_APP_URL_ITEMS, params)
            ));
    }, []);


    // Если ошибка при загрузке данных, то не отображаем секцию
    if (error)
    {
        console.log('Ошибка при загрузке продукта: ' + error);
        return null;
    }

    // Если в процессе загрузки данные (показываем индикатор)
    if (loading)
        return (
            <Preloader />
        );

    // Если данных нет, то не отображаем секцию
    if (!item)
    {
        return null;
    }

    // Отображаем полученные данные
    return (
        <section className="catalog-item">
            <h2 className="text-center">{item.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={item.images[0]}
                         className="img-fluid" alt="" />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Артикул</td>
                            <td>{item.sku}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{item.manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Цвет</td>
                            <td>{item.color}</td>
                        </tr>
                        <tr>
                            <td>Материалы</td>
                            <td>{item.material}</td>
                        </tr>
                        <tr>
                            <td>Сезон</td>
                            <td>{item.season}</td>
                        </tr>
                        <tr>
                            <td>Повод</td>
                            <td>{item.reason}</td>
                        </tr>
                        </tbody>
                    </table>

                    <ProductCart item={item} />

                </div>
            </div>
        </section>
    );
}