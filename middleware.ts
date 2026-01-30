import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    let path = req.nextUrl.pathname;

    if (path === '/') {
        return NextResponse.redirect(new URL('/company', req.url))
    }
    return NextResponse.next()
}