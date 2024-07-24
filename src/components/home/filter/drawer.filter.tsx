'use client'
import { Drawer } from "antd"
import { Button, Checkbox, Col, Divider, Form, InputNumber, Rate, Row } from 'antd';
import '../../../styles/home/filter/drawer.filter.scss';
import { IoFilter } from 'react-icons/io5';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';

interface IProps {
    categories: string[] | [];
    setFilter: (v: string) => void;
    setIsOpenFilter: (v: boolean) => void;
    isOpenFilter: boolean;
}

const DrawerFilter = (props: IProps) => {
    //PROPS: 
    const { categories, setFilter, setIsOpenFilter, isOpenFilter } = props;
    //STATE:
    const [query, setQuery] = useState<string>("");
    //LIBRARY:
    const [form1] = Form.useForm();
    //METHODS: 
    const onFinish = (values: any) => {
        let tmp = "";
        if (values?.range?.from > 0 && values?.range?.to > 0) {
            const l = values?.range?.from;
            const r = values?.range?.to;
            tmp += `&price>=${l}&&price<=${r}`;
        }
        if (values?.category) {
            if (values.category) {
                const cate = values.category;
                if (cate && cate.length > 0) {
                    const f = cate.join(",");
                    tmp += `&category=${f}`
                }
            }
        }
        if (query) {
            tmp += query;
        }

        setFilter(tmp);
        setIsOpenFilter(false)
    }
    const onFinishFailed = () => {

    }


    const handleChangeFilter = (changedValues: any, values: any) => {
        if (changedValues.category) {
            const cate = values.category;
            if (cate && cate.length > 0) {
                const f = cate.join(",");
                setQuery(`&category=${f}`)
            }
            else {
                setQuery("");
            }
        }
    }
    return (
        <>
            <Drawer title="Bộ lọc sản phẩm"
                onClose={() => { setIsOpenFilter(false) }}
                open={isOpenFilter}
                width={"300px"}>
                <div className='filter1'>
                    <div className='filter1__title'>
                        <span className='filter1__title--icon'><IoFilter /></span>
                        <span className='filter1__title--name'>Bộ lọc sản phẩm</span>
                        <Button className='filter1__title--btn'><GrPowerReset
                            onClick={() => {
                                form1.resetFields();
                                setFilter("");
                                setQuery("");
                                console.log(">>> cick")
                                // setSearchTerm("") 
                            }} /></Button>
                    </div>
                    <div className='filter1__body'>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                            form={form1}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Danh mục sản phẩm"
                                name="category"
                            >
                                <Checkbox.Group
                                    style={{ width: '100%', display: "flex", justifyContent: "center" }}
                                // onChange={onChange}
                                >
                                    <Row gutter={3}>
                                        {categories?.map((item, index) => {
                                            return (
                                                <Col span={24} key={`category-${index}`}>
                                                    <div style={{ width: "100%" }}>
                                                        <Checkbox
                                                            key={index}
                                                            value={item}
                                                            style={{ margin: "5px 0", fontSize: "15px" }}
                                                        >
                                                            {item}
                                                        </Checkbox>
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Checkbox.Group>

                            </Form.Item>
                            <Divider style={{ margin: "10px 0" }} />
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Giá"
                            >
                                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Form.Item
                                        name={['range', 'from']}
                                        style={{ width: '100%', height: 20 }}
                                        labelCol={{ span: 4 }}
                                    >
                                        <InputNumber
                                            name='from'
                                            min={0}
                                            placeholder='Từ'
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={['range', 'to']}
                                        style={{ width: '100%', height: 20 }}
                                        labelCol={{ span: 4 }}
                                    >
                                        <InputNumber
                                            name='to'
                                            min={0}
                                            placeholder='Đến'
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Button
                                type='primary'
                                style={{ width: "100%" }}
                                onClick={() => form1.submit()}
                            >Áp dụng</Button>

                        </Form>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
export default DrawerFilter;