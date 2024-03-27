import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let checkAthenticatedCookie = req.cookies.get("LOGGED_IN_TOKEN");
  let url = req.url;

  if (checkAthenticatedCookie && url.includes("/sign-in")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
