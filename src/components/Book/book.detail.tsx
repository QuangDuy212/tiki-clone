'use client'
import { Button, Col, Row, Rate, InputNumber, message } from 'antd';
import ImageGallery from "react-image-gallery";
import { useRef, useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { doAddBookAction } from 'src/lib/features/order/orderSlice';
import { useRouter } from 'next/navigation'
import '../../styles/book/book.detail.scss'
import ModalGallery from './modal.gallery';
import { useClientMediaQuery } from 'src/utils/isMobile';

interface IImage {
    "original": string;
    "thumbnail": string;
    "originalClass": string;
    "thumbnailClass": string;
}

interface IProps {
    dataBook: IBook | undefined;
    image: IImage[] | null;
}

const BookDetail = (props: IProps) => {
    // LIBRARY:
    const dispatch = useDispatch();
    const router = useRouter()
    const isMobile = useClientMediaQuery('(max-width: 1000px)')

    //PROPS:
    const { dataBook, image } = props;
    //STATE: 
    const [isOpenModalGallery, setIsOpenModalGallery] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);

    const refGallery = useRef(null);



    // METHODS:
    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    }
    const onChange = (value: number | null) => {
        if (value)
            setCurrentQuantity(value);
    };

    const handleAddToCart = (quantity: number, book: IBook | undefined) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book?._id }));
    }

    const handleBuyNow = (quantity: number, book: IBook | undefined) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book?._id }));
        router.push("/checkout");
    }

    return (
        <>
            <div className='container-view-detail' style={isMobile ? { paddingTop: "80px" } : {}}>
                <div className='container' >
                    <div className='content'>
                        <Row gutter={[20, 20]}>
                            <Col xl={10} md={24} sm={24} xs={24}>
                                <div style={{
                                    backgroundColor: "#fff", borderRadius: "5px",
                                    overflow: "hidden"
                                }}>
                                    < ImageGallery
                                        ref={refGallery}
                                        items={image}
                                        showFullscreenButton={false}
                                        showNav={false}
                                        showPlayButton={false}
                                        slideOnThumbnailOver={true}
                                        onClick={() => handleOnClickImage()}
                                    />
                                </div>
                            </Col>
                            <Col xl={14} md={24} sm={24} xs={24}>
                                <div className='viewdetail__info' style={{ backgroundColor: "#fff", borderRadius: "5px" }}>
                                    <div className='viewdetail__info--name'>{dataBook?.mainText}</div>
                                    <div className='viewdetail__info--author'>Tác giả: {dataBook?.author}</div>
                                    <div className='viewdetail__info--rate'><Rate disabled defaultValue={5} /> Đã bán {dataBook?.sold}</div>
                                    <div className='viewdetail__info--price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price ?? 0)}
                                    </div>
                                    <div className='viewdetail__info--transport'>
                                        <span className='text1'>Vận chuyển </span>
                                        <span className='text2'>
                                            <span>Miễn phí vận chuyển</span>
                                        </span>
                                    </div>
                                    <div className='viewdetail__info--quantity'>
                                        <span className='text1'>Số lượng</span>

                                        <InputNumber
                                            min={1} max={dataBook?.quantity}
                                            defaultValue={1}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className='viewdetail__info--btn'>
                                        <Row gutter={[20, 20]}>
                                            <Col xl={14} md={14} sm={24} xs={24}>
                                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Button
                                                        type='primary'
                                                        className='add'
                                                        onClick={() => handleAddToCart(currentQuantity, dataBook)}
                                                    >
                                                        <FaCartPlus style={{ margin: "0 5px 0 0", fontSize: "20px" }} />
                                                        Thêm vào giỏ hàng
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col xl={10} md={10} sm={24} xs={24}>
                                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Button
                                                        className='buy'
                                                        onClick={() => handleBuyNow(currentQuantity, dataBook)}
                                                    >Mua ngay</Button>
                                                </div>
                                            </Col>
                                        </Row>


                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div >
                <ModalGallery
                    isOpenModalGallery={isOpenModalGallery}
                    setIsOpenModalGallery={setIsOpenModalGallery}
                    currentIndex={currentIndex}
                    images={image}
                />


            </div>
        </>
    )
}

export default BookDetail;