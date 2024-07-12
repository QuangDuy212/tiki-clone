'use server';

import { sendRequest } from "../api";

export const fetchListBookAction = async (query: string) => {
    const res = await sendRequest<IRes<IModelPaginate<IBook>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/book${query}`,
        method: "GET",
        nextOption: {
            next: { tags: ['get-list-book'] }
        }
    })
    return res;
}