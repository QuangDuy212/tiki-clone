'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { sendRequest } from 'src/utils/api';
import { callRegister } from 'src/services/api';

type FieldType = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
};



const AuthSignup = () => {
    const router = useRouter();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, email, password, phone } = values;
        // const res = await sendRequest<IRes<IUser>>({
        //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/register`,
        //     method: "POST",
        //     body: {
        //         email: email,
        //         fullName: fullName,
        //         password: password,
        //         phone: phone
        //     },
        // })
        const res = await callRegister(fullName, email, password, phone);
        if (!res?.error) {
            router.push("/auth/signin");
            toast.success("Register success!")
        } else {
            toast.error(res?.error)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div style={{ height: "90vh", margin: "auto 0" }}>
                <Row style={{ height: "100%", width: "100vw" }}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}
                        style={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            borderRadius: "10px",
                            padding: "10px",
                            margin: "auto auto",
                        }}>
                        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                        <Form
                            name="basic"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 20 }}
                            style={{ maxWidth: 600, padding: "10px" }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Full name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <div style={{ display: "flex", justifyContent: "right", gap: "10px" }}>
                                <Button type="primary"
                                    onClick={() => router.push("/auth/signin")}
                                >
                                    Sign in
                                </Button>
                                <Button type="primary" htmlType="submit"
                                >
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>

        </>
    )

};

export default AuthSignup;