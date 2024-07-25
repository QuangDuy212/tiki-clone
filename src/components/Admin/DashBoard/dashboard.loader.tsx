'use client';
import { Skeleton, Row, Col } from 'antd';
import { useState } from 'react';
import '../../../styles/admin/dashboard/dashboard.loader.scss'

const DashboardLoader = () => {
    const [active, setActive] = useState(true);
    return (
        <>

            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <div className='input'>
                        <Skeleton.Input
                            active={active}
                            block={true}
                            style={{ width: "300px", height: "100px" }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className='input'>
                        <Skeleton.Input
                            active={active}
                            block={true}
                            style={{ width: "300px", height: "100px" }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default DashboardLoader;