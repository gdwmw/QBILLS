import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/superadmin") && request.nextauth.token?.role !== "superadmin") {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== "superadmin" &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/manageaccount") &&
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
      request.nextUrl.pathname.startsWith("/membership") &&
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
  matcher: ["/superadmin", "/dashboard", "/manageaccount", "/manageproduct", "/membership", "/transaction", "/report"],
};
