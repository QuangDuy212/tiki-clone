'use client';
import { FiPhone } from "react-icons/fi";
import '../../../styles/help-center/help.center.scss';
import { Button, Col, Grid, Image, Row } from "antd";
import { ImGlass } from "react-icons/im";
import { CgMail } from "react-icons/cg";

const HelpCenter = () => {
    return (
        <>
            <div style={{ fontSize: "20px", margin: "10px 0", padding: "0 20px" }}>
                Trung tâm hỗ trợ
            </div>
            <div style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "20px",
                width: "100%"
            }}>
                <div style={{ fontSize: "14px", color: "#808089" }}>
                    Chăm sóc khách hàng
                </div>
                <div style={{ width: "100%" }}>
                    <Row gutter={[16, 16]}>
                        <Col span={8} >
                            <div className="help-item">
                                <div style={{ height: "43px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <FiPhone style={{ width: "30px", height: "30px", color: "rgb(16, 107, 255)" }}
                                        className="help-icon"
                                    />
                                </div>
                                <div className="title">
                                    Hotline
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    lineHeight: "150%",
                                    color: "rgb(39, 39, 42)",
                                    margin: 0,
                                    height: "40px"
                                }}>
                                    1900-6035
                                </div>
                                <div className="content">
                                    1000 đ/phút, 8h-21h kể cả thứ 7, CN
                                </div>
                            </div>
                        </Col>
                        <Col span={8} >
                            <div className="help-item">
                                <div style={{ height: "43px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img
                                        style={{ borderRadius: "43px", border: "1px solid rgb(235, 235, 240)", width: 40, height: 43 }}
                                        src="https://salt.tikicdn.com/ts/ta/4e/cd/92/b3593adaf274fc49a6ace088ff96471b.png" />
                                </div>
                                <div className="title">
                                    Gặp trợ lí cá nhân
                                </div>
                                <div style={{
                                    height: "40px"
                                }}>
                                    <Button type="primary">
                                        Chat ngay
                                    </Button>
                                </div>
                                <div className="content">
                                    8h-21h kể cả Thứ 7, CN
                                </div>
                            </div>
                        </Col>
                        <Col span={8} ><div className="help-item">
                            <div style={{ height: "43px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <CgMail
                                    style={{ width: "40px", height: "40px", color: "rgb(16, 107, 255)" }}
                                />
                            </div>
                            <div className="title">
                                Gửi yêu cầu hỗ trợ
                            </div>
                            <div style={{
                                height: "40px"
                            }}>
                                <Button type="primary">
                                    Tạo đơn yêu cầu
                                </Button>
                            </div>
                            <div className="content">
                                Hoặc email đến hotro@tiki.vn
                            </div>
                        </div>
                        </Col>
                    </Row>




                </div>
            </div>
        </>
    )
}
export default HelpCenter;