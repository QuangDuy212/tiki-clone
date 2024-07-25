'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { callUpdateUser } from 'src/services/api';
import { useSession } from 'next-auth/react';

interface IProps {
    fetchUser: any;
    isOpenUpdateUser: boolean;
    setIsOpenUpdateUser: (v: boolean) => void;
    dataUpdate: any;
}

const UpdateUser = (props: IProps) => {
    //PROPS:
    const { fetchUser, isOpenUpdateUser, setIsOpenUpdateUser, dataUpdate } = props;

    //STATE: 
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    //LIBRARY:
    const { data: session } = useSession();

    //METHOD: 
    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    const onFinish = async (values: { _id: string, fullName: string, phone: string }) => {
        const { _id, fullName, phone } = values;
        const res = await callUpdateUser(_id, fullName, phone, session?.access_token as string);
        if (res && res?.data) {
            notification.success({
                message: "Cập nhật tài khoản thành công!",
                duration: 1
            })
            await fetchUser();
            setIsOpenUpdateUser(false);
        } else {
            notification.error({
                message: "Cập nhật tài khoản có lỗi xảy ra!",
                duration: 1
            });
        }
    }

    const onFinishFailed = (error: any) => {
        console.log(">>> check error: ", error)
    }

    const showModal = () => {
        setIsOpenUpdateUser(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpenUpdateUser(false);
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                open={isOpenUpdateUser}
                onOk={handleOk}
                onCancel={handleCancel}
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
                        hidden
                        label='ID'
                        name="_id"
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>
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
                        <Input disabled />
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
            </Modal>
        </>
    );
};

export default UpdateUser;