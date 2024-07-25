'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, ConfigProvider, Divider, Popover, Row, Table, notification } from 'antd'
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { CiExport, CiImport } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import moment from 'moment';
import { ImTelegram } from 'react-icons/im';
import * as XLSX from 'xlsx';
import { LuPenLine } from "react-icons/lu";
import { MdInfoOutline } from "react-icons/md";
import { callDeleteUser, callGetUserWithPaginate } from 'src/services/api';
import { useSession } from 'next-auth/react';
import SearchUser from '../Search/search.user';
import DetailUser from '../DetailUser/detail.user';
import CreateNewUser from '../CreateAUser/create.new.user';
import ImportUser from '../ImportUser/import.user';
import UpdateUser from '../UpdateUser/update.user';
import '../../../../styles/admin/user/user.page.admin.scss'



const UserPage = () => {
    // STATE: 
    const [data, setData] = useState<IUserForAdmin[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);


    const [querySearch, setQuerySearch] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>("");

    const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(false);
    const [dataUserDetail, setDataUserDetail] = useState<IUserForAdmin>();

    const [isOpenNewUser, setIsOpenNewUser] = useState<boolean>(false);
    const [isOpenImportUser, setIsOpenImportUser] = useState<boolean>(false);

    const [isOpenUpdateUser, setIsOpenUpdateUser] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState({});

    //LIBRARY: 
    const { data: session } = useSession();


    const titleDelete = (
        <>
            <span className='del-title'><MdInfoOutline className='del-icon' />
                <> </> Xác nhận xóa
            </span>
        </>
    )
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            width: "20%",
            key: 'id',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
            width: "10%",
            key: "fullName"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: "20%",
            key: "fullName"

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
            width: "20%",
            key: "phone"
        },
        {
            title: 'Updated At',
            dataIndex: "updatedAt",
            sorter: true,
            width: "20%",
            key: "updatedAt",
        },

        {
            title: 'Action',
            width: "10%",
            key: "action",
            render: (text: string, record: any, index: number) => {
                return (
                    <>
                        <div className='action'>
                            <ConfigProvider>
                                <Popover
                                    placement="rightTop"
                                    title={titleDelete}
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
            }
        }

    ];

    // FUNCTION: 

    // 1. fetchUser:
    useEffect(() => {
        fetchUser();
    }, [current, pageSize, querySearch, sortQuery]);

    const fetchUser = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${pageSize}`;

        if (querySearch) {
            query += querySearch;
        }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callGetUserWithPaginate(query, session?.access_token as string);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };


    //2. table change: 
    const handleTableChange = (pagination: { pageSize: number, current: number }, filters: any, sorter: any, extra: any) => {
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

    // 3. handle button
    const handleOnReset = () => {
        fetchUser();
        setIsSearch(false);
        setQuerySearch("");
        setSortQuery("");
    }

    const handleOnView = (data: IUserForAdmin) => {
        setIsOpenUserDetail(true);
        setDataUserDetail(data);
    }

    const handleNewUser = () => {
        setIsOpenNewUser(true);
    }

    const handleExportData = () => {
        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }

    const handleUpdate = (user: any) => {
        setIsOpenUpdateUser(true);
        setDataUpdate(user);
    }

    const handleDelete = async (id: string) => {
        const res = await callDeleteUser(id, session?.access_token as string);
        if (res && res?.data) {
            notification.success({
                message: "Thành công!",
                description: "Xóa người dùng thành công!",
                duration: 1
            });
            fetchUser();
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description: "Lỗi xóa người!",
                duration: 1
            })
        }
    }

    return (
        <>
            <Row gutter={[20, 20]} >
                <Col span={24}>
                    <SearchUser
                        fetchUser={fetchUser}
                        setIsSearch={setIsSearch}
                        setQuerySearch={setQuerySearch}
                        setCurrent={setCurrent}
                    />
                </Col>
                <Divider />
                <Col span={24}>
                    <div className='table-user-header'>
                        <span className='table-title'>
                            Table User CRUD
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
                                icon={<CiImport />}
                                onClick={() => setIsOpenImportUser(true)}>
                                <> </>Import
                            </Button>
                            <Button type='primary'
                                icon={<IoAddCircleOutline />}
                                onClick={() => handleNewUser()}>
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
                            showTotal: (total, range) =>
                                <div>{range[0]} - {range[1]} trên {total} dòng</div>
                        }

                        }
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
            <DetailUser
                isOpenUserDetail={isOpenUserDetail}
                setIsOpenUserDetail={setIsOpenUserDetail}
                data={dataUserDetail}
            />
            <CreateNewUser
                isOpenNewUser={isOpenNewUser}
                setIsOpenNewUser={setIsOpenNewUser}
                fetchData={fetchUser}
            />
            <ImportUser
                isOpenImportUser={isOpenImportUser}
                setIsOpenImportUser={setIsOpenImportUser}
                fetchUser={fetchUser}
            />
            <UpdateUser
                fetchUser={fetchUser}
                isOpenUpdateUser={isOpenUpdateUser}
                setIsOpenUpdateUser={setIsOpenUpdateUser}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default UserPage;