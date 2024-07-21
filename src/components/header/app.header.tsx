'use client';
import '../../styles/header/app.header.scss';
import {
    AudioOutlined, CheckCircleFilled, HomeFilled, HomeOutlined,
    ShoppingCartOutlined, SmileOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Col, Divider, Image, Input, Row, Dropdown, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import type { MenuProps } from 'antd';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { RiRefund2Line } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdDiscount } from "react-icons/md";
import { doLogout } from 'src/lib/features/account/accountSlice';
import { callLogout } from 'src/services/api';
import { signOut, useSession } from 'next-auth/react';
import { doUpdateQuery } from 'src/lib/features/search/searchSlice';



const AppHeader = () => {
    //STATE:
    const [activePage, setActivePage] = useState<string>("home")
    //LIBRARY: 
    const router = useRouter();
    const { Search } = Input;
    const { data: session } = useSession()

    //REDUX: 
    const searchQuery = useAppSelector(state => state.search.query);
    const dispatch = useAppDispatch();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span onClick={() => { router.push("/customer/account"); setActivePage("customer") }}>Thông tin tài khoản</span>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={() => { router.push("/customer/order") }}>Đơn hàng của tôi</span>
            ),
        },
        {
            key: '3',
            label: (
                <span>Trung tâm hỗ trợ</span>
            ),
        },
        {
            key: '4',
            label: (
                <span onClick={() => handleLogOut()}>Đăng xuất </span>
            ),
        },

    ];

    //METHODS: 
    useEffect(() => {
        const pathname = window.location.pathname;
        const url = window.location.pathname.startsWith('/customer');
        if (url)
            setActivePage("customer");
        else if (pathname === '/') {
            setActivePage("home")
        }
    }, [])
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        dispatch(doUpdateQuery(value))
    }


    const handleLogOut = async () => {
        const res = await callLogout(session?.access_token as string);
        if (res?.data) {
            signOut({ redirect: false })
            toast.success("Log out success!");
            localStorage.removeItem("access_token");
        }
    }
    return (
        <>
            <div className="container"
                style={{ padding: "10px" }}
            >
                <Row >
                    <Col span={2} >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", cursor: "pointer" }}
                            onClick={() => { router.push('/'); setActivePage('home') }}
                        >
                            <img src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png" alt="tiki-logo" width="96" height="40" />
                            <span style={{ color: "rgb(0, 62, 161)", textAlign: "center" }}>Tốt &amp; Nhanh</span>
                        </div>
                    </Col>
                    <Col span={2} />
                    <Col span={20} >
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <div
                                    className='search-input'
                                >
                                    <Search placeholder="Bạn tìm gì hôm nay"
                                        onSearch={onSearch}
                                        enterButton
                                    />
                                </div>
                                <div style={{ display: "flex", width: "350px", justifyContent: "right" }}>
                                    <div
                                        className={`nav-btn ${activePage === 'home' ? "active" : ""}`}
                                        onClick={() => { router.push("/"); setActivePage("home") }}
                                    >
                                        <span className='nav-btn__content--icon'>
                                            <HomeFilled />
                                        </span>
                                        <span className='nav-btn__content--name'>
                                            Trang chủ
                                        </span>
                                    </div>
                                    {
                                        session?.user?.id &&
                                        <div
                                            className={`nav-btn ${activePage === 'customer' ? "active" : ""}`}
                                            onClick={() => setActivePage("customer")}
                                        >
                                            <Dropdown menu={{ items }} placement="bottomRight">
                                                <Space>
                                                    <span className='nav-btn__content--icon'>
                                                        {!session?.user?.avatar
                                                            &&
                                                            <Avatar size={30} icon={<UserOutlined />} />
                                                        }
                                                        {session?.user?.avatar
                                                            &&
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/avatar/${session?.user?.avatar}`}
                                                                style={{ borderRadius: "50%", height: "30px", width: "30px" }}
                                                            />
                                                        }

                                                    </span>
                                                    <span className='nav-btn__content--name'>
                                                        Tài khoản
                                                    </span>

                                                </Space>
                                            </Dropdown>
                                        </div>
                                    }
                                    {!session?.user?.id &&
                                        <div
                                            className={`nav-btn ${activePage === 'customer' ? "active" : ""}`}
                                            onClick={() => router.push('/auth/signin')}
                                        >
                                            <span className='nav-btn__content--icon'>
                                                <SmileOutlined />
                                            </span>
                                            <span className='nav-btn__content--name'>
                                                Tài khoản
                                            </span>
                                        </div>
                                    }
                                    <div className='flex-center'>
                                        <Divider type='vertical' style={{ width: "2px", height: "50%" }} />
                                    </div>
                                    <div
                                        className='cart-btn'
                                    >
                                        <Badge count={1}>

                                            <span style={{ color: "rgb(10, 104, 255)", fontSize: "24px" }}>
                                                <ShoppingCartOutlined />
                                            </span>
                                        </Badge>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>


            </div>
            <Divider style={{ margin: " 0" }} />
            <div className='container'>
                <div className='header-bottom'>
                    <div style={{ display: "flex" }}>
                        <span style={{ color: " #003EA1", fontSize: "14px", marginRight: "20px", fontWeight: 600 }}>
                            Cam kết
                        </span>
                        <div className='flex-center'>
                            <div className='flex-center'>
                                <CheckCircleFilled style={{ fontSize: 15, color: "rgb(11, 116, 229)" }} />
                                <span className='header-bottom__content'>
                                    100% hàng thật
                                </span>
                            </div>
                            <div className='flex-center'>
                                <Divider type='vertical' style={{ width: "2px", height: "20px" }} />
                            </div>
                            <div className='flex-center'>
                                <RiRefund2Line style={{ fontSize: 20, color: "rgb(11, 116, 229)" }} />
                                <span className='header-bottom__content'>
                                    Hoàn 200% nếu hàng giả
                                </span>
                            </div>
                            <div className='flex-center'>
                                <Divider type='vertical' style={{ width: "2px", height: "20px" }} />
                            </div>
                            <div className='flex-center'>
                                <TbTruckReturn style={{ fontSize: 20, color: "rgb(11, 116, 229)" }} />
                                <span className='header-bottom__content'>
                                    30 ngày đổi trả
                                </span>
                            </div>
                            <div className='flex-center'>
                                <Divider type='vertical' style={{ width: "2px", height: "20px" }} />
                            </div>
                            <div className='flex-center'>
                                <LiaShippingFastSolid style={{ fontSize: 20, color: "rgb(11, 116, 229)" }} />
                                <span className='header-bottom__content'>
                                    Giao nhanh 2h
                                </span>
                            </div>
                            <div className='flex-center'>
                                <Divider type='vertical' style={{ width: "2px", height: "20px" }} />
                            </div>
                            <div className='flex-center'>
                                <MdDiscount style={{ fontSize: 20, color: "rgb(11, 116, 229)" }} />
                                <span className='header-bottom__content'>
                                    Giả siêu rẻ
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AppHeader;