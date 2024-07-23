'use client';
import { Col, Divider, InputNumber, Row, Empty, Steps, Result, Button } from "antd";
import '../../styles/checkout/order.cart.scss'
import { useDispatch, } from "react-redux";
import { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { useAppSelector } from "src/lib/hooks";
import ViewOrder from "./step1";
import ConfirmOrder from "./step2";
import { doDeleteBookAction, doUpdateBookAction } from "src/lib/features/order/orderSlice";
import { useRouter } from "next/navigation";

const OrderCartPage = () => {
    //REDUX: 
    const carts = useAppSelector(state => state.order.carts);

    //STATE: 
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(1);

    //LIBRARY:
    const dispatch = useDispatch();
    const router = useRouter();

    //METHODS:
    useEffect(() => {
        if (carts)
            if (carts.length > 0) {
                const total = carts.reduce((total: number, item: ICartRedux) => total + item.quantity * item.detail.price, 0);
                setTotalPrice(total);
            }
            else {
                setTotalPrice(0);
            }
    }, [carts]);

    const onChange = (value: number | null, book: ICartRedux) => {
        if (!value || value < 1) return;
        if (!isNaN(value))
            dispatch(doUpdateBookAction({ ...book, quantity: value }))
    }

    const onDelete = (book: ICartRedux | null) => {
        if (book)
            dispatch(doDeleteBookAction(book));
    }

    const handleBuyBtn = () => {
        if (carts?.length > 0) {
            setCurrentStep(2);
        }
    }
    const truncate = (str: string, n: number) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    };
    return (
        <>
            <div className="cart-container">
                <div className="container">
                    <Steps
                        style={{ marginTop: "60px" }}
                        current={currentStep}
                        items={[
                            {
                                title: 'Đơn hàng',
                            },
                            {
                                title: 'Đặt hàng',
                            },
                            {
                                title: 'Thanh toán',
                            },
                        ]}
                    />
                    <Row gutter={[20, 20]}>
                        {currentStep !== 3 &&
                            <>
                                <Col md={18} sm={24}>
                                    <Row gutter={[20, 20]}>
                                        <Col xl={24} md={24} sm={24} xs={0}>
                                            <div className="title">
                                                <Row>
                                                    <Col className="title__name" xs={12} sm={12}>
                                                        Sản phẩm
                                                    </Col>
                                                    <Col className="title__price flex-full" xs={3} sm={3}>
                                                        Đơn giá
                                                    </Col>
                                                    <Col className="title__quantity flex-full" xs={3} sm={3}>
                                                        Số lượng
                                                    </Col>
                                                    <Col className="title__total flex-full" xs={3} sm={3}>
                                                        Thành tiền
                                                    </Col>
                                                    <Col className="title__btn flex-full" xs={3} sm={3}>
                                                        Thao tác
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col xl={0} md={0} sm={0} xs={24}>
                                            <div className="title"
                                                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                Đơn đặt hàng
                                            </div>
                                        </Col>
                                        {carts && carts.length > 0 &&
                                            carts.map((item: ICartRedux, index: number) => {
                                                const total = item.quantity * item.detail.price;
                                                return (
                                                    <Col xl={24} md={24} sm={24} key={`product-${index}`}>
                                                        <div className="product" >
                                                            <Row>
                                                                <Col className="product__img " xl={4} md={4} sm={12} xs={12}>
                                                                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${item.detail.thumbnail}`} />
                                                                </Col>
                                                                <Col className="product__name " xl={8} md={8} sm={12} xs={12}>
                                                                    {truncate(item.detail.mainText, 20)}
                                                                </Col>
                                                                <Col className="product__price flex-full" xl={3} md={3} sm={6} xs={6}>
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                                                                </Col>
                                                                <Col className="product__quantity flex-full" xl={3} md={3} sm={6} xs={6}>
                                                                    <InputNumber min={1} max={item.detail.quantity} defaultValue={item.quantity} onChange={(value) => onChange(value, item)} />
                                                                </Col>
                                                                <Col className="product__total flex-full" xl={3} md={3} sm={6} xs={6}>
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                                                </Col>
                                                                <Col className="product__btn flex-full" xl={3} md={3} sm={6} xs={6}>
                                                                    <button onClick={() => onDelete(item)}>Xóa</button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }

                                        {carts.length === 0 &&
                                            <Col xl={24} md={24} sm={24}>
                                                <div className="product" style={{ height: "100%" }}>
                                                    <Empty description="Không có sản phẩm nào" />
                                                </div>
                                            </Col>
                                        }

                                    </Row>
                                </Col>
                                <Col md={6} sm={24} xs={24}>
                                    {currentStep === 1 &&
                                        <ViewOrder
                                            handleBuyBtn={handleBuyBtn}
                                            totalPrice={totalPrice}
                                            carts={carts}
                                        />
                                    }
                                    {currentStep === 2 &&
                                        <ConfirmOrder
                                            totalPrice={totalPrice}
                                            setCurrentStep={setCurrentStep}
                                        />
                                    }
                                </Col>
                            </>
                        }
                        {currentStep === 3 &&
                            <Col md={24} sm={24}>
                                <Result
                                    icon={<SmileOutlined />}
                                    title="Tuyệt, cảm ơn đã tin tưởng!"
                                    extra={<Button type="primary" onClick={() => router.push("/customer/order")}>Lịch sử</Button>}
                                />
                            </Col>
                        }
                    </Row>
                </div>
            </div>
        </>
    )
}

export default OrderCartPage;