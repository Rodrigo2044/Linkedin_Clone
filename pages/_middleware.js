import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// if someone has problems with the current version of middleware, it might help using relative paths. Because absolute paths are no longer allowed:

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  // console.log(origin);

  if (pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect(`${origin}/home`);
    // If user is authenticated, continue.
  }
}

// export async function middleware(req) {
//   if (req.nextUrl.pathname === '/') {
//     const session = await getToken({
//       req,
//       secret: process.env.JWT_SECRET,
//       secureCookie: process.env.NODE_ENV === 'production',
//     });
//     // You could also check for any property on the session object,
//     // like role === "admin" or name === "John Doe", etc.
//     if (!session) return NextResponse.redirect('/home');
//     // If user is authenticated, continue.
//   }
// }
