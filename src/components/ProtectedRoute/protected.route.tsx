'use client'
import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";
import { useSession } from "next-auth/react";
import Unauthenticated from "./unauthenticated";

const RoleBaseRoute = ({ children }: { children: React.ReactNode }) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const { data: session } = useSession();

    const userRole = session?.user.role

    if (isAdminRoute && userRole === "ADMIN" ||
        !isAdminRoute && (userRole === 'USER' || userRole === 'ADMIN')
    ) {
        return (<>{children}</>)
    }
    return <NotPermitted />

}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const isAuthenticated = session?.user.id
    return (
        <>
            {isAuthenticated
                ?
                <>{children}</>
                :
                <Unauthenticated />
            }
        </>
    )
}

export { RoleBaseRoute, ProtectedRoute }