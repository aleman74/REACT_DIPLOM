// Загружаем данные методом GET
import {JoinArray} from "../data/global";

export const loadData = async(url, params) => {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(url + params, requestOptions);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
}

export const loadData_standart = async(url, params, setStatus, is_result_compare=false) => {

    setStatus(prev => ({...prev, is_loading: true, error_text: ''}));

    try
    {
        const result = await loadData(url, params);

        setStatus(prev => ({
            ...prev,
            is_loading: false,
            data: result,
            all_data: (is_result_compare) ? JoinArray(prev.all_data, result) : result
        }));
    }
    catch(ex)
    {
//            console.log('loadData_standart ERROR : ' + ex.message);
        setStatus(prev => ({...prev, is_loading: false, error_text: ex.message}));
    }
}
