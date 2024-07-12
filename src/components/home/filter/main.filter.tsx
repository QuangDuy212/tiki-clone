'use client'
import { Button, Checkbox, Col, Divider, Form, InputNumber, Rate, Row } from 'antd';
import '../../../styles/home/filter/main.filter.scss';
import { IoFilter } from 'react-icons/io5';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';

interface IProps {
    categories: string[] | [];
}

const MainFilter = (props: IProps) => {

    const { categories } = props;
    //STATE:
    const [filter, setFilter] = useState("");

    //LIBRARY:
    const [form] = Form.useForm();
    // const navigate = useNavigate();

    //PROPS:
    // const [searchTerm, setSearchTerm] = useOutletContext();


    //METHODS:
    // useEffect(() => {
    //     const fetchCategory = async () => {
    //         const res = await callFetchCategory();
    //         if (res && res?.data) {
    //             let d = [];
    //             res.data.map(item => {
    //                 let b = { value: item, label: item }
    //                 d.push(b);
    //             })
    //             setListCategory(d);
    //         }
    //     }

    //     fetchCategory();
    // }, [])



    // useEffect(() => {
    //     fetchBook();
    // }, [current, pageSize, searchTerm, sortQuery, filter]);

    const onFinish = (values: any) => {
        // let query = "";
        // if (values?.range?.from > 0 && values?.range?.to > 0) {
        //     const l = values?.range?.from;
        //     const r = values?.range?.to;
        //     query += `&price>=${l}&&price<=${r}`;
        // }
        // if (values?.category) {
        //     if (values.category) {
        //         const cate = values.category;
        //         if (cate && cate.length > 0) {
        //             const f = cate.join(",");
        //             query += `&category=${f}`
        //         }
        //     }
        // }
        // setFilter(query);
    }
    const onFinishFailed = () => {

    }


    const handleChangeFilter = (changedValues: any, values: any) => {
        if (changedValues.category) {
            const cate = values.category;
            if (cate && cate.length > 0) {
                const f = cate.join(",");
                setFilter(`&category=${f}`)
            }
            else {
                setFilter("");
            }
        }
    }


    const nonAccentVietnamese = (str: string) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }




    return (
        <>
            <div className='filter'>
                <div className='filter__title'>
                    <span className='filter__title--icon'><IoFilter /></span>
                    <span className='filter__title--name'>Bộ lọc sản phẩm</span>
                    <Button className='filter__title--btn'><GrPowerReset
                        onClick={() => {
                            form.resetFields();
                            // setSearchTerm("") 
                        }} /></Button>
                </div>
                <div className='filter__body'>
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
                        form={form}
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
                                                <Checkbox
                                                    key={index}
                                                    value={item}
                                                    style={{ margin: "5px 0", fontSize: "15px" }}
                                                >
                                                    {item}
                                                </Checkbox>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Checkbox.Group>

                        </Form.Item>
                        <Divider />
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Khoảng giá"
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Form.Item
                                    name={['range', 'from']}
                                >
                                    <InputNumber
                                        name='from'
                                        min={0}
                                        placeholder='đ TỪ'
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                                <span>  -  </span>
                                <Form.Item
                                    name={['range', 'to']}
                                >
                                    <InputNumber
                                        name='to'
                                        min={0}
                                        placeholder='đ Đến'
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                            </div>
                        </Form.Item>
                        <Button
                            type='primary'
                            style={{ width: "100%" }}
                            onClick={() => form.submit()}
                        >Áp dụng</Button>
                        <Form.Item>
                            <div>
                                <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                            </div>
                            <div>
                                <Rate disabled defaultValue={4} style={{ fontSize: '12px' }} />
                                <span>trở lên</span>
                            </div>
                            <div>
                                <Rate disabled defaultValue={3} style={{ fontSize: '12px' }} />
                                <span>trở lên</span>
                            </div>
                            <div>
                                <Rate disabled defaultValue={2} style={{ fontSize: '12px' }} />
                                <span>trở lên</span>
                            </div>
                            <div>
                                <Rate disabled defaultValue={1} style={{ fontSize: '12px' }} />
                                <span>trở lên</span>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default MainFilter;