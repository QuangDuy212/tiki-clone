import { RcFile } from 'antd/es/upload';
import axios from '../utils/axios-custom'

export const callRegister = (fullName: string, email: string, password: string, phone: string) => {
    return axios.post<any, IRes<IUser>>('/api/v1/user/register', { fullName, email, password, phone });
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

export const callGetUserWithPaginate = (query: string) => {
    return axios.get(`/api/v1/user${query}`);
}

export const callBulkCreateUser = (data: IBulkCreate[] | []) => {
    return axios.post(`/api/v1/user/bulk-create`, data);
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

export const callDeleteUser = (id: string) => {
    return axios.delete(`/api/v1/user/${id}`);
}

export const callGetBookWithPaginate = (query: string) => {
    return axios.get<IRes<IModelPaginate<IBook>>, IRes<IModelPaginate<IBook>>>(`/api/v1/book${query}`);
}

export const callFetchCategory = () => {
    return axios.get(`/api/v1/database/category`);
}

export const callUploadBookImg = (fileImg: RcFile | string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

export const callCreateABook = (data: IBook) => {
    return axios.post('/api/v1/book', data);
}

export const callUpdateABook = (_id: string, mainText: string,
    thumbnail: string, slider: string, author: string,
    price: number, quantity: number, category: string) => {
    return axios.put(`/api/v1/book/${_id}`, { mainText, thumbnail, slider, author, price, quantity, category });
}

export const callDeleteABook = (id: string) => {
    return axios.delete(`/api/v1/book/${id}`);
}

export const callGetBookById = (id: string) => {
    return axios.get(`/api/v1/book/${id}`);
}

export const callCreateAnOrder = (data: IOrder) => {
    return axios.post(`/api/v1/order`, {
        ...data
    })
}

export const callGetListOrderWithPaginate = (current: number, pageSize: number) => {
    return axios.get(`/api/v1/order?current=${current}&pageSize=${pageSize}`)
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

export const callChangePassword = (email: string, oldpass: string, newpass: string) => {
    return axios.post<IRes<IUser>, IRes<IUser>>(`/api/v1/user/change-password`, {
        email, oldpass, newpass
    })
}

export const callGetDashBoard = () => {
    return axios.get(`/api/v1/database/dashboard`);
}

export const callGetListOrder = (current: number, pageSize: number) => {
    return axios.get(`/api/v1/order?current=${current}&pageSize=${pageSize}`)
}