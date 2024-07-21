import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/auth.option";
import OrderHistory from "src/components/Customer/Order/order.history";
import { callGetBookById, callGetListOrder } from "src/services/api";

const OrderPage = async () => {
    //NEXT AUTH:
    const session = await getServerSession(authOptions)
    let orders: IOrder<IBookDetail>[] = [{
        "_id": "",
        "name": "",
        "address": "",
        "phone": "",
        "totalPrice": 0,
        "detail": [
            {
                "bookName": '',
                "quantity": 0,
                "_id": '',
            }]
    }]

    if (session) {
        const res = await callGetListOrder(1, 100, session.access_token as string);
        if (res?.data)
            orders = res?.data?.result
    }

    return (
        <>
            <OrderHistory
                orders={orders ?? []}
            />
        </>
    )
}

export default OrderPage;