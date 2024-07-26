'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callGetListOrder, callGetListOrderWithQuery } from 'src/services/api';
import { useSession } from 'next-auth/react';

const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        sorter: true,
        width: '20%',
    },

    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        sorter: true,
        width: '20%',
    },

    {
        title: 'Tổng',
        dataIndex: 'totalPrice',
        sorter: true,
        width: '20%',
    },
];

const getRandomuserParams = (params: any) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const OrderPageAdmin = () => {
    // STATE: 
    const [data, setData] = useState<IOrder<IBookDetail>[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [sortQuery, setSortQuery] = useState<string>("");

    //LIBRARY: 
    const { data: session } = useSession();

    useEffect(() => {
        fetchOrder();
    }, [current, pageSize, sortQuery]);

    const fetchOrder = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${pageSize}`;

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callGetListOrderWithQuery(query, session?.access_token as string);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };


    //2. table change: 
    const handleTableChange = (pagination: { current: number, pageSize: number }, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current !== current)
            setCurrent(pagination.current);
        if (pagination && pagination.pageSize !== pageSize) {
            setCurrent(1);
            setPageSize(pagination.pageSize);
        }

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== pageSize) {
            setData([]);
        }

        if (sorter && sorter.field) {
            if (sorter.order == 'ascend') {
                setSortQuery(`&sort=${sorter.field}`)
            }

            if (sorter.order == 'descend') {
                setSortQuery(`&sort=-${sorter.field}`)
            }
        }
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record?._id}
            dataSource={data}
            current={current}
            pageSize={pageSize}
            loading={loading}
            total={total}
            onChange={handleTableChange}
        />
    );
};

export default OrderPageAdmin;