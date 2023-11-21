export const fetchRequestedData = async (url, method = "GET", headers = null, body = null) => {
    let response, result;
    if(headers != null && body != null) {
        response = await fetch(url, {
            method:method,
            headers:headers,
            body:JSON.stringify(body),
        })

        result = await response.json();
    } else if(headers != null && body == null) {
        response = await fetch(url, {
            method:method,
            headers:headers,
        })
        result = await response.json();
    } else if(headers == null && body == null) {
        response = await fetch(url);
        result = await response.json();
    }

    return result;
}
