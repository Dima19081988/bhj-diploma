/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, method = 'GET', data, callback} = options;
    const xhr = new XMLHttpRequest();
    
    let requestURL = url;
    let requestData = null; 

    if (method === 'GET' && data) {
        requestURL += `?${new URLSearchParams(data)}`
    } else if (data) {
        requestData = new FormData();
        Object.entries(data).forEach(([key, val]) => requestData.append(key, val));
    }

    xhr.open(method, requestURL);
    xhr.responseType = 'json';

    xhr.onerror = () => {
        callback(new Error(`Request failed. Status: ${xhr.status}`));
    }

    xhr.send(method === 'GET' ? null : requestData);    
};
