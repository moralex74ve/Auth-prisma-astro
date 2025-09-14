import type { MiddlewareHandler } from 'astro';

// Rutas que requieren rol de administrador
const adminRoutes = ['/users'];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, cookies, redirect } = context;

  // DEBUG: Imprimir la ruta actual
  console.log(`[Middleware] Pathname: ${url.pathname}`);

  const onAdminRoute = adminRoutes.some(route => url.pathname === route || url.pathname.startsWith(route + '/'));

  // DEBUG: Imprimir si la ruta es considerada de admin
  console.log(`[Middleware] Is Admin Route? ${onAdminRoute}`);

  // Si la ruta actual está en las rutas de admin
  if (onAdminRoute) {
    const session = cookies.get('session');
    const userCookie = cookies.get('user');

    // 1. Verificar si el usuario está logueado
    if (!session) {
      return redirect('/login');
    }

    // 2. Verificar si es admin
    if (!userCookie) {
      return redirect('/dashboard?error=unauthorized');
    }

    try {
      const user = JSON.parse(userCookie.value);
      if (user.rol !== 'admin') {
        return redirect('/dashboard?error=unauthorized');
      }
    } catch (e) {
      // Si la cookie está malformada, denegar acceso
      return redirect('/dashboard?error=unauthorized');
    }
  }

  // Si no es una ruta de admin o si pasó todas las verificaciones, continuar.
  return next();
};
