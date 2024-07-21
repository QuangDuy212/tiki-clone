
import { Button, Modal, Table, Image } from 'antd';
import { useEffect, useState } from 'react';
import { callGetBookById } from 'src/services/api';

interface IProps {
    isOpenDetail: boolean;
    setIsOpenDetail: (v: boolean) => void;
    dataDetail: IBookDetail[];
}

const ModalDetail = (props: IProps) => {
    const { isOpenDetail, setIsOpenDetail, dataDetail } = props;


    const [data, setData] = useState<IBook[] | undefined>([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            width: '10%',
            render: (thumbnail: string) => {
                return (
                    <div >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${thumbnail}`}
                        />
                    </div>
                )
            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            width: '50%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '20%',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            width: '20%',
        },
    ];

    const fetchBookById = async () => {
        const listId = dataDetail?.map(i => i._id);
        var listBook: IBook[] | undefined = await Promise.all(listId.map(async (item): Promise<IBook | undefined> => {
            const book = await callGetBookById(item);
            return book.data;
        }));
        setData(listBook);
    }
    useEffect(() => {
        fetchBookById()
    }, [dataDetail]);
    return (
        <>
            <Modal
                title="Xem chi tiết lịch sử"
                centered
                open={isOpenDetail}
                onOk={() => setIsOpenDetail(false)}
                onCancel={() => { setIsOpenDetail(false) }}
                width={1000}

            >
                <Table
                    columns={columns}
                    rowKey={(record) => record._id}
                    dataSource={data}
                    loading={loading}
                    pagination={false}
                />
            </Modal>
        </>
    )
}

export default ModalDetail;