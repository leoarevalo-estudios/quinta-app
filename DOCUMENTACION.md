# 📚 Documentación - Quinta App

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requerimientos](#requerimientos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración e Instalación](#configuración-e-instalación)
- [Modelos de Datos](#modelos-de-datos)
- [Rutas y API](#rutas-y-api)
- [Componentes](#componentes)
- [Autenticación](#autenticación)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Deploy](#deploy)

---

## 🏠 Descripción General

**Quinta App** es una plataforma web moderna para la gestión y alquiler de quintas (casas de campo). Permite a propietarios listar sus propiedades y a inquilinos explorar, filtrar y reservar quintas disponibles.

### Características Principales

- ✅ Autenticación de usuarios con NextAuth.js
- ✅ Gestión de perfiles (Propietarios e Inquilinos)
- ✅ Catálogo de quintas con búsqueda y filtros
- ✅ Sistema de reservas
- ✅ Notificaciones en tiempo real
- ✅ Recuperación de contraseña por email
- ✅ Panel de administración para propietarios
- ✅ Responsive y optimizado para móviles

---

## � Requerimientos

### Requerimientos Funcionales (RF)

#### Autenticación y Usuarios

| ID | Descripción | Prioridad | Estado |
|----|----|----------|--------|
| RF-01 | Registrar usuario (inquilino/propietario) | Alta | ✅ Implementado |
| RF-02 | Login con email y contraseña | Alta | ✅ Implementado |
| RF-03 | Logout del sistema | Alta | ✅ Implementado |
| RF-04 | Recuperar contraseña por email | Alta | ✅ Implementado |
| RF-05 | Reset de contraseña con token | Alta | ✅ Implementado |
| RF-06 | Validación de sesión JWT | Alta | ✅ Implementado |
| RF-07 | Editar perfil de usuario | Media | ✅ Implementado |
| RF-08 | Cambiar contraseña | Media | ⏳ Pendiente |

#### Gestión de Quintas

| ID | Descripción | Prioridad | Estado |
|----|----|----------|--------|
| RF-09 | Crear nueva quinta (propietario) | Alta | ✅ Implementado |
| RF-10 | Editar quinta propia (propietario) | Alta | ✅ Implementado |
| RF-11 | Eliminar quinta (propietario) | Alta | ✅ Implementado |
| RF-12 | Listar todas las quintas públicas | Alta | ✅ Implementado |
| RF-13 | Ver detalles de una quinta | Alta | ✅ Implementado |
| RF-14 | Filtrar quintas por ubicación | Media | ✅ Implementado |
| RF-15 | Filtrar quintas por precio | Media | ✅ Implementado |
| RF-16 | Filtrar quintas por capacidad | Media | ✅ Implementado |
| RF-17 | Buscar quintas por nombre/descripción | Media | ⏳ Pendiente |
| RF-18 | Mostrar amenities de quinta | Media | ✅ Implementado |

#### Sistema de Reservas

| ID | Descripción | Prioridad | Estado |
|----|----|----------|--------|
| RF-19 | Crear nueva reserva | Alta | ✅ Implementado |
| RF-20 | Ver mis reservas (inquilino) | Alta | ✅ Implementado |
| RF-21 | Ver reservas de mis quintas (propietario) | Alta | ✅ Implementado |
| RF-22 | Cancelar reserva | Alta | ✅ Implementado |
| RF-23 | Confirmar reserva (propietario) | Media | ✅ Implementado |
| RF-24 | Rechazar reserva (propietario) | Media | ⏳ Pendiente |
| RF-25 | Validar disponibilidad de fechas | Alta | ⏳ Pendiente |
| RF-26 | Calcular precio total de reserva | Media | ⏳ Pendiente |

#### Notificaciones

| ID | Descripción | Prioridad | Estado |
|----|----|----------|--------|
| RF-27 | Enviar notificación en nueva reserva | Media | ✅ Implementado |
| RF-28 | Enviar notificación de cambio de estado | Media | ✅ Implementado |
| RF-29 | Listar notificaciones del usuario | Media | ✅ Implementado |
| RF-30 | Marcar notificación como leída | Media | ✅ Implementado |
| RF-31 | Eliminar notificación | Baja | ⏳ Pendiente |
| RF-32 | Notificaciones por email | Media | ⏳ Pendiente |

### Requerimientos No-Funcionales (RNF)

#### Performance

| ID | Descripción | Métrica |
|----|----|----|
| RNF-01 | Tiempo de carga inicial | < 3 segundos |
| RNF-02 | Tiempo de respuesta API | < 500ms (p95) |
| RNF-03 | Optimización de imágenes | WebP, lazy loading |
| RNF-04 | Caché de datos | Redis/Browser cache |
| RNF-05 | Minificación de assets | CSS, JS comprimidos |

#### Seguridad

| ID | Descripción | Implementación |
|----|----|----|
| RNF-06 | Encriptación de contraseñas | bcryptjs |
| RNF-07 | HTTPS obligatorio | Certificado SSL |
| RNF-08 | Validación de entrada | Server-side validation |
| RNF-09 | Protección CSRF | NextAuth tokens |
| RNF-10 | Rate limiting | API endpoints |
| RNF-11 | CORS configurado | Dominios permitidos |
| RNF-12 | SQL Injection prevention | Prisma ORM |
| RNF-13 | XSS protection | React sanitization |

#### Escalabilidad

| ID | Descripción | Solución |
|----|----|----|
| RNF-14 | Soporte para N usuarios concurrentes | Load balancing |
| RNF-15 | Base de datos escalable | Turso/SQLite |
| RNF-16 | Static generation | Next.js ISR |
| RNF-17 | CDN para assets | Vercel/CloudFlare |

#### Usabilidad

| ID | Descripción | Criterio |
|----|----|----|
| RNF-18 | Responsive design | Mobile-first |
| RNF-19 | Accesibilidad WCAG 2.1 | Level AA |
| RNF-20 | Navegación intuitiva | IA/UX best practices |
| RNF-21 | Mensajes de error claros | Feedback al usuario |
| RNF-22 | Soporte de idiomas | i18n ready |

#### Compatibilidad

| ID | Descripción | Navegadores |
|----|----|----|
| RNF-23 | Navegadores soportados | Chrome, Firefox, Safari, Edge (últimas 2 versiones) |
| RNF-24 | Mobile responsivo | iOS, Android |
| RNF-25 | Versión mínima Node.js | 18.0.0 |

### Requerimientos de Usuario (RU)

#### Usuario Inquilino

| Caso de Uso | Descripción |
|------------|-----------|
| **RU-01: Buscar Quintas** | Como inquilino, puedo buscar y filtrar quintas disponibles para encontrar la ideal |
| **RU-02: Ver Detalles** | Como inquilino, puedo ver detalles, fotos y amenities de una quinta |
| **RU-03: Hacer Reserva** | Como inquilino, puedo reservar una quinta para fechas específicas |
| **RU-04: Ver mis Reservas** | Como inquilino, puedo ver todas mis reservas activas y pasadas |
| **RU-05: Cancelar Reserva** | Como inquilino, puedo cancelar una reserva pendiente de confirmación |
| **RU-06: Recibir Notificaciones** | Como inquilino, recibo notificaciones de cambios en mis reservas |
| **RU-07: Editar Perfil** | Como inquilino, puedo actualizar mis datos personales |

#### Usuario Propietario

| Caso de Uso | Descripción |
|------------|-----------|
| **RU-08: Crear Quinta** | Como propietario, puedo crear una nueva quinta con descripción y precios |
| **RU-09: Editar Quinta** | Como propietario, puedo modificar información de mis quintas |
| **RU-10: Eliminar Quinta** | Como propietario, puedo eliminar una quinta de mi catálogo |
| **RU-11: Ver Reservas** | Como propietario, puedo ver todas las reservas de mis quintas |
| **RU-12: Confirmar Reserva** | Como propietario, puedo confirmar una reserva recibida |
| **RU-13: Rechazar Reserva** | Como propietario, puedo rechazar una reserva con motivo |
| **RU-14: Dashboard** | Como propietario, tengo un dashboard con estadísticas de reservas |
| **RU-15: Reporte de Ingresos** | Como propietario, puedo ver un reporte de ingresos por período |

### Matriz de Trazabilidad

```
RF-01 (Registrar) → RU-01, RU-08
RF-02 (Login) → RU-01, RU-08
RF-09 (Crear Quinta) → RU-08
RF-19 (Crear Reserva) → RU-03
RF-20 (Ver Reservas) → RU-04, RU-11
RF-27 (Notificaciones) → RU-06
```

### Criterios de Aceptación

#### CA-01: Registro de Usuario
- [ ] Usuario puede registrarse con email, nombre y contraseña
- [ ] Email debe ser único
- [ ] Contraseña debe tener mínimo 8 caracteres
- [ ] Seleccionar rol (inquilino/propietario)
- [ ] Confirmar términos y condiciones
- [ ] Recibir email de confirmación

#### CA-02: Crear Reserva
- [ ] Solo usuarios logueados pueden reservar
- [ ] Validar que la fecha sea futura
- [ ] Validar que la cantidad de personas no exceda capacidad
- [ ] Mostrar precio total estimado
- [ ] Confirmar reserva
- [ ] Generar confirmación por email

#### CA-03: Filtrar Quintas
- [ ] Filtro por ubicación funcional
- [ ] Filtro por rango de precio (min-max)
- [ ] Filtro por capacidad
- [ ] Aplicar múltiples filtros simultáneamente
- [ ] Mostrar cantidad de resultados

---



### Frontend
- **Next.js 16.2.6** - Framework React con SSR
- **React 19.2.4** - Librería de UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Utilidades CSS
- **PostCSS 4** - Procesamiento de CSS

### Backend
- **Node.js** - Runtime de JavaScript
- **Next.js API Routes** - Endpoints API
- **NextAuth.js 5** - Autenticación JWT
- **Prisma 5.22** - ORM para base de datos

### Base de Datos
- **SQLite** - Base de datos con Prisma
- **Turso/LibSQL** - Adaptador SQLite moderno

### Utilidades
- **bcryptjs** - Hash de contraseñas
- **ESLint 9** - Linting de código

---

## 📂 Estructura del Proyecto

```
quinta-app/
├── app/                          # App directory de Next.js (App Router)
│   ├── page.tsx                  # Página principal
│   ├── layout.tsx                # Layout global
│   ├── globals.css               # Estilos globales
│   ├── api/                      # Rutas API
│   │   ├── auth/[...nextauth]/   # Configuración NextAuth
│   │   ├── mis-quintas/          # API quintas del propietario
│   │   ├── notificaciones/       # API notificaciones
│   │   ├── perfil/               # API perfil de usuario
│   │   ├── quintas/              # API quintas públicas
│   │   ├── recuperar-password/   # API recuperación de contraseña
│   │   ├── register/             # API registro de usuarios
│   │   ├── reservas/             # API reservas
│   │   └── reset-password/       # API reset de contraseña
│   ├── buscar/                   # Página de búsqueda
│   ├── login/                    # Página de login
│   ├── registro/                 # Página de registro
│   ├── mi-cuenta/                # Panel de usuario
│   ├── mi-quinta/                # Gestión de quinta del propietario
│   ├── mis-reservas/             # Panel de reservas del usuario
│   ├── quintas/                  # Páginas públicas de quintas
│   │   ├── [id]/                 # Detalle de quinta
│   │   │   └── editar/           # Edición de quinta (propietario)
│   │   └── nueva/                # Crear nueva quinta
│   └── recuperar-password/       # Flujo de recuperación
├── components/                   # Componentes React reutilizables
│   ├── Navbar.tsx                # Navegación
│   ├── Hero.tsx                  # Sección hero
│   ├── Footer.tsx                # Pie de página
│   ├── QuintasGrid.tsx           # Cuadrícula de quintas
│   ├── ComoFunciona.tsx          # Explicación del funcionamiento
│   ├── CtaPropietarios.tsx       # Call-to-action para propietarios
│   ├── Stats.tsx                 # Estadísticas
│   ├── Notificaciones.tsx        # Panel de notificaciones
│   └── Providers.tsx             # Providers de React (contextos)
├── lib/                          # Utilidades y configuraciones
│   ├── auth.ts                   # Configuración NextAuth
│   └── prisma.ts                 # Cliente Prisma
├── prisma/                       # Configuración y migraciones
│   ├── schema.prisma             # Esquema de base de datos
│   └── migrations/               # Migraciones de Prisma
├── public/                       # Archivos públicos (imágenes, iconos)
├── next.config.ts                # Configuración de Next.js
├── tsconfig.json                 # Configuración TypeScript
├── eslint.config.mjs             # Configuración ESLint
├── package.json                  # Dependencias del proyecto
├── postcss.config.mjs            # Configuración PostCSS
└── README.md                     # Readme del proyecto
```

---

## 🚀 Configuración e Instalación

### Requisitos Previos

- Node.js 18+ y npm/yarn/pnpm
- Git
- Editor de código (VSCode recomendado)

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd quinta-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env.local con:
DATABASE_URL="file:./dev.db"  # o tu conexión a Turso
NEXTAUTH_SECRET="tu-secreto-seguro"
NEXTAUTH_URL="http://localhost:3000"

# 4. Ejecutar migraciones de Prisma
npx prisma migrate dev

# 5. Iniciar servidor de desarrollo
npm run dev

# 6. Abrir en navegador
# Acceder a http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo (puerto 3000)
npm run build        # Construye para producción
npm start            # Inicia servidor de producción
npm run lint         # Valida código con ESLint
npx prisma studio   # Abre interfaz gráfica de Prisma
npx prisma migrate  # Ejecuta migraciones pendientes
```

---

## 🗄️ Modelos de Datos

### Diagrama ER

```
User (1) ──────────── (M) Quinta
                    └─ propietarioId

Quinta (1) ───────────── (M) Reserva

User (1) ───────────── (M) Reserva
User (1) ───────────── (M) Notificacion
```

### Tablas

#### **User** - Usuarios del sistema

```prisma
model User {
  id              Int
  nombre          String
  email           String (único)
  telefono        String (opcional)
  password        String
  rol             String (inquilino | propietario)
  createdAt       DateTime

  quintas         Quinta[]        # Quintas que posee
  reservas        Reserva[]       # Reservas realizadas
  notificaciones  Notificacion[]  # Notificaciones recibidas
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int | ID único (autoincremental) |
| `nombre` | String | Nombre completo |
| `email` | String | Email único |
| `telefono` | String? | Teléfono opcional |
| `password` | String | Contraseña hasheada |
| `rol` | String | "inquilino" o "propietario" |
| `createdAt` | DateTime | Fecha de creación |

#### **Quinta** - Propiedades en alquiler

```prisma
model Quinta {
  id            Int
  nombre        String
  descripcion   String
  ubicacion     String
  precio        Float
  capacidad     Int
  amenities     String
  emoji         String
  createdAt     DateTime

  propietarioId Int
  propietario   User      # Usuario propietario
  reservas      Reserva[] # Reservas de esta quinta
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int | ID único |
| `nombre` | String | Nombre de la propiedad |
| `descripcion` | String | Descripción detallada |
| `ubicacion` | String | Ubicación/dirección |
| `precio` | Float | Precio por noche |
| `capacidad` | Int | Cantidad máxima de personas |
| `amenities` | String | Servicios disponibles (JSON o string) |
| `emoji` | String | Emoji representativo |
| `propietarioId` | Int | ID del propietario |

#### **Reserva** - Booking de quintas

```prisma
model Reserva {
  id        Int
  fecha     String      # Formato: YYYY-MM-DD
  personas  Int
  estado    String      # pendiente | confirmada | cancelada
  createdAt DateTime

  quintaId  Int
  quinta    Quinta
  usuarioId Int
  usuario   User
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int | ID único |
| `fecha` | String | Fecha de check-in |
| `personas` | Int | Cantidad de personas |
| `estado` | String | Estado de la reserva |
| `quintaId` | Int | Quinta reservada |
| `usuarioId` | Int | Usuario que hace la reserva |

#### **Notificacion** - Sistema de alertas

```prisma
model Notificacion {
  id        Int
  mensaje   String
  leida     Boolean
  createdAt DateTime

  usuarioId Int
  usuario   User
}
```

#### **TokenRecuperacion** - Recuperación de contraseña

```prisma
model TokenRecuperacion {
  id      Int
  token   String (único)
  email   String
  expira  DateTime
  usado   Boolean
  createdAt DateTime
}
```

---

## 🔌 Rutas y API

### Autenticación

#### `POST /api/auth/signin`
- **Descripción:** Login de usuario
- **Middleware:** NextAuth
- **Parámetros:** `{ email, password }`
- **Respuesta:** Token JWT en sesión

#### `GET /api/auth/signout`
- **Descripción:** Logout
- **Middleware:** NextAuth

#### `POST /api/register`
- **Descripción:** Registro de nuevo usuario
- **Parámetros:** `{ nombre, email, password, telefono?, rol }`
- **Respuesta:** `{ id, email, nombre }`

### Quintas

#### `GET /api/quintas`
- **Descripción:** Obtener todas las quintas públicas
- **Query params:** `?ubicacion=&precio_min=&precio_max=&capacidad=`
- **Respuesta:** Array de quintas

#### `GET /api/quintas/[id]`
- **Descripción:** Obtener detalles de una quinta
- **Parámetros:** ID de la quinta
- **Respuesta:** Objeto quinta con propietario

#### `POST /api/quintas`
- **Autenticación:** Requerida
- **Rol:** propietario
- **Descripción:** Crear nueva quinta
- **Parámetros:** `{ nombre, descripcion, ubicacion, precio, capacidad, amenities }`
- **Respuesta:** Quinta creada

#### `PUT /api/quintas/[id]`
- **Autenticación:** Requerida
- **Rol:** propietario
- **Descripción:** Actualizar quinta
- **Respuesta:** Quinta actualizada

### Mis Quintas (Propietario)

#### `GET /api/mis-quintas`
- **Autenticación:** Requerida
- **Descripción:** Obtener quintas del propietario logueado
- **Respuesta:** Array de quintas del usuario

#### `DELETE /api/quintas/[id]`
- **Autenticación:** Requerida
- **Descripción:** Eliminar quinta
- **Respuesta:** Confirmación

### Reservas

#### `GET /api/reservas`
- **Autenticación:** Requerida
- **Descripción:** Obtener reservas del usuario
- **Respuesta:** Array de reservas

#### `POST /api/reservas`
- **Autenticación:** Requerida
- **Descripción:** Crear reserva
- **Parámetros:** `{ quintaId, fecha, personas }`
- **Respuesta:** Reserva creada

#### `PUT /api/reservas/[id]`
- **Autenticación:** Requerida
- **Descripción:** Actualizar estado de reserva
- **Parámetros:** `{ estado }`
- **Respuesta:** Reserva actualizada

#### `DELETE /api/reservas/[id]`
- **Autenticación:** Requerida
- **Descripción:** Cancelar reserva
- **Respuesta:** Confirmación

### Notificaciones

#### `GET /api/notificaciones`
- **Autenticación:** Requerida
- **Descripción:** Obtener notificaciones del usuario
- **Respuesta:** Array de notificaciones

#### `PUT /api/notificaciones/[id]`
- **Autenticación:** Requerida
- **Descripción:** Marcar notificación como leída
- **Respuesta:** Notificación actualizada

### Perfil

#### `GET /api/perfil`
- **Autenticación:** Requerida
- **Descripción:** Obtener datos del usuario logueado
- **Respuesta:** Objeto usuario

#### `PUT /api/perfil`
- **Autenticación:** Requerida
- **Descripción:** Actualizar perfil
- **Parámetros:** `{ nombre, telefono, email }`
- **Respuesta:** Usuario actualizado

### Recuperación de Contraseña

#### `POST /api/recuperar-password`
- **Descripción:** Solicitar reset de contraseña
- **Parámetros:** `{ email }`
- **Respuesta:** `{ mensaje: "Email enviado" }`

#### `POST /api/reset-password`
- **Descripción:** Resetear contraseña con token
- **Parámetros:** `{ token, nuevaPassword }`
- **Respuesta:** `{ mensaje: "Contraseña actualizada" }`

---

## 🎨 Componentes

### Componentes Principales

#### **Navbar**
- **Ubicación:** `components/Navbar.tsx`
- **Props:** Ninguno
- **Descripción:** Barra de navegación con logo, menú y autenticación
- **Características:** Responsive, dropdowns, links a rutas principales

#### **Hero**
- **Ubicación:** `components/Hero.tsx`
- **Descripción:** Sección hero de landing page
- **Contenido:** Título, descripción, CTA principal

#### **QuintasGrid**
- **Ubicación:** `components/QuintasGrid.tsx`
- **Descripción:** Grilla de quintas con cards
- **Props:** `quintas: Quinta[]`, `onFilter: Function`
- **Características:** Filtros, buscar, sorting

#### **Footer**
- **Ubicación:** `components/Footer.tsx`
- **Descripción:** Pie de página con links y información

#### **Notificaciones**
- **Ubicación:** `components/Notificaciones.tsx`
- **Descripción:** Panel de notificaciones del usuario
- **Características:** Listar, marcar como leído, eliminar

#### **Providers**
- **Ubicación:** `components/Providers.tsx`
- **Descripción:** Proveedores globales (SessionProvider, etc.)

---

## 🔐 Autenticación

### Configuración NextAuth.js

**Archivo:** `lib/auth.ts`

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"  // JWT tokens
  },
  providers: [
    Credentials({     // Email/Password
      credentials: { email, password }
    })
  ],
  callbacks: {
    jwt: { ... }      // Personalizar JWT
    session: { ... }  // Personalizar sesión
  }
})
```

### Flujo de Autenticación

1. **Registro:** Usuario se registra en `/registro`
2. **Login:** Usuario ingresa en `/login` con email/password
3. **JWT:** NextAuth genera token JWT y lo almacena en sesión
4. **Verificación:** Rutas protegidas verifican token con `auth()`
5. **Logout:** Sesión se limpia en `/api/auth/signout`

### Proteger Rutas

```typescript
import { auth } from "@/lib/auth";

// En API Route
export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  // ... tu código
}

// En página/componente
import { auth } from "@/lib/auth";

export default async function MiCuenta() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  // ... mostrar contenido
}
```

### Acceder Datos de Usuario

```typescript
const session = await auth();
const usuario = session?.user;

// Propiedades disponibles
usuario?.id
usuario?.email
usuario?.name      // nombre
usuario?.telefono
usuario?.role      // rol (inquilino/propietario)
```

---

## 💻 Guía de Desarrollo

### Estructura de Carpetas - Mejores Prácticas

```
# Componentes en pages/ruta
app/nueva-pagina/
├── page.tsx       # Componente de página
└── layout.tsx     # Layout específico (opcional)

# API Endpoints
app/api/recurso/
├── route.ts       # GET, POST, etc.
└── [id]/
    └── route.ts   # Con parámetro dinámico
```

### Crear Nueva Página

```typescript
// app/nueva-pagina/page.tsx
import { auth } from "@/lib/auth";

export default async function NewPage() {
  const session = await auth();
  
  return (
    <main className="container mx-auto p-4">
      <h1>Nueva Página</h1>
    </main>
  );
}
```

### Crear Nuevo API Route

```typescript
// app/api/nuevo-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.model.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const body = await req.json();
  // Tu lógica aquí
  
  return NextResponse.json(data, { status: 201 });
}
```

### Usar Base de Datos

```typescript
import { prisma } from "@/lib/prisma";

// Crear
const user = await prisma.user.create({
  data: { nombre, email, password }
});

// Leer
const user = await prisma.user.findUnique({
  where: { email },
  include: { quintas: true }
});

// Actualizar
await prisma.user.update({
  where: { id },
  data: { nombre }
});

// Eliminar
await prisma.user.delete({
  where: { id }
});
```

### Estilos con Tailwind

```typescript
// Usar clases de Tailwind directamente
<div className="flex gap-4 bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-2xl font-bold text-white">Título</h1>
</div>
```

### Debugging

```bash
# Ver logs de Prisma
DEBUG=prisma* npm run dev

# Interfaz gráfica de Prisma
npx prisma studio

# VSCode Debug
# Ver .vscode/launch.json para configuración
```

---

## 🚢 Deploy

### Opciones de Deploy

#### **Vercel (Recomendado)**

```bash
# 1. Conectar repositorio a Vercel
# En vercel.com, importar proyecto

# 2. Variables de entorno en Vercel Dashboard
DATABASE_URL=        # Tu BD (Turso/SQLite)
NEXTAUTH_SECRET=     # Generar con: openssl rand -base64 32
NEXTAUTH_URL=        # https://tu-dominio.com

# 3. Deploy automático al hacer push a main
git push origin main
```

#### **Deploy Manual (VPS/Heroku)**

```bash
# 1. Build
npm run build

# 2. Instalar dependencias en producción
npm install --production

# 3. Ejecutar
NODE_ENV=production npm start

# 4. Puerto
# App estará en http://localhost:3000
# Usar nginx/Apache como reverse proxy
```

### Checklist Pre-Deploy

- [ ] Configurar `NEXTAUTH_SECRET` (no usar default)
- [ ] Actualizar `NEXTAUTH_URL` a tu dominio
- [ ] Configurar DB remota (Turso, etc.)
- [ ] Ejecutar migraciones en producción
- [ ] HTTPS habilitado
- [ ] Variables de entorno configuradas
- [ ] Backup de base de datos
- [ ] Tests pasados

### Migraciones en Producción

```bash
# Aplicar migraciones pendientes
npx prisma migrate deploy
```

---

## 🐛 Troubleshooting

### Error: "No se puede volver a declarar variable"
**Causa:** Duplicación de declarations en archivos
**Solución:** Verificar imports y exports duplicados

### Error: "Database connection failed"
**Causa:** `DATABASE_URL` incorrecta o BD no accesible
**Solución:** Verificar variable de entorno y conexión

### Error: "NextAuth undefined"
**Causa:** Session no inicializada en Providers
**Solución:** Asegurar que `SessionProvider` envuelve la app

### Puerto 3000 en uso
```bash
# Usar puerto diferente
PORT=3001 npm run dev
```

---

## 📞 Soporte y Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Última actualización:** 2026-07-03  
**Versión:** 0.1.0
