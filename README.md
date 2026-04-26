# Javeriana Lead & Events Manager

SPA para que el equipo de mercadeo de la Pontificia Universidad Javeriana visualice oferta académica simulada y registre nuevos interesados o leads.

## 2. El Reto: "Javeriana Lead & Events Manager"

El objetivo fue construir una aplicación de una sola página que permita visualizar eventos/programas académicos y gestionar el registro de interesados.

### Requerimientos Funcionales

1. **Visualización de Datos**  
   Se consume JSONPlaceholder desde `src/api/jsonPlaceholderApi.ts`. La transformación a programas académicos se hace en `src/services/programsService.ts` y se muestran cards reutilizables con `ProgramCard` y `ProgramList`.

2. **Filtrado Avanzado**  
   Se implementó búsqueda por texto y filtro por categoría: `Pregrado`, `Posgrado` y `Educación Continua`. La lógica vive en `filterPrograms.ts` y se usa desde `useProgramFilters` con `useMemo`.

3. **Captura de Leads**  
   El formulario está dentro de un modal y usa React Hook Form. Valida nombre, email, formato de email, programa seleccionado y recomienda el dominio `@javeriana.edu.co`. Antes de guardar, normaliza espacios, capitaliza nombre y convierte email a minúsculas.

4. **Persistencia**  
   Los leads se guardan en `localStorage` mediante `leadsStorageService`. Los componentes no acceden directamente al storage; lo hacen a través de `useLeads` y `LeadsContext`.

## 3. Stack Tecnológico Requerido

- **Framework:** React.js con Vite.
- **Lenguaje:** TypeScript estricto, con tipos e interfaces y sin uso de `any`.
- **Estilos:** Tailwind CSS v4, diseño responsive e institucional.
- **Gestión de Estado:** Context API para leads registrados.
- **Formularios:** React Hook Form.
- **API REST:** JSONPlaceholder.
- **Persistencia:** localStorage.

## 4. Criterios de Evaluación

- **Arquitectura:** Carpetas separadas por responsabilidad: `api`, `services`, `hooks`, `context`, `helpers`, `types`, `components` y `pages`.
- **Dominio de TypeScript:** Interfaces dedicadas para programas y leads; validación de respuestas externas usando `unknown` y type guards.
- **Calidad de Código:** Componentes reutilizables, HTML semántico, lógica de negocio fuera del JSX y asincronía con `async/await`.
- **Performance:** Filtros memorizados con `useMemo`, handlers con `useCallback` y componentes separados para reducir renders innecesarios.

## Arquitectura del proyecto

```txt
src/
├── api/
│   └── jsonPlaceholderApi.ts
├── services/
│   ├── programsService.ts
│   └── leadsStorageService.ts
├── hooks/
│   ├── usePrograms.ts
│   ├── useProgramFilters.ts
│   ├── useLeads.ts
│   └── useModal.ts
├── context/
│   └── LeadsContext.tsx
├── helpers/
│   ├── normalizeLead.ts
│   ├── filterPrograms.ts
│   └── formatText.ts
├── types/
│   ├── program.types.ts
│   └── lead.types.ts
├── components/
│   ├── layout/
│   ├── programs/
│   ├── leads/
│   ├── ui/
│   └── filters/
├── pages/
│   └── HomePage.tsx
├── App.tsx
└── main.tsx
```

## Funcionalidades implementadas

- Cards responsive de programas académicos.
- Búsqueda y filtros sin recargar la página.
- Modal de inscripción.
- Validaciones con React Hook Form.
- Normalización de datos antes de guardar.
- Persistencia de leads en localStorage.
- Tabla de leads registrados.
- Eliminación de leads.
- Modo oscuro formal.
- Estados de carga, error y vacío.
- Tests unitarios básicos para helpers.

## Comandos para ejecutar en local

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar pruebas:

```bash
npm run test
```

Generar build de producción:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

## Comandos para ejecutar con Docker

Construir la imagen:

```bash
docker build -t javeriana-lead-events-manager .
```

Ejecutar el contenedor:

```bash
docker run --rm -p 8080:8080 --name javeriana-leads javeriana-lead-events-manager
```

Abrir la aplicación:

```txt
http://localhost:8080
```

Detener el contenedor si se ejecuta en segundo plano:

```bash
docker stop javeriana-leads
```

## Deployment

Aplicación desplegada en Render: `https://prueba-tecnica-javeriana.onrender.com`

## Recomendaciones finales

- Publicar el proyecto en Vercel, Netlify o Render.
- Actualizar el link real de deployment en este README.
- Añadir edición de leads como mejora futura.
- Agregar más tests de componentes para formulario, modal y tabla.
