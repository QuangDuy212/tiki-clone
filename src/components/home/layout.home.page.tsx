'use client';

import MainFilter from "./Filter/main.filter";
import {
    Button, Col, Form, Row, Checkbox,
    Divider, InputNumber, Rate, Card, Tabs,
    Pagination, Spin, Drawer,
    Image
} from 'antd';
import { Children, useEffect, useState } from 'react';
import '../../styles/home/main.home.scss';
import { useRouter } from "next/navigation";
import { fetchListBookAction } from "src/utils/actions/home.actions";
import { revalidateTag } from "next/cache";
import { sendRequest } from "src/utils/api";
import { useAppDispatch, useAppSelector } from "src/lib/hooks";
import { callGetBookWithPaginate } from "src/services/api";

interface IProps {
    categories: string[] | [];
    children: React.ReactNode;
}

const LayoutHomePage = (props: IProps) => {
    // The `state` arg is correctly typed as `RootState` already
    //REDUX: 
    const user = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()

    //PROPS: 
    const { categories, children } = props;

    //STATE:
    const PAGE_SIZE = 8;
    const [listBook, setListBook] = useState<IBook[] | null>([]);
    const [current, setCurrent] = useState<number>(1);
    const [listCategory, setListCategory] = useState<string[] | null>([]);
    const [pageSize, setPageSize] = useState<number>(8);
    const [total, setTotal] = useState<number>(0);
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

    const [querySearch, setQuerySearch] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>(``);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");

    //LIBRARY:
    const [form] = Form.useForm();
    const router = useRouter();

    //PROPS:
    // const [searchTerm, setSearchTerm] = useOutletContext();


    //METHODS:
    useEffect(() => {
        const fetchCategory = async () => {
            if (categories)
                setListCategory(categories);
        }

        fetchCategory();
    }, [])



    useEffect(() => {
        fetchBook();
    }, [current, pageSize, sortQuery, filter]);

    const fetchBook = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${PAGE_SIZE}`;

        if (querySearch) {
            query += querySearch;
        }

        // if (searchTerm) {
        //     query += `&mainText=/${searchTerm}/i`;
        // }

        if (sortQuery) {
            query += sortQuery;
        }

        if (filter) {
            query += filter
        }
        // const res = await sendRequest<IRes<IModelPaginate<IBook>>>({
        //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/book${query}`,
        //     method: "GET",
        //     nextOption: {
        //         next: { tags: ['get-list-book'] }
        //     }
        // })
        const res = await callGetBookWithPaginate(query);
        if (res && res?.data) {
            setListBook(res?.data?.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleOnChangePage = (pagination: any) => {
        if (pagination && pagination.current !== current)
            setCurrent(pagination.current);
        if (pagination && pagination.pageSize !== pageSize) {
            setCurrent(1);
            setPageSize(pagination.pageSize);
        }

        //`dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== pageSize) {
            setListBook([]);
        }
    };

    const onFinish = (values: any) => {
        let query = "";
        if (values?.range?.from > 0 && values?.range?.to > 0) {
            const l = values?.range?.from;
            const r = values?.range?.to;
            query += `&price>=${l}&&price<=${r}`;
        }
        if (values?.category) {
            if (values.category) {
                const cate = values.category;
                if (cate && cate.length > 0) {
                    const f = cate.join(",");
                    query += `&category=${f}`
                }
            }
        }
        setFilter(query);
    }

    const onChange = (checkedValues: string) => {
        if (checkedValues) setSortQuery(`${checkedValues}`)
    };

    const items = [
        {
            key: '&sort=-sold',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '&sort=-updatedAt',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: '&sort=price',
            label: 'Giá thấp đến cao',
            children: <></>,
        },
        {
            key: '&sort=-price',
            label: 'Giá cao đến thấp',
            children: <></>,
        },
    ];

    const nonAccentVietnamese = (str: string) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str: string) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const handleRedirectBook = (book: any) => {
        const slug = convertSlug(book.mainText);
        router.push(`/book/${slug}?id=${book._id}`)
    }
    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <MainFilter
                        categories={categories}
                        setFilter={setFilter}
                    />
                </div>
                <div>
                    <div>
                        <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}