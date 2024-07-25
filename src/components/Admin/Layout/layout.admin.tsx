'use client';
import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SmileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { GrUserAdmin } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { FaAddressBook } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import '../../../styles/admin/layout.admin.scss'

const { Header, Sider, Content } = Layout;

const LayoutAdmin = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    //STATE:
    const [collapsed, setCollapsed] = useState(false);

    //LIBRARY:
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { data: session } = useSession();
    const router = useRouter();
    const location = window.location
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span onClick={() => { router.push("/customer/account"); }}>Thông tin tài khoản</span>
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
                <span onClick={() => { router.push("/customer/help-center") }}>Trung tâm hỗ trợ</span>
            ),
        },
        {
            key: '4',
            label: (
                <span onClick={() => handleLogOut()}>Đăng xuất </span>
            ),
        },

    ];
    if (session?.user.role === 'ADMIN' && window.location.pathname.startsWith('/admin')) {
        const tmp = {
            label: <span onClick={() => { router.push("/admin") }}>Trang quản trị</span>,
            key: 'admin'
        }
        if (items.includes(tmp)) {
            items.filter(item => item != tmp)
        }
        items.unshift({
            label: <span onClick={() => { router.push("/") }}>Trang chủ</span>,
            key: 'home'
        })
    }
    else if (session?.user.role === 'ADMIN') {
        const tmp = {
            label: <span onClick={() => { router.push("/") }}>Trang chủ</span>,
            key: 'home'
        }
        if (items.includes(tmp)) {
            items.filter(item => item != tmp)
        }
        items.unshift({
            label: <span onClick={() => { router.push("/admin") }}>Trang quản trị</span>,
            key: 'home'
        })
    }

    useEffect(() => {
    }, [])

    const handleLogOut = async () => {
        signOut({ redirect: false })
        router.push("/")
        toast.success("Log out success!");
        localStorage.removeItem("access_token");
    }


    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme='light'
                className='admin-left'>
                <div style={{ height: 23, margin: 16, textAlign: "center" }} className='title'>
                    <GrUserAdmin /> {!collapsed && <>Admin</>}
                </div>
                <Menu
                    title='Admin'
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/admin',
                            icon: <RxDashboard />,
                            label: <span onClick={() => router.push('/admin')}>Dash board</span>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'Manage Users',
                            children: [
                                {
                                    key: '/admin/user',
                                    icon: <FaUsersGear />,
                                    label:
                                        <span onClick={() => router.push('/admin/user')}>CRUD</span>,
                                }
                            ]
                        },
                        {
                            key: '/admin/book',
                            icon: <FaAddressBook />,
                            label:
                                <span onClick={() => router.push('/admin/book')}>Manage Books</span>,
                        },
                        {
                            key: '/admin/order',
                            icon: <MdBorderColor />,
                            label:
                                <span onClick={() => router.push('/admin/order')}>Manage Orders</span>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} theme='light' className='admin-header'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ marginRight: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {
                            session?.user?.id &&
                            <div
                                className={`nav-btn `}
                                style={{ height: "50%" }}
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
                                className={`nav-btn `}
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
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '70px 16px 0',
                        padding: 24,
                        height: "calc(100vh - 70px)",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: "scroll"
                    }}
                    className='content'
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;