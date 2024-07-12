'use client';
import '../../styles/header/app.header.scss';
import { AudioOutlined, HomeOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { Badge, Col, Divider, Input, Row, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';


const AppHeader = () => {

    const router = useRouter();
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <div className="container"
                style={{ padding: "10px" }}
            >
                <Row >
                    <Col span={2} >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", cursor: "pointer" }}
                            onClick={() => router.push('/')}
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
                                    <Search placeholder="Bạn tìm gì hôm nay" onSearch={onSearch} enterButton />
                                </div>
                                <div style={{ display: "flex", width: "350px", justifyContent: "right" }}>
                                    <div
                                        className='nav-btn'
                                    >
                                        <span className='nav-btn__content--icon'>
                                            <HomeOutlined />
                                        </span>
                                        <span className='nav-btn__content--name'>
                                            Trang chủ
                                        </span>
                                    </div>
                                    <div
                                        className='nav-btn'
                                    >
                                        <span className='nav-btn__content--icon'>
                                            <SmileOutlined />
                                        </span>
                                        <span className='nav-btn__content--name'>
                                            Tài khoản
                                        </span>
                                    </div>
                                    <Divider type='vertical' style={{ width: "2px" }} />
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
            <Divider style={{ margin: "10px 0" }} />
        </>
    )
}

export default AppHeader;