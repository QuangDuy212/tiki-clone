'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, message, notification } from 'antd';
import { callRegister } from 'src/services/api';

interface IProps {
    isOpenNewUser: boolean;
    setIsOpenNewUser: (v: boolean) => void;
    fetchData: any;
}

const CreateNewUser = (props: IProps) => {
    const { isOpenNewUser, setIsOpenNewUser, fetchData } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: { fullName: string, email: string, phone: string, password: string }) => {
        const { fullName, email, phone, password } = values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, phone, password);
        setIsSubmit(false);
        if (res?.data && res?.data?._id) {
            message.success("Đăng kí tài khoản thành công!");
            await fetchData();
            setIsOpenNewUser(false);
            form.resetFields();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };

    const onFinishFailed = (values: any) => {
        console.log(">>> submit error: ", values);
    }

    const showModal = () => {
        setIsOpenNewUser(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpenNewUser(false);
    };



    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={isOpenNewUser}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='register-body__content'
                    form={form}
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Full name'
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Email'
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Password'
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Phone number'
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};

export default CreateNewUser;