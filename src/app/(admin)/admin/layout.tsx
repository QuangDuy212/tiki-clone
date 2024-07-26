import { Metadata } from "next";
import LayoutAdmin from "src/components/Admin/Layout/layout.admin";
export const metadata: Metadata = {
    title: "Trang quản trị | Tiki",
    description: "Designed by Duy Nguyễn",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <LayoutAdmin>
                {children}
            </LayoutAdmin>
        </>
    )
};

export default RootLayout;