import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useSession } from "next-auth/react";
import { useAppSelector } from "src/lib/hooks";
import { callChangePassword } from "src/services/api";
import { sendRequest } from "src/utils/api";

interface IProps {

}

const ChangePassword = (props: IProps) => {
    // REDUX:

    //LIBRARY:
    const [form1] = Form.useForm();
    const { data: session } = useSession()

    const onFinish = async (values: { email: string, oldpass: string, newpass: string }) => {
        const { email, oldpass, newpass } = values;
        const res = await callChangePassword(email, oldpass, newpass);
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
    const onFinishFailed = (error: any) => {

    }
    return (
        <>
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <div className="update-password">
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
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
                </Col>
            </Row>
        </>
    )
}

export default ChangePassword;