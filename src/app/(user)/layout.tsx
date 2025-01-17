import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppFooter from "src/components/Footer/app.footer";
import AppHeader from "src/components/Header/app.header";
import { ProtectedRoute } from "src/components/ProtectedRoute/protected.route";
import AntdStyledComponentsRegistry from "src/lib/AntdStyledComponentsRegistry ";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiki-Mua hàng online giá tốt, hàng chuẩn, ship nhanh",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
      <AppFooter />
    </>
  );
}
