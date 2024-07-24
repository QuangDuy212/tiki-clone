'use client'

import { Button, Col, Divider, Row } from "antd";
import ModalDetail from "./order.modal";
import { useState } from "react";
import dayjs from "dayjs";
import { useClientMediaQuery } from "src/utils/isMobile";

interface IProps {
    orders: IOrder<IBookDetail>[];
}

const OrderHistory = (props: IProps) => {
    //STATE: 
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<IBookDetail[]>([]);
    const isMobile = useClientMediaQuery('(max-width: 1000px)')

    //PROPS: 
    const { orders } = props;

    //METHODS:
    const handleOnDetail = (data: IBookDetail[]) => {
        setIsOpenDetail(true);
        setDataDetail(data);
    }
    return (
        <>
            <div className={isMobile ? "container" : ""} style={isMobile ? { paddingTop: "80px" } : {}}>
                <div style={{ fontSize: "20px", margin: "10px 0", }}>
                    Đơn hàng của tôi
                </div>
                <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    padding: "20px",
                }}>
                    <div style={{ fontSize: "14px", color: "#808089" }}>
                        Đơn hàng
                    </div>
                    <Divider style={{ margin: "16px 0" }} />
                    <Row>
                        {orders?.map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    style={{ marginBottom: "10px" }}
                                    span={24}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                                        <div>
                                            {dayjs(item?.createdAt).format("MM-DD-YYYY")}
                                        </div>
                                        <div>
                                            {item?.totalPrice}
                                        </div>
                                        <Button type="primary" onClick={() => handleOnDetail(item?.detail)}>
                                            Chi tiết
                                        </Button>
                                    </div>
                                    <Divider style={{ margin: "0" }} />
                                </Col>
                            )
                        })}
                    </Row>
                    <ModalDetail
                        isOpenDetail={isOpenDetail}
                        setIsOpenDetail={setIsOpenDetail}
                        dataDetail={dataDetail}
                    />
                </div>


            </div>
        </>
    )
}
export default OrderHistory;