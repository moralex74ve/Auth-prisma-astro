// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

if (process.env.NODE_ENV === 'production') {
    console.error('Este script no debe ejecutarse en producción');
    process.exit(1);
  }


async function seed() {
  // Verificar si ya existe un administrador
  const adminExists = await prisma.usuarios.findFirst({
    where: { rol: 'admin' }
  });

  if (adminExists) {
    console.log('Ya existe un usuario administrador');
    return;
  }

  // Crear usuario administrador por defecto
  const hashedPassword = await hash('admin123', 10); // Cambia esta contraseña
  await prisma.usuarios.create({
    data: {
      nombre: 'Administrador',
      correo: 'admin@ejemplo.com',
      clave: hashedPassword,
      rol: 'admin',
      activo: true
    }
  });

  console.log('Usuario administrador creado exitosamente');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
