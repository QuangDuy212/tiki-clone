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
    interface IRegister {
        "_id": string;
        "email": string;
        "fullName": string;
    }
    interface IUserInfo {
        "email": string;
        "phone": string;
        "fullName": string;
        "role": string;
        "avatar": string;
        "id": string;
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
    interface IBulkCreate {
        fullName: string;
        password: string;
        email: string;
        phone: string;
    }
    interface IOrder<T> {
        "_id": string;
        "name": string;
        "address": string;
        "phone": string;
        "totalPrice": number;
        "detail": T[];
        "totalPrice": number;
        "createdAt": string;
        "updatedAt": string;
        "__v": number;
    }

    interface IBookDetail {
        "bookName": string;
        "quantity": number;
        "_id": string;
    }
    interface IBookViewDetail {
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
        "items": {
            "original": string;
            "thumbnail": string;
            "originalClass": string;
            "thumbnailClass": string;
        }[]
    }
    interface ICartRedux {
        quantity: number;
        _id: string;
        detail: IBook;
    }
    interface ICartInput {
        "name": string;
        "address": string;
        "phone": string;
        "totalPrice": number;
        "detail": IBookDetail[]
    }
    interface IDashBoard {
        "countOrder": number;
        "countUser": number;
    }
    interface IUserForAdmin {
        "_id": string;
        "fullName": string;
        "email": string;
        "phone": string;
        "role": string;
        "avatar": string;
        "isActive": boolean;
        "createdAt": string;
        "updatedAt": string;
        "__v": number;
    }
    interface ICreateUserBulk {
        "countSuccess": number;
        "countError": number;
        "detail": {
            "ok": number;
            "writeErrors": [
                {
                    "err": {
                        "index": number;
                        "code": number;
                        "errmsg": string;
                        "op": {
                            "fullName": string;
                            "password": string;
                            "email": string;
                            "phone": string;
                            "role": string;
                            "avatar": string;
                            "createdAt": string;
                            "updatedAt": string;
                            "_id": string;
                            "__v": number;
                        }
                    },
                    "index": number;
                },
            ],
            "writeConcernErrors": [],
            "insertedIds": [
                {
                    "index": number;
                    "_id": string;
                },
            ],
            "nInserted": number;
            "nUpserted": number;
            "nMatched": number;
            "nModified": number;
            "nRemoved": number;
            "upserted": [],
            "opTime": {
                "ts": {
                    "$timestamp": string;
                },
                "t": number;
            }
        }
    }
}