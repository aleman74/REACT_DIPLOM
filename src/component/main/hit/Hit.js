import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import HitItem from "./HitItem";
import {hitReducer_start, hitReducer_start_param, hitSelector} from "../../../store/hitReducer";
import Preloader from "../../preloader/Preloader";


// Корзина
export default function Hit() {

    const {hits, loading, error, time_update} = useSelector(hitSelector);
    const dispatch = useDispatch();

    // После загрузки страницы считываем данные
    useEffect(() => {

        // Хиты продаж обновляем не чаще чем раз в 5 минут
        const date = new Date();
        const delta_min = (date.getTime() - time_update) / 1000 / 60;

        if (delta_min > 5)
        {
            dispatch(
                hitReducer_start(
                    hitReducer_start_param(process.env.REACT_APP_URL_TOP_SALES)
                ));
        }
    }, []);


    // Если ошибка при загрузке данных, то не отображаем секцию
    if (error)
    {
        console.log('Ошибка при загрузке хитов: ' + error);
        return null;
    }

    // Если в процессе загрузки данные (показываем индикатор)
    if (loading)
        return (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <Preloader />
            </section>
        );

    // Если данных нет, то не отображаем секцию
    if (hits.length === 0)
    {
        return null;
    }


    // Отображаем полученные хиты
    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">

                {
                    hits.map(item =>
                        <HitItem key={item.id} item={item} />
                    )
                }

            </div>
        </section>
    );
}
