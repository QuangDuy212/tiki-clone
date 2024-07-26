'use client';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    message,
    notification,
    Image, Upload
} from 'antd';
import { callFetchCategory, callUpdateABook, callUploadBookImg } from '../../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';

interface IProps {
    isOpenUpdateBook: boolean;
    setIsOpenUpdateBook: (v: boolean) => void;
    fetchBook: () => void;
    dataUpdate: any;
}

const UpdateBook = (props: IProps) => {
    const { isOpenUpdateBook, setIsOpenUpdateBook, fetchBook, dataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<{ value: string, label: string }[]>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [dataThumbnail, setDataThumbnail] = useState<string[]>([]);
    const [dataSlider, setDataSlider] = useState<string[]>([]);
    const [initForm, setInitForm] = useState<{
        _id: string;
        mainText: string;
        author: string;
        price: number;
        category: string[];
        quantity: number;
        sold: number;
        thumbnail: { fileList: { uid: any; name: any; status: string; url: string; } },
        slider?: { fileList: { uid: any; name: any; status: string; url: string; } }
    } | {}>({});

    //LIBRARY: 
    const { data: session } = useSession();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory();
            if (res && res?.data) {
                let d: { value: string, label: string }[] = [];
                res.data.map(item => {
                    let b = { value: item, label: item }
                    d.push(b);
                })
                setListCategory(d);
            }
        }

        fetchCategory();
        if (dataUpdate) {
            const arrThumbnail = [{
                uid: uuidv4(),
                name: dataUpdate.thumbnail,
                status: 'done',
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
            }]

            const arrSlider = dataUpdate?.slider?.map((item, index) => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${item}`,
                }
            })

            const init:
                {
                    _id: string;
                    mainText: string;
                    author: string;
                    price: number;
                    category: string[];
                    quantity: number;
                    sold: number;
                    thumbnail: { fileList: { uid: any; name: any; status: string; url: string; } },
                    slider: { fileList: { uid: any; name: any; status: string; url: string; } }
                } | {} = {
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                category: dataUpdate.category,
                quantity: dataUpdate.quantity,
                sold: dataUpdate.sold,
                thumbnail: { fileList: arrThumbnail },
                slider: { fileList: arrSlider }
            }
            setInitForm(init);
            setDataThumbnail(dataUpdate?.thumbnail);
            setDataSlider(dataUpdate?.slider);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [dataUpdate])

    const getBase64 = (file: any) => {
        return (
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            })
        )
    }
    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
    };

    const handleChange = (info: any, type: any) => {
        // if (info.file.status === 'uploading') {
        //     type ? setLoadingSlider(true) : setLoading(true);
        //     return;
        // }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, (url) => {
        //         type ? setLoadingSlider(false) : setLoading(false);
        //         setImageUrl(url);
        //     });
        // }
    }

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    // custom request: 
    const dummyRequest = ({ file, onSuccess }: { file: any, onSuccess: any }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };
    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }: { file: any, onSuccess: any, onError: any }) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
            setDataThumbnail([
                res.data.fileUploaded,
            ])
            onSuccess('ok');
        }
        else {
            onError("Đã có lỗi khi upload file!")
        }
    }

    const handleUploadFileSlider = async ({ file, onSuccess, onError }: { file: any, onSuccess: any, onError: any }) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
            setDataSlider(slider => [...slider, res.data.fileUploaded])
            onSuccess('ok');
        }
        else {
            onError("Đã có lỗi khi upload file!")
        }
    }

    const handleOnRemove = (file: any, type: any) => {
        if (type === 'thumbnail') {
            setDataThumbnail([]);
        }
        if (type === 'slider') {
            const newSlider = initForm?.slider.filter(x => x.uid != file.uid);
            setDataSlider(newSlider);
        }
    }


    const onFinish = async (values: any) => {
        if (dataThumbnail.length === 0) {
            notification.error({
                description: "Vui lòng upload ảnh thumbnail!",
                message: "Lỗi validate",
            })
            return;
        }
        if (dataSlider.length === 0) {
            notification.error({
                description: "Vui lòng upload ảnh slider!",
                message: "Lỗi validate",
            })
            return;
        }
        const { mainText, author, price, sold, quantity, category, _id } = values;
        const thumbnail = dataThumbnail;
        const slider = dataSlider;
        const res = await callUpdateABook(_id, mainText, thumbnail, slider, author, price, quantity, category, session?.access_token as string);
        if (res && res?.data) {
            notification.success({
                message: "Thành công!",
                description: "Thêm mới sách thành công!",
                duration: 1
            })
            await fetchBook();
            setIsOpenUpdateBook(false);
            setDataThumbnail([]);
            setDataSlider([]);
            setInitForm({});
            form.resetFields();
        } else {
            notification.error({
                message: "Lỗi thông tin!",
                description: res?.message[0],
                duration: 1
            })
        }
    };

    const onFinishFailed = (values: any) => {
        console.log(">>> submit error: ", values);
    }

    const showModal = () => {
        setIsOpenUpdateBook(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpenUpdateBook(false);
        form.resetFields();
        setDataThumbnail([]);
        setDataSlider([]);
    };

    const handleChangeSelect = () => {

    }



    return (
        <>
            <Modal
                title="Cập nhật sách"
                open={isOpenUpdateBook}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                width={1000}
            >
                <Divider />
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 1000, margin: "0 auto", minWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='register-body__content'
                    form={form}
                >
                    <Row gutter={15}>
                        <Col span={12} >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='ID'
                                name="_id"
                                hidden
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Tên sách'
                                name="mainText"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
                            >
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Tác giả'
                                name="author"
                                rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Giá tiền'
                                name='price'
                                rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                            >
                                <InputNumber
                                    addonAfter="VND"
                                    min={1}
                                    style={{ width: "100%" }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Thể loại'
                                name="category"
                                rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
                            >
                                <Select
                                    defaultValue=""
                                    style={{ width: "100%" }}
                                    onChange={handleChangeSelect}
                                    options={listCategory}
                                    showSearch
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Số lượng'
                                name='quantity'
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                            >
                                <InputNumber min={1} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Đã bán'
                                name='sold'
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán!' }]}
                            >
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Ảnh thumbnail'
                                name='thumbnail'
                            >
                                <Upload
                                    customRequest={handleUploadFileThumbnail}
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    multiple={false}
                                    maxCount={1}
                                    onRemove={(file) => handleOnRemove(file, 'thumbnail')}
                                    defaultFileList={initForm?.thumbnail?.fileList ?? []}
                                >

                                    <button style={{ border: 0, background: 'none' }} type="button">

                                        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Ảnh slider'
                                name='slider'
                            >
                                <Upload
                                    customRequest={handleUploadFileSlider}
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    onRemove={(file) => handleOnRemove(file, 'slider')}
                                    defaultFileList={initForm?.slider?.fileList ?? []}
                                >
                                    {/* {slider.length >= 8 ? null : */}
                                    <button style={{ border: 0, background: 'none' }} type="button">

                                        {/* {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />} */}
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    );
};

export default UpdateBook;