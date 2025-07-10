import { NextResponse } from "next/server";
import { getSession } from "../utils/getSession";

export async function middleware(request) {
    const session = await getSession();
    const userNavigatingRoute = request.nextUrl.pathname;

    // Define public routes that don't require authentication
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.includes(userNavigatingRoute);
    // If user is not authenticated
    if (!session) {
        // Allow access to public routes (login, register)
        if (isPublicRoute) {
            return NextResponse.next();
        }
        // Redirect to login for protected routes
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user is authenticated
    if (session) {
        // Redirect authenticated users away from auth pages
        if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        // Allow access to protected routes
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};

