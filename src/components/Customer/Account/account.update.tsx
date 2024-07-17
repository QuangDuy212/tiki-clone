'use client'

import { UploadOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Divider, Form, Input, message, notification, Row, Upload } from "antd"
import { FormProps, useForm } from "antd/es/form/Form"
import { RcFile } from "antd/es/upload"
import { useEffect, useState } from "react"
import { doUpdateUser } from "src/lib/features/account/accountSlice"
import { useAppDispatch, useAppSelector } from "src/lib/hooks"
import { sendRequest, sendRequestFile } from "src/utils/api";
import '../../../styles/account/account.update.scss'
import { FaUserCircle } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import ChangePassword from "./change.password"
import { callUpdateAvatar, callUpdateUser } from "src/services/api"
const AccountUpdate = () => {

    //STATE:
    const [avatar, setAvatar] = useState({});
    const [activeTab, setActiveTab] = useState<string>("");

    //REDUX: 
    const account = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();

    //LIBRARY: 
    const [form] = Form.useForm();

    //TYPES: 
    type FieldType = {
        fullName?: string;
        phone?: string;
        avatar?: string;
        _id?: string;
        email?: string;
    };


    //METHODS: 

    useEffect(() => {
        if (account?.user?.avatar) {
            setAvatar(account?.user?.avatar)
        }

        let url = window.location.pathname;
        if (url === '/customer/account') {
            setActiveTab("account");
        }
        else if (url === '/sales/order/history') {
            setActiveTab("order");
        }
        else if (url === '/customer/help-center') {
            setActiveTab("help-center");
        }

    }, [account]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { _id, fullName, phone } = values;
        const data = { _id, fullName, phone, avatar: avatar }
        const res = await callUpdateUser(_id, fullName, phone)
        if (res && res?.data && res?.statusCode === 200) {
            dispatch(doUpdateUser(data))
            message.success("Cập nhật thông tin thành công!");
            localStorage.removeItem("access_token");
        }
        else {
            notification.error({
                description: res?.message,
                message: "Có lỗi xảy ra!",
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }: { file: string | Blob | RcFile, onSuccess: any, onError: any }) => {
        if (file) {
            const bodyFormData = new FormData();
            bodyFormData.append('fileImg', file);
            // const res = await sendRequestFile<IRes<any>>({
            //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/file/upload`,
            //     method: "POST",
            //     body: bodyFormData,
            //     headers: {
            //         // "Authorization": `Bearer ${account?.access_token}`,
            //         "upload-type": "avatar",
            //     },
            // })

            const res = await callUpdateAvatar(file)
            // console.log(">>> check res: ", res)

            if (res?.data) {
                setAvatar(res?.data?.fileUploaded)
                onSuccess('ok');
            }
            else {
                onError("Đã có lỗi khi upload file!")
            }
        }



    }
    const prop = {
        name: 'file',
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        // headers: {
        //     authorization: 'authorization-text',
        // },
        showUploadList: false,
        mutiple: false,
        maxCount: 1,
        customRequest: handleUploadFileThumbnail,
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công!`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại!`);
            }
        },
    };

    return (
        <>
            <div className="account-update">
                <div className="container" style={{ padding: "40px 0" }}>
                    <Row gutter={[20, 20]}>
                        <Col xl={4} lg={4} md={8} sm={0} xs={0}>
                            <div className="nav-container">
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <Avatar
                                            // size={{ xs: 50, sm: 50, md: 50, lg: 50, xl: 50, xxl: 50 }}
                                            size={50}
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/avatar/${avatar}`}
                                            style={{ marginRight: "12px" }}
                                        />
                                        <span style={{ fontSize: "14px", display: "flex", flexDirection: "column" }}>
                                            Tài khoản của
                                            <span style={{ fontSize: '18px' }}>{account?.user?.fullName}</span>
                                        </span>

                                    </div>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <div className={`nav-item ${activeTab === 'account' ? "active" : ""}`}
                                >
                                    <FaUserCircle style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Thông tin cá nhân
                                </div>
                                <div className={`nav-item ${activeTab === 'order' ? "active" : ""}`}
                                >
                                    <IoNewspaperSharp style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Quản lí đơn hàng
                                </div>
                                <div className={`nav-item ${activeTab === 'help-center' ? "active" : ""}`}
                                >
                                    <BiSupport style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Trung tâm hỗ trợ
                                </div>
                            </div>
                        </Col>
                        <Col xl={20} lg={20} md={16} sm={24} xs={24}>
                            <div className="update-container">
                                <Row gutter={[20, 20]}>
                                    <Col xl={24} md={24} sm={24} xs={24}>
                                        <div className="update-title">
                                            Thông tin cá nhân
                                        </div>
                                    </Col>
                                    <Col xl={8} md={8} sm={24} xs={24}>
                                        <div className="avatar">
                                            <div className="avatar__img">
                                                <Avatar
                                                    size={{ xs: 80, sm: 100, md: 120, lg: 140, xl: 150, xxl: 200 }}
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/avatar/${avatar}`}
                                                />
                                            </div>
                                            <div className="avatar__btn">
                                                <Upload {...prop} >
                                                    <Button icon={<UploadOutlined />}>Cập nhật ảnh</Button>
                                                </Upload>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={8} md={8} sm={24} xs={24}>
                                        <div className="info">
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ maxWidth: 600 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <Form.Item
                                                    label="ID"
                                                    name="_id"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                    initialValue={account?.user?.id}
                                                    hidden
                                                >
                                                    <Input disabled />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                    initialValue={account?.user?.email}
                                                >
                                                    <Input disabled />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Tên hiển thị"
                                                    name="fullName"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                    initialValue={account?.user?.fullName}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Số điện thoại"
                                                    name="phone"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                    initialValue={account?.user?.phone}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item >
                                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                                        Cập nhật
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col xl={8} md={8} sm={24} xs={24}>
                                        <div style={{ fontSize: "16px", color: "rgb(100, 100, 109)" }}>
                                            Bảo mật
                                        </div>
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            alignItems: "center", padding: "18px 0"
                                        }}>
                                            <span style={{ fontSize: "14px", color: "rgb(56, 56, 61)" }}>
                                                Thiết lập mật khẩu
                                            </span>
                                            <Button type="primary">Cập nhật</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default AccountUpdate;