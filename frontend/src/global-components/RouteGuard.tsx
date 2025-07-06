'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isPrivateRoute, isPublicRoute } from '@/utils/route-access';
import { useAppSelector } from '@/store';

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (!pathname) return;

        if (isPrivateRoute(pathname) && !isAuthenticated) {
            router.replace('/login');
        } else if (isPublicRoute(pathname) && isAuthenticated) {
            router.replace('/');
        }
        // SharedRoutes are allowed for all
    }, [pathname, isAuthenticated, router]);

    return <>{children}</>;
};