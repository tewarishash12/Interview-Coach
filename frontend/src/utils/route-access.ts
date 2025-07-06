export const privateRoutes = ['/resume', '/resume-upload', '/generate-questions', '/interview'];
export const publicRoutes = ['/login', '/register', '/verify-email'];
export const sharedRoutes = ['/'];

export const isPrivateRoute = (pathname: string) =>
    privateRoutes.some(route => pathname.startsWith(route));

export const isPublicRoute = (pathname: string) =>
    publicRoutes.some(route => pathname.startsWith(route));

export const isSharedRoute = (pathname: string) =>
    sharedRoutes.includes(pathname);