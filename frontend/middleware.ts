import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const checkAuthenticatedCookie = req.cookies.get("AUTHENTICATED_TOKEN");
  const url = req.url;

  if (
    checkAuthenticatedCookie &&
    (url.includes("/sign-in") || url.includes("/sign-up"))
  ) {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
