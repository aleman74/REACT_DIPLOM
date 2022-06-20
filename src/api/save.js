// Сохраняем данные методом POST
export const saveData = async(url, data) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.ok;
}