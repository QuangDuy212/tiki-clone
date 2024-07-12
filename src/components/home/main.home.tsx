'use client';
import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import {
    Button, Col, Form, Row, Checkbox,
    Divider, InputNumber, Rate, Card, Tabs,
    Pagination, Spin, Drawer,
    Image
} from 'antd';
import { useEffect, useState } from 'react';
import '../../styles/home/main.home.scss';
import { useRouter } from "next/navigation";
import MainFilter from "./filter/main.filter";
import { fetchListBookAction } from "src/utils/actions/home.actions";
import { revalidateTag } from "next/cache";
import { sendRequest } from "src/utils/api";

interface IProps {
    categories: string[] | [];
}

const { Meta } = Card;
const MainHome = (props: IProps) => {

    const { categories } = props;
    //STATE:
    const PAGE_SIZE = 8;
    const [listBook, setListBook] = useState<IBook[] | null>([]);
    const [current, setCurrent] = useState<number>(1);
    const [listCategory, setListCategory] = useState<string[] | null>([]);
    const [pageSize, setPageSize] = useState<number>(8);
    const [total, setTotal] = useState<number>(0);
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

    const [querySearch, setQuerySearch] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>(``);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");

    //LIBRARY:
    const [form] = Form.useForm();
    const router = useRouter();

    //PROPS:
    // const [searchTerm, setSearchTerm] = useOutletContext();


    //METHODS:
    useEffect(() => {
        const fetchCategory = async () => {
            if (categories)
                setListCategory(categories);
        }

        fetchCategory();
    }, [])



    useEffect(() => {
        fetchBook();
    }, [current, pageSize, sortQuery, filter]);

    const fetchBook = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${PAGE_SIZE}`;

        if (querySearch) {
            query += querySearch;
        }

        // if (searchTerm) {
        //     query += `&mainText=/${searchTerm}/i`;
        // }

        if (sortQuery) {
            query += sortQuery;
        }

        if (filter) {
            query += filter
        }
        const res = await sendRequest<IRes<IModelPaginate<IBook>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/book${query}`,
            method: "GET",
            nextOption: {
                next: { tags: ['get-list-book'] }
            }
        })
        if (res && res?.data) {
            console.log(">>> check query: ", query)
            console.log(">>> check res: ", res?.data?.result)
            setListBook(res?.data?.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleOnChangePage = (pagination: any) => {
        if (pagination && pagination.current !== current)
            setCurrent(pagination.current);
        if (pagination && pagination.pageSize !== pageSize) {
            setCurrent(1);
            setPageSize(pagination.pageSize);
        }

        //`dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== pageSize) {
            setListBook([]);
        }

        // if (sorter && sorter.field) {
        //     if (sorter.order == 'ascend') {
        //         setSortQuery(`&sort=${sorter.field}`)
        //     }

        //     if (sorter.order == 'descend') {
        //         setSortQuery(`&sort=-${sorter.field}`)
        //     }
        // }
    };

    const onFinish = (values: any) => {
        let query = "";
        if (values?.range?.from > 0 && values?.range?.to > 0) {
            const l = values?.range?.from;
            const r = values?.range?.to;
            query += `&price>=${l}&&price<=${r}`;
        }
        if (values?.category) {
            if (values.category) {
                const cate = values.category;
                if (cate && cate.length > 0) {
                    const f = cate.join(",");
                    query += `&category=${f}`
                }
            }
        }
        setFilter(query);
    }
    const onFinishFailed = () => {

    }

    const onChange = (checkedValues: string) => {
        if (checkedValues) setSortQuery(`${checkedValues}`)
    };

    const handleChangeFilter = (changedValues: any, values: any) => {
        // if (changedValues.category) {
        //     const cate = values.category;
        //     if (cate && cate.length > 0) {
        //         const f = cate.join(",");
        //         setFilter(`&category=${f}`)
        //     }
        //     else {
        //         setFilter("");
        //     }
        // }
    }

    const items = [
        {
            key: '&sort=-sold',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '&sort=-updatedAt',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: '&sort=price',
            label: 'Giá thấp đến cao',
            children: <></>,
        },
        {
            key: '&sort=-price',
            label: 'Giá cao đến thấp',
            children: <></>,
        },
    ];

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

    const convertSlug = (str: string) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const handleRedirectBook = (book: any) => {
        const slug = convertSlug(book.mainText);
        router.push(`/book/${slug}?id=${book._id}`)
    }


    return (
        <>
            <div className="main-home">
                <div className='container'>
                    <Row className='home' gutter={[18, 18]}>
                        <Col lg={5} md={0} sm={0} xs={0} >
                            <MainFilter categories={categories} />
                        </Col>
                        <Col lg={19} md={24} sm={24} xs={24}>
                            <Row>
                                <Col xl={0} lg={0} md={24} sm={24} xs={24}>
                                    <Button style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        type='primary'
                                        onClick={() => { setIsOpenFilter(true) }}
                                    >
                                        Bộ lọc
                                    </Button>
                                </Col>
                                <Col md={24}>
                                    <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
                                </Col>

                            </Row>
                            <Row gutter={[16, 16]}>
                                {listBook && listBook.length > 0 &&
                                    listBook.map((item, index) => {
                                        return (
                                            <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}
                                                key={index}
                                            >
                                                <Spin tip="Loading..." size="large" spinning={loading}>
                                                    <div className='book' onClick={() => handleRedirectBook(item)}>
                                                        <div
                                                            className='book__img'
                                                        >
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${item.thumbnail}`}
                                                            />
                                                        </div>
                                                        <div
                                                            className='book__title'
                                                            style={{ height: "60px" }}
                                                        >
                                                            {item.mainText}
                                                        </div>
                                                        <div className='book__price'>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                        </div>
                                                        <div
                                                            className='book__rate'
                                                        >
                                                            <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                                            <span>Đã bán {item.sold}</span>
                                                        </div>
                                                    </div>
                                                </Spin>
                                            </Col>

                                        )
                                    })
                                }
                            </Row>
                            <Divider />
                            <Pagination
                                current={current}
                                total={total}
                                pageSize={8}
                                onChange={(p, s) => handleOnChangePage({ current: p, pageSize: s })}
                                responsive
                                style={{
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}
                            />
                        </Col>
                    </Row >
                    {/* <Drawer title="Bộ lọc sản phẩm"
                    onClose={() => { setIsOpenFilter(false) }}
                    open={isOpenFilter}
                    width={"300px"}>
                    <div className='filter'>
                        <div className='filter__title'
                            style={{
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                            <Button className='filter__title--btn'
                                type='primary'
                            >
                                <GrPowerReset
                                    onClick={() => { form.resetFields(); setSearchTerm("") }} />
                            </Button>
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
                                        onChange={onChange}
                                    >
                                        <Row gutter={3}>
                                            {listCategory?.map((item, index) => {
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
                                    onClick={() => { form.submit(), setIsOpenFilter(false), form.resetFields() }}
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
                </Drawer> */}
                </div>
            </div>
        </>
    )
}

export default MainHome;