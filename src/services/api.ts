import { RcFile } from 'antd/es/upload';
import axios from '../utils/axios-custom'

export const callRegister = (fullName: string, email: string, password: string, phone: string) => {
    return axios.post<any, IRes<IRegister>>('/api/v1/user/register', { fullName, email, password, phone });
}

export const callLogin = (username: string | undefined, password: string | undefined) => {
    return axios.post<any, IRes<IUser>>('/api/v1/auth/login', { username, password });
}

export const callFetchAccount = (access_token: string) => {
    // return axios.get("/api/v1/auth/account");
    return axios<any, IRes<IUser>>({
        method: 'get',
        url: '/api/v1/auth/account',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
}

export const callLogout = (access_token: string) => {
    // return axios.post<any, IRes<string>>("/api/v1/auth/logout");
    return axios<any, IRes<IUser>>({
        method: 'post',
        url: '/api/v1/auth/logout',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
}
export const callFreshToken = () => {
    return axios.get<any, IRes<IUser>>("/api/v1/auth/refresh");
}


export const callGetUserWithPaginate = (query: string, access_token: string) => {
    // return axios.get(`/api/v1/user${query}`);
    return axios<any, IRes<IModelPaginate<IUserForAdmin>>>({
        method: 'get',
        url: `/api/v1/user${query}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callBulkCreateUser = (data: IBulkCreate[] | [], access_token: string) => {
    // return axios.post(`/api/v1/user/bulk-create`, data);
    return axios<any, IRes<ICreateUserBulk>>({
        method: 'post',
        url: `/api/v1/user/bulk-create`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        data: data
    })
}

export const callUpdateUser = (_id: string | undefined,
    fullName: string | undefined, phone: string | undefined, access_token: string) => {
    // return axios.put<IRes<IUser>, IRes<IUser>>(`/api/v1/user`, { _id, fullName, phone });
    return axios<IRes<IUser>, IRes<IUser>>({
        method: 'put',
        url: "/api/v1/user",
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        data: {
            _id, fullName, phone
        },
    });
}

export const callDeleteUser = (id: string, access_token: string) => {
    // return axios.delete(`/api/v1/user/${id}`);
    return axios<any, IRes<IUser>>({
        method: 'delete',
        url: `/api/v1/user/${id}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callGetBookWithPaginate = (query: string, access_token: string) => {
    // return axios.get<IRes<IModelPaginate<IBook>>, IRes<IModelPaginate<IBook>>>(`/api/v1/book${query}`);
    return axios<any, IRes<IModelPaginate<IBook>>>({
        method: 'get',
        url: `/api/v1/book${query}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callFetchCategory = () => {
    return axios.get<any, IRes<string[]>>(`/api/v1/database/category`);
}

export const callUploadBookImg = (fileImg: RcFile | string | Blob, access_token: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book",
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callCreateABook = (data: { mainText: string, author: string, price: number, sold: number, quantity: number, category: string },
    access_token: string) => {
    // return axios.post('/api/v1/book', data);
    return axios<any, IRes<IBook>>({
        method: 'post',
        url: '/api/v1/book',
        data: data,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callUpdateABook = (_id: string, mainText: string,
    thumbnail: string[], slider: string[], author: string,
    price: number, quantity: number, category: string, access_token: string) => {
    // return axios.put(`/api/v1/book/${_id}`, { mainText, thumbnail, slider, author, price, quantity, category });
    return axios<any, IRes<IUser>>({
        method: 'put',
        url: `/api/v1/book/${_id}`,
        data: { mainText, thumbnail, slider, author, price, quantity, category },
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callDeleteABook = (id: string, access_token: string) => {
    // return axios.delete(`/api/v1/book/${id}`);
    return axios<any, IRes<IDeleteBook>>({
        method: 'delete',
        url: `/api/v1/book/${id}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callGetBookById = (id: string) => {
    return axios.get<any, IRes<IBook>>(`/api/v1/book/${id}`);
}

export const callCreateAnOrder = (data: ICartInput, access_token: string) => {
    // return axios.post(`/api/v1/order`, {
    //     ...data
    // })
    return axios<any, IRes<IOrder<IBookDetail>[]>>({
        method: 'post',
        url: "/api/v1/order",
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        data: {
            ...data
        }
    });
}

export const callGetListOrderWithPaginate = (current: number, pageSize: number) => {
    return axios.get(`/api/v1/order?current=${current}&pageSize=${pageSize}`)
}

export const callGetOrderHistory = (access_token: string) => {
    return axios<any, IRes<IOrder<IBookDetail>[]>>({
        method: 'get',
        url: "/api/v1/history",
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
}

export const callUpdateAvatar = (fileImg: RcFile | string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: "/api/v1/file/upload",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    });
}

export const callUpdateInfo = (_id: string, fullName: string, phone: string, avatar: string) => {
    return axios.put(`/api/v1/user`, {
        _id, fullName, phone, avatar
    })
}

export const callChangePassword = (email: string, oldpass: string, newpass: string, access_token: string) => {
    // return axios.post<IRes<IUser>, IRes<IUser>>(`/api/v1/user/change-password`, {
    //     email, oldpass, newpass
    // })
    return axios<any, IRes<IUser>>({
        method: 'post',
        url: '/api/v1/user/change-password',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        data: {
            email, oldpass, newpass
        }
    });
}

export const callGetDashBoard = (access_token: string) => {
    // return axios.get(`/api/v1/database/dashboard`);
    return axios<any, IRes<IDashBoard>>({
        method: 'get',
        url: '/api/v1/database/dashboard',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}

export const callGetListOrder = (current: number, pageSize: number, access_token: string) => {
    // return axios.get(`/api/v1/order?current=${current}&pageSize=${pageSize}`);
    return axios<any, IRes<IModelPaginate<IOrder<IBookDetail>>>>({
        method: 'get',
        url: '/api/v1/order',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        params: {
            current: current,
            pageSize: pageSize
        }
    });
}
export const callGetListOrderWithQuery = (query: string, access_token: string) => {
    // return axios.get(`/api/v1/order?current=${current}&pageSize=${pageSize}`);
    return axios<any, IRes<IModelPaginate<IOrder<IBookDetail>>>>({
        method: 'get',
        url: `/api/v1/order${query}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
}