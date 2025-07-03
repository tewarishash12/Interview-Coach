'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/global-components/Navbar';
import Footer from '@/global-components/Footer';

const HIDDEN_PATHS = ['/login', '/register'];

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (HIDDEN_PATHS.includes(pathname))
        return <>
            {children};
        </>

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )

}
