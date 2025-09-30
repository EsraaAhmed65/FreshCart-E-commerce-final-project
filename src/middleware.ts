import next from 'next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({req: request})
  const {pathname} = request.nextUrl
  const authPage = ["/login", "/register", "/resetPassword","/forgetPassword","/verifyCode"]
  const routes = ["/", "/brands", "/categories", "/cart", "/productDetails", "/products", "/wishlist", "/payment", "/allorders"
    ]

if (!token && routes.includes(pathname)) {
  return NextResponse.redirect(new URL('/login', request.url))
}

if (token && authPage.includes(pathname)) {
  return NextResponse.redirect(new URL('/', request.url))
}


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgetPassword',
    '/resetPassword',
    '/verifyCode',
    '/cart/:path*',
    '/wishlist/:path*',
    '/products/:path*',
    '/categories/:path*',
    '/brands/:path*',
    '/productDetails/:path*',
    '/payment/:path*',
    '/allorders/:path*',

  ],
}

