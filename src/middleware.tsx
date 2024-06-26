import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/manageadmin") && request.nextauth.token?.role !== "superadmin") {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/managecashier") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/managemembership") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/manageproduct") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/transaction") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/report") && request.nextauth.token?.role !== "superadmin" && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard", "/manageadmin", "/managecashier", "/managemembership", "/manageproduct", "/transaction", "/report"],
};
