'use client';
import { Button, Checkbox, Divider, Form, Input, Radio, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";
import { useAppSelector } from 'src/lib/hooks';
import { useSession } from 'next-auth/react';
import { callCreateAnOrder } from 'src/services/api';
import { doResetBookCart } from 'src/lib/features/order/orderSlice';

interface IProps {
    setCurrentStep: (v: number) => void;
    totalPrice: number;
}

const ConfirmOrder = (props: IProps) => {

    // REDUX: 

    const carts = useAppSelector(state => state.order.carts);

    //PROPS:
    const { setCurrentStep, totalPrice } = props;

    //LIBRARY:
    const { data: session } = useSession();
    const [form] = Form.useForm();
    const dispatch = useDispatch();



    //STATE: 
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values: { name: string, address: string, phone: string }) => {
        setIsSubmit(true);
        const detailOrder = carts.map((item: ICartRedux) => {
            return {
                bookName: item?.detail?.mainText,
                quantity: item?.quantity,
                _id: item?._id
            }
        });
        const name = values?.name;
        const address = values?.address;
        const phone = values?.phone;
        const total = totalPrice;
        const data = {
            name: name,
            address: address,
            phone: phone,
            totalPrice: total,
            detail: detailOrder
        }

        if (session) {
            const res = await callCreateAnOrder(data, session?.access_token);
            if (res.statusCode == 201) {
                message.success("Thanh toán thành công!");
                setCurrentStep(3);
                dispatch(doResetBookCart());
            } else {
                message.error(res.message);
            }
            setIsSubmit(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="confirm">
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên người nhận"
                        labelCol={{ span: 24 }}
                        name="name"
                        rules={[{ required: true, message: 'Không để trống tên!' }]}
                        initialValue={session?.user?.fullName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        labelCol={{ span: 24 }}
                        name="phone"
                        rules={[{ required: true, message: 'Không để trống điện thoại!' }]}
                        initialValue={session?.user?.phone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        labelCol={{ span: 24 }}
                        name="address"
                        rules={[{ required: true, message: 'Không để trống địa chỉ!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Phương thức thanh toán"
                        labelCol={{ span: 24 }}
                        valuePropName="checked"
                        name="method"
                        rules={[{ required: true, message: 'Không để trống phương thức!' }]}
                    >
                        <Radio >Thanh toán khi nhận hàng</Radio>
                    </Form.Item>
                </Form>
                <Divider />
                <div className='confirm__price'>
                    <span className='text1'>Tổng: </span>
                    <span className='text2'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                </div>
                <Divider />
                <button
                    className='confirm__btn'
                    onClick={() => form.submit()}
                    disabled={isSubmit}
                >
                    {isSubmit && <span className='spin'><ImSpinner8 /></span>}Đặt hàng
                </button>
            </div>
        </>
    )
}

export default ConfirmOrder;