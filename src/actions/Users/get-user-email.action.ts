import { defineAction } from "astro:actions";
import { prisma } from "../../db";
import { z } from "astro:schema";
import bcrypt from "bcrypt";

export const getUsersEmail = defineAction({
  accept: "form",
  input: z.object({
    correo: z.string().email(),
    clave: z.string(),
  }),
  handler: async ({ correo, clave }, { cookies }) => {
    console.log("Intentando login con:", correo);
    try {
      const user = await prisma.usuarios.findUnique({
        where: {
          correo: correo,
        },
      });

      if (!user) {
        return {
          status: 404,
          body: {
            message: "Usuario no encontrado"
          }
        };
      }

      // Verificar si el usuario está activo
      if (!user.activo) {
        return {
          status: 403,
          body: {
            message: "Usuario desactivado. Contacte al administrador."
          }
        };
      }

      const isPasswordValid = await bcrypt.compare(clave, user.clave);
      if (!isPasswordValid) {
        return {
          status: 401,
          body: {
            message: "Contraseña incorrecta"
          }
        };
      }

      // Actualizar último login
      await prisma.usuarios.update({
        where: { id: user.id },
        data: { 
          ultimo_login: new Date()
        }
      });

      // Crear una cookie de sesión
      const sessionId = createSession(user.id.toString());
      
      // Establecer la cookie de sesión directamente aquí
      cookies.set("session", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 horas
      });

      // Establecer la cookie de usuario
      cookies.set("user", JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
        activo: user.activo,
        ultimo_login: user.ultimo_login
      }), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 horas
      });

      return {
        status: 200,
        body: {
          message: "Login exitoso",
          session: sessionId,
          user: {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol,
            activo: user.activo,
            ultimo_login: user.ultimo_login
          }
        }
      };
    } catch (error) {
      console.error("Error durante el login:", error);
      return {
        status: 500,
        body: {
          message: "Error interno del servidor"
        }
      };
    }
  },
});

function createSession(userId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${userId}-${timestamp}-${random}`;
}
