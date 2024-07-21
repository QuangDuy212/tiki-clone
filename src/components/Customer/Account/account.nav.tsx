'use client'
import { Avatar, Divider } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import '../../../styles/account/account.update.scss'

const AccountUpdateNav = () => {
    //STATE: 
    const [avatar, setAvatar] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("");
    //LIBRARY: 
    const { data: session } = useSession();
    const router = useRouter();

    //METHODS: 
    useEffect(() => {
        if (session?.user?.avatar) {
            setAvatar(session?.user?.avatar)
        }
    }, [session]);

    useEffect(() => {
        let url = window.location.pathname;
        if (url === 'customer/account') {
            setActiveTab("account");
        }
        else if (url === 'customer/order') {
            setActiveTab("order");
        }
        else if (url === '/customer/help-center') {
            setActiveTab("help-center");
        }
    }, [])

    return (
        <>
            <div className="nav-container">
                <div>
                    <div style={{ display: "flex" }}>
                        <Avatar
                            // size={{ xs: 50, sm: 50, md: 50, lg: 50, xl: 50, xxl: 50 }}
                            size={50}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/avatar/${avatar}`}
                            style={{ marginRight: "12px" }}
                        />
                        <span style={{ fontSize: "14px", display: "flex", flexDirection: "column" }}>
                            Tài khoản của
                            <span style={{ fontSize: '18px' }}>{session?.user?.fullName}</span>
                        </span>

                    </div>
                </div>
                <Divider style={{ margin: "10px 0" }} />
                <div className={`nav-item ${activeTab === 'account' ? "active" : ""}`}
                    onClick={() => router.push('/customer/account')}
                >
                    <FaUserCircle style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Thông tin cá nhân
                </div>
                <div className={`nav-item ${activeTab === 'order' ? "active" : ""}`}
                    onClick={() => router.push('/customer/order')}
                >
                    <IoNewspaperSharp style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Quản lí đơn hàng
                </div>
                <div className={`nav-item ${activeTab === 'help-center' ? "active" : ""}`}
                    onClick={() => router.push('/customer/help-center')}
                >
                    <BiSupport style={{ marginRight: "22px", height: "20px", width: "20px" }} /> Trung tâm hỗ trợ
                </div>
            </div>
        </>
    )
}

export default AccountUpdateNav;