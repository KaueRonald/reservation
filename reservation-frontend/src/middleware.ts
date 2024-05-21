import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const SingInURL = new URL('/login', request.url)
    const ServicoURL = new URL('/servicos', request.url)

    if (!token) {
        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/register') {
            return NextResponse.next()
        }
        return NextResponse.redirect(SingInURL)
    }

    if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(ServicoURL);
    } else if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(ServicoURL);
    } else if (request.nextUrl.pathname === '/register') {
        return NextResponse.redirect(ServicoURL);
    }


}

export const config = {
    matcher: ['/', '/login', '/register', '/user/perfil', '/user/agendamentos', '/user/servicos']
}