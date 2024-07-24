'use client'
import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useSession } from "next-auth/react";
import { useAppSelector } from "src/lib/hooks";
import { callChangePassword } from "src/services/api";
import { useClientMediaQuery } from "src/utils/isMobile";

interface IProps {

}

const ChangePassword = (props: IProps) => {
    // REDUX:

    //LIBRARY:
    const [form1] = Form.useForm();
    const { data: session } = useSession()
    const isMobile = useClientMediaQuery('(max-width: 1000px)')

    const onFinish = async (values: { email: string, oldpass: string, newpass: string }) => {
        const { email, oldpass, newpass } = values;
        if (session) {
            const res = await callChangePassword(email, oldpass, newpass, session?.access_token);
            if (res?.statusCode === 201) {
                message.success("Cập nhật thành công!");
                form1.setFieldValue("oldpass", "")
                form1.setFieldValue("newpass", "")
            }
            else {
                notification.error({
                    description: res?.message,
                    message: "Có lỗi xảy ra!",
                })
            }
        }
    }
    const onFinishFailed = (error: any) => {

    }
    return (
        <>
            <div className="update-container" style={isMobile ? { paddingTop: "80px" } : {}}>
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <div className="update-password"
                            style={{
                                display: "flex",
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                            <Form
                                name="basic"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{
                                    maxWidth: 360,
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    borderRadius: "10px"
                                }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                form={form1}
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
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="newpass"
                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ChangePassword;