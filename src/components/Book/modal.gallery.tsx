
import { Button, Col, Modal, Row, Image } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ImageGallery from "react-image-gallery";
import '../../styles/book/modal.gallery.scss';

interface IImage {
    "original": string;
    "thumbnail": string;
    "originalClass": string;
    "thumbnailClass": string;
}
interface IProps {
    isOpenModalGallery: boolean;
    setIsOpenModalGallery: (v: boolean) => void;
    images: IImage[] | null;
    currentIndex: number;
}

const ModalGallery = (props: IProps) => {
    const { isOpenModalGallery, setIsOpenModalGallery, images, currentIndex } = props;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const refGalleryModal = useRef();

    useEffect(() => {
        if (isOpenModalGallery) {
            setActiveIndex(currentIndex);
        }
    }, [isOpenModalGallery, currentIndex])

    const handleCancel = () => {
        setIsOpenModalGallery(false);
    }

    const handleOnClickThumnail = (index: number) => {
        refGalleryModal?.current?.slideToIndex(index)
    }

    return (
        <>
            <Modal
                open={isOpenModalGallery}
                onCancel={handleCancel}
                width={"1000px"}
                closable={false}
                footer={<></>}
            >
                <Row gutter={[15, 15]} style={{ overflow: "hidden" }}>
                    <Col xl={16} md={24}>
                        <div className='image'>
                            <ImageGallery
                                items={images}
                                ref={refGalleryModal}
                                thumbnailPosition='right'
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showThumbnails={false}
                                startIndex={currentIndex}
                                width={100}
                                onSlide={(i: number) => setActiveIndex(i)}
                            />
                        </div>
                    </Col>
                    <Col xl={8} md={24}>
                        <Row gutter={[15, 15]}>
                            {images?.map((item, index) => {
                                return (
                                    <Col xl={8} md={24} key={`image-${index}`}>
                                        <div className={`thumbnail ${index === activeIndex ? "active" : ""} `}
                                        >
                                            <Image
                                                src={item.thumbnail}
                                                width={100}
                                                height={100}
                                                preview={false}
                                                onClick={() => { handleOnClickThumnail(index); setActiveIndex(index) }}
                                            />
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalGallery;