import queryString from 'query-string';

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        useCredentials = false,
        body,
        headers = {},
        queryParams = {},
        nextOption = {}
    } = props;
    const options = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json', ...headers }),// by default setting the content-type to be json type
        body: body ? JSON.stringify(body) : null,
        ...nextOption,
    };
    if (useCredentials) options.credentials = "include";
    // if (queryParams) {
    //     url = `${url}?${queryString.stringify(queryParams)}`;
    // } else url = url;

    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};