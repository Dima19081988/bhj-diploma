/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, method = 'GET', data, callback} = options;

    const xhr = new XMLHttpRequest();

    if (method === 'GET' && data) {
        const queryParams = new URLSearchParams(data).toString();
        xhr.open(method, `${url}?${queryParams}`);
    } else {
        xhr.open(method, url);
    }

    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, xhr.response);
        } else {
            callback(new Error(`Request failed. Status: ${xhr.status}`));
        }
    };

    if (method != 'GET' && data) {
        if (data) {
            const formData = new FormData()
            for (key in data) {
                formData.append(key, data[key]);
            }
        }
        xhr.send(formData)
    } else {
        xhr.send();
    }
};
