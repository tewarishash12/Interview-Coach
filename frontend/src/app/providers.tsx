'use client';
import { Provider } from 'react-redux';
import store from '@/store/index';
import AuthHydrator from '@/components/AuthHydrator';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthHydrator>
                {children}
            </AuthHydrator>
        </Provider>);
}
