import LayoutAdmin from "src/components/Admin/Layout/layout.admin";

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