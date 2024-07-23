import { Divider } from "antd";

interface IProps {
    handleBuyBtn: any;
    totalPrice: number;
    carts: any;
}

const ViewOrder = (props: IProps) => {
    //PROPS: 
    const { handleBuyBtn, totalPrice, carts } = props;
    return (
        <>
            <div className="pay">
                <div className="pay-content">
                    <div className="pay-content__tmp">
                        <div>Tạm tính</div>
                        <div >
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                        </div>
                    </div>
                    <Divider />
                    <div className="pay-content__main">
                        <div>Tổng tiền</div>
                        <div style={{
                            color: "#ee4d2d"
                        }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                        </div>
                    </div>
                    <Divider />
                </div>
                <div className="pay__btn">
                    <button
                        onClick={() => handleBuyBtn()}
                    >
                        Mua hàng <span>({carts?.length ?? 0})</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ViewOrder;