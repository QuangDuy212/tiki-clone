export { }
declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }
    interface IRes<T> {
        "error"?: string | string[];
        "statusCode": number | string;
        "message": string;
        "data"?: T;
    }
    interface IModelPaginate<T> {
        "meta": {
            "current": string;
            "pageSize": string;
            "pages": number;
            "total": number;
        },
        "result": T[];
    }
    interface IUser {
        "access_token": string;
        "user": {
            "email": string;
            "phone": string;
            "fullName": string;
            "role": string;
            "avatar": string;
            "id": string;
        }
    }
    interface IBook {
        "_id": string;
        "thumbnail": string;
        "slider": string[];
        "mainText": string;
        "author": string;
        "price": number;
        "sold": number;
        "quantity": number;
        "category": string;
        "createdAt": string;
        "updatedAt": string;
        "__v": number;
    }
}