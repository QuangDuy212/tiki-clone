'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, ConfigProvider, Divider, Popover, Row, Table, notification } from 'antd';
import { GrPowerReset } from 'react-icons/gr';
import { CiExport, CiImport } from 'react-icons/ci';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { LuPenLine } from 'react-icons/lu';
import * as XLSX from 'xlsx';
import { callDeleteABook, callGetBookWithPaginate } from 'src/services/api';
import { useSession } from 'next-auth/react';
import SearchBook from '../SearchBook/search.book';
import DetailBook from '../DetailBook/detail.book';
import CreateNewBook from '../CreateNewBook/create.new.book';
import UpdateBook from '../UpdateBook/update.book';
import '../../../../styles/admin/book.page.admin.scss'



const BookPageAdmin = () => {
    //STATE: 
    const [data, setData] = useState<IBook[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [querySearch, setQuerySearch] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>("");

    const [isOpenBookDetail, setIsOpenBookDetail] = useState<boolean>(false);
    const [dataBookDetail, setDataBookDetail] = useState({});

    const [isOpenNewBook, setIsOpenNewBook] = useState<boolean>(false);

    const [isOpenUpdateBook, setIsOpenUpdateBook] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState({});

    //LIBRARY: 
    const { data: session } = useSession();

    //METHODS: 
    const fetchBook = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${pageSize}`;

        if (querySearch) {
            query += querySearch;
        }

        if (sortQuery) {
            query += sortQuery;
        }
        const res = await callGetBookWithPaginate(query, session?.access_token as string);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [current, pageSize, querySearch, sortQuery]);

    const handleTableChange = (pagination: { current: number, pageSize: number }, filters: any, sorter: any) => {
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

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            width: '20%',
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Action',
            render: (text: string, record: any, index: number) => {
                return (
                    <>
                        <div className='action'>
                            <ConfigProvider>
                                <Popover
                                    placement="rightTop"
                                    title={<div style={{ textAlign: "center" }}>Xác nhận xóa</div>}
                                    trigger={"click"}
                                    content={
                                        <div className='del-content'>
                                            <Button
                                                type='primary'
                                                className='confirm'
                                                onClick={() => handleDelete(record._id)}
                                            >Xác nhận</Button>
                                        </div>
                                    }
                                >
                                    <span className='del-btn'>
                                        <MdDelete />
                                    </span>
                                </Popover>
                            </ConfigProvider>
                            <span className='view-btn'
                                onClick={() => handleOnView(record)}>
                                <FaEye />
                            </span>
                            <span
                                className='update-btn'
                                onClick={() => handleUpdate(record)}
                            >
                                <LuPenLine />
                            </span>
                        </div>
                    </>
                )
            },
            width: '10%',
        },
    ];

    const getRandomuserParams = (params: any) => ({
        results: pageSize,
        page: current,
        ...params,
    });

    const handleOnView = (data: any) => {
        setIsOpenBookDetail(true);
        setDataBookDetail(data);
    }

    const handleUpdate = (data: any) => {
        setDataUpdate(data);
        setIsOpenUpdateBook(true);
        console.log(">>> check dataUpdate", data);
    }

    const handleOnReset = () => {
        fetchBook();
        setQuerySearch("");
        setSortQuery("");
    }

    const handleExportData = () => {
        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workbook, "ExportBook.csv");
        }
    }
    const handleDelete = async (id: string) => {
        const res = await callDeleteABook(id, session?.access_token as string);
        if (res && res.data) {
            notification.success({
                message: "Thành công!",
                description: "Xóa thành công!",
                duration: 1,
            })
            await fetchBook();
        } else {
            notification.error({
                message: "Lỗi!",
                description: "Có lỗi xảy ra!",
                duration: 1
            })
        }
    }

    const handleNewBook = () => {
        setIsOpenNewBook(true);
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchBook
                        fetchBook={fetchBook}
                        setQuerySearch={setQuerySearch}
                    />
                </Col>
                <Divider />
                <Col span={24}>
                    <div className='table-book-header'>
                        <span className='table-title'>
                            Table Book CRUD
                        </span>
                        <div className='table-btn'>
                            <Button
                                onClick={() => handleOnReset()}
                                type='primary'
                                icon={<GrPowerReset />}

                            ></Button>
                            <Button
                                type='primary'
                                icon={<CiExport />}
                                onClick={() => handleExportData()}>
                                <> </>Export
                            </Button>
                            <Button type='primary'
                                icon={<IoAddCircleOutline />}
                                onClick={() => handleNewBook()}>
                                <> </>Thêm mới
                            </Button>

                        </div>


                    </div>
                    <Table
                        columns={columns}
                        rowKey={(record) => record._id}
                        dataSource={data}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            // showTotal: (total, range) =>
                            //     <div>{range[0]} - {range[1]} trên {total} dòng</div>
                        }}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
            <DetailBook
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
            />
            <CreateNewBook
                isOpenNewBook={isOpenNewBook}
                setIsOpenNewBook={setIsOpenNewBook}
                fetchBook={fetchBook}
            />
            <UpdateBook
                isOpenUpdateBook={isOpenUpdateBook}
                setIsOpenUpdateBook={setIsOpenUpdateBook}
                fetchBook={fetchBook}
                dataUpdate={dataUpdate}
            />
        </>
    );
};

export default BookPageAdmin;