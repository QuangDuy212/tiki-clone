'use client'

import { Button, Divider } from "antd";
import ModalDetail from "./order.modal";
import { useState } from "react";

interface IProps {
    orders: IOrder<IBookDetail>[];
}

const OrderHistory = (props: IProps) => {
    //STATE: 
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<IBookDetail[]>([]);

    //PROPS: 
    const { orders } = props;

    //METHODS:
    const handleOnDetail = (data: IBookDetail[]) => {
        setIsOpenDetail(true);
        setDataDetail(data);
    }
    return (
        <>
            <div style={{ fontSize: "20px", margin: "10px 0", padding: "0 20px" }}>
                Đơn hàng của tôi
            </div>
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "20px",
                width: "100%"
            }}>
                <div style={{ fontSize: "14px", color: "#808089" }}>
                    Đơn hàng
                </div>
                <Divider style={{ margin: "16px 0" }} />
                <div>
                    {orders?.map((item, index) => {
                        return (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                                    <div>
                                        {item?.createdAt}
                                    </div>
                                    <div>
                                        {item?.totalPrice}
                                    </div>
                                    <Button type="primary" onClick={() => handleOnDetail(item?.detail)}>
                                        Chi tiết
                                    </Button>
                                </div>
                                <Divider style={{ margin: "0" }} />
                            </div>
                        )
                    })}
                </div>
                <ModalDetail
                    isOpenDetail={isOpenDetail}
                    setIsOpenDetail={setIsOpenDetail}
                    dataDetail={dataDetail}
                />
            </div>
        </>
    )
}
export default OrderHistory;