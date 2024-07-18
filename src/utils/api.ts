// import queryString from 'query-string';
// import { Mutex } from 'async-mutex';

// const mutex = new Mutex();

// let access = "";
// const handleRefreshToken = async () => {

//     // return await (async () => {
//     //     const res = await sendRequest<IRes<IUser>>({
//     //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
//     //         method: "GET",
//     //     })
//     //     if (res && res.data) return res.data.access_token;
//     //     else return null;
//     // })

//     // const res = await sendRequest<IRes<IUser>>({
//     //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
//     //     method: "GET",
//     // })
//     // console.log(">>> check res: ", res)
//     // if (res && res.data) return res.data.access_token;
//     // else return null;

//     return await mutex.runExclusive(async () => {
//         const res = await sendRequest<IRes<IUser>>({
//             url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
//             method: "GET",
//         })
//         console.log(">>> Check res: ", res);
//         if (res && res.data) return res.data.access_token;
//         else return null;
//     })

// }

// export const sendRequest = async <T>(props: IRequest) => {
//     let {
//         url,
//         method,
//         useCredentials = false,
//         body,
//         headers = {},
//         queryParams = {},
//         nextOption = {}
//     } = props;

//     if (typeof window !== 'undefined') {
//         access = `Bearer ${typeof window !== 'undefined' && window && window.localStorage &&
//             window.localStorage.getItem('access_token') ? window?.localStorage?.getItem("access_token") : ""}`
//     }

//     const options = {
//         method: method,
//         headers: new Headers({
//             'content-type': 'application/json',
//             'Authorization': access,
//             ...headers
//         }),// by default setting the content-type to be json type
//         body: body ? JSON.stringify(body) : null,
//         ...nextOption,
//     };
//     if (useCredentials) options.credentials = "include";
//     // if (queryParams) {
//     //     url = `${url}?${queryString.stringify(queryParams)}`;
//     // } else url = url;



//     return fetch(url, options)
//         .then(res => {
//             if (res.ok) {
//                 return res.json() as T;
//             }
//             else if (res.status == 401) {
                
//             }
//             else {
//                 return res.json()
//                     .then(function (json) {
//                         // to be able to access error status when you catch the error 
//                         return {
//                             statusCode: res.status,
//                             message: json?.message ?? "",
//                             error: json?.error ?? ""
//                         } as T;
//                     });
//             }
//         });
// };

// export const sendRequestFile = async <T>(props: IRequest) => {
//     let {
//         url,
//         method,
//         body,
//         queryParams = {},
//         useCredentials = false,
//         headers = {},
//         nextOption = {}
//     } = props;

//     const options: any = {
//         method: method,
//         // by default setting the content-type to be json type
//         headers: new Headers({ ...headers }),
//         body: body ? body : null,
//         ...nextOption
//     };
//     if (useCredentials) options.credentials = "include";

//     if (queryParams) {
//         url = `${url}?${queryString.stringify(queryParams)}`;
//     }

//     return fetch(url, options).then(res => {
//         if (res.ok) {
//             return res.json() as T;
//         } else {
//             return res.json().then(function (json) {
//                 // to be able to access error status when you catch the error 
//                 return {
//                     statusCode: res.status,
//                     message: json?.message ?? "",
//                     error: json?.error ?? ""
//                 } as T;
//             });
//         }
//     });
// };