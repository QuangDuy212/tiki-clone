'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';

interface IProps {
    fetchBook: (v: string) => void;
    setQuerySearch: (v: string) => void;
}

const SearchBook = (props: IProps) => {
    const handleSearch = (query: string) => {
        props.fetchBook(query);
    }
    const MyFormItemContext = React.createContext([]);

    function toArr(str: string) {
        return Array.isArray(str) ? str : [str];
    }

    const MyFormItemGroup = ({ prefix, children }: { prefix: any, children: any }) => {
        const prefixPath = React.useContext(MyFormItemContext);
        const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

        return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
    };

    const MyFormItem = ({ name, ...props }) => {
        const prefixPath = React.useContext(MyFormItemContext);
        const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

        return <Form.Item name={concatName} {...props} />;
    };
    const onFinish = (value: any) => {
        let query = "";
        if (value.book.author) {
            query += `&author=/${value.book.author}/i`;
        }
        if (value.book.mainText) {
            query += `&mainText=/${value.book.mainText}/i`;
        }
        if (value.book.category) {
            query += `&category=/${value.book.category}/i`;
        }
        if (query) {
            props.setQuerySearch(query);
            handleSearch(query);
        }
    };

    const handleClear = () => {
        let inputClear = document.getElementById("form_item_path_id").reset();
    }

    return (
        <>
            <Form n
                ame="form_item_path" layout="vertical" onFinish={onFinish}
                id='form_item_path_id'>
                <MyFormItemGroup prefix={['book']}>
                    <MyFormItem name="mainText" label="Tên sách">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="author" label="Tên tác giả">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="category" label="Thể loại">
                        <Input />
                    </MyFormItem>


                </MyFormItemGroup>
                <div style={{ textAlign: "right" }} className='search-btn'>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button type='default'
                        onClick={() => handleClear()}
                    >Clear</Button>
                </div>
            </Form>
        </>
    )
}
export default SearchBook;