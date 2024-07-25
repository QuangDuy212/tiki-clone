
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Badge, Descriptions } from 'antd';
import moment from 'moment';

interface IProps {
    data: any;
    isOpenUserDetail: boolean;
    setIsOpenUserDetail: (v: boolean) => void;
}

const DetailUser = (props: IProps) => {

    const { data, isOpenUserDetail, setIsOpenUserDetail } = props;
    const onClose = () => {
        setIsOpenUserDetail(false);
    }
    return (
        <>
            <Drawer
                title="User Information"
                onClose={onClose}
                open={isOpenUserDetail}
                width={'50vw'}
            >
                <Descriptions
                    title="User"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{data?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Điện thoại">{data?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}> <Badge status="processing" text="USER" /></Descriptions.Item>
                    <Descriptions.Item label="Create at ">
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Update at ">
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>


                </Descriptions>
            </Drawer >
        </>
    )
}
export default DetailUser;