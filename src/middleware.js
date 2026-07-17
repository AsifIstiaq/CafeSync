import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const userCookie = request.cookies.get("user");

  // PUBLIC ROUTES
  const publicRoutes = [
    "/login",
    "/register",
    "/admin/login",
    "/admin/register",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // CUSTOMER ROUTES

  const customerRoutes = [
    "/menu",
    "/orders",
    "/notifications",
    "/membership",
    "/subscriptions",
    "/feedback",
    "/reservation",
    "/my-reservations",
    "/tables",
    "/reviews",
  ];

  if (customerRoutes.some((route) => pathname.startsWith(route))) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = JSON.parse(userCookie.value);

    if (user.role.toLowerCase() !== "customer") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // ADMIN ROUTES

  if (pathname.startsWith("/admin")) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const user = JSON.parse(userCookie.value);

    if (user.role.toLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/menu", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/menu/:path*",
    "/orders/:path*",
    "/notifications/:path*",
    "/membership/:path*",
    "/subscriptions/:path*",
    "/feedback/:path*",
    "/reservation/:path*",
    "/my-reservations/:path*",
    "/tables/:path*",
    "/reviews/:path*",
    "/admin/:path*",
  ],
};
