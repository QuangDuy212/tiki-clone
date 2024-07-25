import React, { useEffect, useState } from 'react';
import { Button, Modal, message, Upload, Space, Table, Tag, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { callBulkCreateUser } from '../../../../services/api';
import { useSession } from 'next-auth/react';

const { Dragger } = Upload;

interface IProps {
    isOpenImportUser: boolean;
    setIsOpenImportUser: (v: boolean) => void;
    fetchUser: () => void;
}

const ImportUser = (props: IProps) => {
    //PROPS: 
    const { isOpenImportUser, setIsOpenImportUser } = props;

    //STATE: 
    const [dataExcel, setDataExcel] = useState<IBulkCreate[]>([]);
    const [start, setStart] = useState<boolean>(false);

    // VARIABLE:
    const { data: session } = useSession();

    useEffect(() => {
        setStart(!start);
    }, [isOpenImportUser])

    const showModal = () => {
        setIsOpenImportUser(true);
    };

    const handleCancel = () => {
        setDataExcel([]);
        setIsOpenImportUser(false);
    };

    const dummyRequest = ({ file, onSuccess }: { file: any, onSuccess: any }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        //action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it

        //https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        customRequest: dummyRequest,
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
            }
            if (status === 'done') {
                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();

                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];

                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(sheet, {
                        header: ["fullName", "email", "phone"],
                        range: 1
                    });
                    if (jsonData && jsonData.length > 0)
                        setDataExcel(jsonData);
                };
                reader.readAsArrayBuffer(file);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        defaultFileList: []
    };


    const columns = [
        {
            title: 'Tên hiện thị',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    const renderHeader = () => {
        return (
            <div >
                <span>Table User Upload</span>
            </div>
        )
    }

    const handleSubmit = async () => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await callBulkCreateUser(data, session?.access_token as string);
        setIsOpenImportUser(false);
        if (res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error:${res.data.countError} `,
                message: "Upload thành công",
                duration: 1
            })
            setDataExcel([]);
            setIsOpenImportUser(false);
            props.fetchUser();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra",
                duration: 1
            })
        }
    }
    return (
        <>
            <Modal
                title="Import User"
                open={isOpenImportUser}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText={'Import'}
                maskClosable={false}
                okButtonProps={
                    { disabled: dataExcel.length < 1 }
                }
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    {/* <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx<> </>
                        <a
                            onClick={(e) => e.stopPropagation()}
                            href={templateUrl}
                            download
                        >Dowload Sample File</a>
                    </p> */}
                </Dragger>
                <Table
                    columns={columns}
                    title={renderHeader}
                    dataSource={dataExcel}
                />
            </Modal>
        </>
    );
};

export default ImportUser;