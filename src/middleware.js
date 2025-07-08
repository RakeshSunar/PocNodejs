import { NextResponse } from "next/server";
import { getSession } from "../utils/getSession";

export async function middleware(request) {
    console.log("middleware is running!");
    const session = await getSession();
    const userNavigatingRoute = request.nextUrl.pathname;
    console.log({ userNavigatingRoute, session},"userNavigatingRoute");

    // Define public routes that don't require authentication
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.includes(userNavigatingRoute);
    // console.log(session,"session from middleware")
    // If user is not authenticated
    if (!session) {
        // Allow access to public routes (login, register)
        if (isPublicRoute) {
            // console.log("Allowing access to public route");
            return NextResponse.next();
        }
        // Redirect to login for protected routes
        // console.log("Redirecting to login - no session");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user is authenticated
    if (session) {
        // console.log("if sess route", userNavigatingRoute)
        // Redirect authenticated users away from auth pages
        if (isPublicRoute) {
            // console.log("Redirecting authenticated user from auth page");
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        // Allow access to protected routes
        // console.log("Allowing access to protected route");
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};


// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const PUBLIC_ROUTES = ['/login', '/register'];

// export async function middleware(request) {
//     debugger
//   const token = request.cookies.get('token')?.value;
//   const { pathname } = request.nextUrl;

//   const isPublic = PUBLIC_ROUTES.includes(pathname);

//   if (!token) {
//     // Unauthenticated
//     if (isPublic) return NextResponse.next();
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET); // MUST match your backend secret
//     await jwtVerify(token, secret);

//     // Authenticated
//     if (isPublic) return NextResponse.redirect(new URL('/', request.url));
//     return NextResponse.next();
//   } catch (err) {
//     console.error("Invalid or expired token:", err);
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/', '/login', '/register'],
// };
