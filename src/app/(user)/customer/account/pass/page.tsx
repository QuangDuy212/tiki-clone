import { Form, FormProps, message, notification, Row } from "antd";
import { useSession } from "next-auth/react";
import { callChangePassword } from "src/services/api";

const ChangePasswordPage = () => {

    //LIBRARY: 

    const { data: session, } = useSession()

    type Password = {
        email: string;
        oldpass: string;
        newpass: string;
    }

    const onFinishPassword: FormProps<Password>['onFinish'] = async (values) => {
        const { email, oldpass, newpass } = values;
        const res = await callChangePassword(email, oldpass, newpass, session?.access_token as string)
        if (res && res?.data && res?.statusCode === 200) {
            message.success("Cập nhật mật khẩu thành công!");
        }
        else {
            notification.error({
                description: res?.message,
                message: "Có lỗi xảy ra!",
            })
        }
    };


    return (
        <>
            {/* <Row gutter={[20, 20]}>
                                        <div className="info">
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ maxWidth: 600 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinishPassword}
                                                onFinishFailed={onFinishFailed}
                                                autoComplete="off"
                                                form={secondForm}
                                            >
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                    initialValue={session?.user?.email}
                                                    hidden
                                                >
                                                    <Input disabled />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mật khẩu cũ"
                                                    name="oldpass"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mật khẩu mới"
                                                    name="newpass"
                                                    rules={[{ required: true, message: 'Không được để trống!' }]}
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
                                    </Row> */}
        </>
    )
}
export default ChangePasswordPage;