import React from 'react';
import { Button, Form, Input } from 'antd';
import '../../../../styles/admin/user/searchuser/search.user.scss'

interface IProps {
    setCurrent: (v: number) => void;
    fetchUser: () => void;
    setIsSearch: (v: boolean) => void;
    setQuerySearch: (v: string) => void;
}

const SearchUser = (props: IProps) => {
    const handleSearch = (query: string) => {
        props.setCurrent(1);
        props.fetchUser();
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
        if (value.user.fullName) {
            query += `&fullName=/${value.user.fullName}/i`;
        }
        if (value.user.email) {
            query += `&email=/${value.user.email}/i`;
        }
        if (value.user.phone) {
            query += `&phone=/${value.user.phone}/i`;
        }
        if (query) {
            props.setIsSearch(true);
            props.setQuerySearch(query);
            handleSearch(query);
        }
    };

    const handleClear = () => {
        props.setIsSearch(false);
        let inputClear = document.getElementById("form_item_path_id").reset();
    }

    return (
        <>
            <Form
                name="form_item_path" layout="vertical" onFinish={onFinish}
                id='form_item_path_id'>
                <MyFormItemGroup prefix={['user']}>
                    <MyFormItem name="fullName" label="Name">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="email" label="Email">
                        <Input />
                    </MyFormItem>

                    <MyFormItem name="phone" label="Phone">
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
export default SearchUser;