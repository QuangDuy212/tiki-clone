'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { sendRequest } from 'src/utils/api';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { doLogin } from 'src/lib/features/account/accountSlice';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};



const AuthSignin = () => {
    //REDUX:
    const user = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()

    //LIBRARY: 
    const router = useRouter();

    //METHODS: 
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;
        const res = await sendRequest<IRes<IUser>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
            method: "POST",
            body: {
                username: username,
                password: password
            },
        })
        if (!res?.error && res?.data) {
            router.push("/");
            toast.success("Login success!");
            dispatch(doLogin(res?.data));
            localStorage.setItem("access_token", res.data.access_token);
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
                        <h1 style={{ textAlign: "center" }}>Sign In</h1>
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
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
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
                            <div style={{ display: "flex", justifyContent: "right" }}>
                                <Button type="primary" htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                            <Divider />
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button type="primary"
                                    onClick={() => router.push("/auth/signup")}
                                >
                                    Create new Account
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>

        </>
    )

};

export default AuthSignin;