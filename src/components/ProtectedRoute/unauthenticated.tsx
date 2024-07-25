'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const Unauthenticated = () => {
    const router = useRouter();
    return (
        <Result
            status="500"
            title="401"
            subTitle="Sorry, you haven't signin."
            extra={<Button type="primary" onClick={() => router.push("/auth/signin")}>Login</Button>}
        />
    );
}

export default Unauthenticated;