# 🚀 Sistema de Autenticación con Astro + Prisma + PostgreSQL en Supabase
## Usando correo electronico y contraseña

Un sistema de autenticación seguro y escalable construido con Astro, Prisma y PostgreSQL, diseñado para ser el punto de partida perfecto para cualquier aplicación que requiera autenticación de usuarios.

## 🌟 Características Principales

-   **Autenticación segura** con hash de contraseñas (bcrypt)
-   **Sesiones persistentes** con manejo seguro de cookies
-   **Sistema de roles** (admin/usuario)
-   **Panel de administración** para gestión de usuarios
-   **Diseño responsivo** que funciona en cualquier dispositivo
-   **Fácil de integrar** con cualquier frontend

---

## 🛠️ Tecnologías Utilizadas

-   **Frontend**: Astro 5.x
-   **Backend**: Astro API Routes
-   **Base de datos**: PostgreSQL
-   **ORM**: Prisma
-   **Autenticación**: JWT + Cookies HTTP-Only
-   **Estilos**: Tailwind CSS
-   **Validación**: Zod

---

## 🚀 Empezando

### Requisitos Previos

-   Node.js 18+
-   PostgreSQL 14+
-   pnpm (recomendado)

### Instalación

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/moralex74ve/Auth-prisma-astro.git
    cd auth-prisma-astro
    ```
2.  **Instalar dependencias**
    ```bash
    pnpm install
    ```
3.  **Configurar variables de entorno**
    Crea un archivo `.env` en la raíz del proyecto:

    **Para la conexión en supabase**
    ![connection chains](https://i.postimg.cc/c1vj6DDB/Supabase-connection.png)


    ```
    DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd?schema=public"
    DIRECT_URL="https://your-project.supabase.co"

    NODE_VERSION=22.17.0

    SESSION_SECRET="tu_clave_secreta_muy_larga_y_segura"
    ```
    **Para generar la clave secreta recomendamos usar la siguiente Pagina:**
     -  [JWT Secrets Generator](https://jwtsecrets.com/#generator)


4.  **Ejecutar migraciones**
    ```bash
    pnpm prisma migrate dev --name init
    ```
5.  **Crear usuario administrador**
    ```bash
    pnpm run seed
    ```
    Esto creará un usuario administrador con las siguientes credenciales:
    -   **Email:** `admin@ejemplo.com`
    -   **Contraseña:** `admin123`

    > **Importante:** Cambia estas credenciales después del primer inicio de sesión.

### Iniciar el servidor de desarrollo

```bash
pnpm run dev
```



## 📊 Estructura de la Base de Datos

### Modelo de Usuarios (SQL)

```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  clave VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'usuario',
  activo BOOLEAN NOT NULL DEFAULT true,
  ultimo_login TIMESTAMP(6),
  creado_en TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
---
## Beneficios de la Autenticación
### Seguridad Mejorada
- Contraseñas hasheadas con bcrypt
- Cookies HTTP-Only y Secure
- Protección contra CSRF
- Rate limiting integrado
### Fácil de Mantener
- Código modular y bien organizado
- Validación de datos con Zod
- Tipado estático con TypeScript
### Diseño Escalable
- Diseñado para manejar miles de usuarios
- Fácil de integrar con microservicios
- Base de datos optimizada para rendimiento

### Experiencia de Desarrollo
- Hot Module Replacement (HMR)
- Migraciones de base de datos fáciles
- Scripts útiles incluidos

## 📱 Gestión de Usuarios
El sistema incluye un panel de administración completo para gestionar usuarios, permitiendo:

- Ver lista de usuarios
- Crear nuevos usuarios
- Editar usuarios existentes
- Cambiar roles
- Activar/desactivar cuentas

## 🛠️ Scripts Disponibles
* pnpm run dev: Inicia el servidor de desarrollo
* pnpm run build: Construye la aplicación para producción
* pnpm run preview: Previsualiza la versión de producción
* pnpm run seed: Crea el usuario administrador por defecto
* pnpm prisma studio: Abre el cliente visual de Prisma

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
