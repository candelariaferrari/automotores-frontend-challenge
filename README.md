# automotores-frontend-challenge
challenge para mindfactory

Aplicación frontend desarrollada en Angular para la gestión de automotores, permitiendo listar, crear, editar y eliminar registros, con validaciones de negocio y simulación de backend mediante JSON Server.

---

## Tecnologías utilizadas

- Angular
- TypeScript
- RxJS
- Angular Material
- JSON Server (mock backend)

---

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone <TU_REPO_URL>
cd automotores-app 

2. Instalar dependencias
npm install

3. Levantar mock API 
 npm run mock
disponible en: http://localhost3000

4. Levantar frontend 
ng serve
disponible en: http://localhost:4200

Funcionalidades: 
- Listado de automotores
- Búsqueda por dominio y CUIT
- Alta de automotor
- Edición de automotor
- Eliminación
- Autocompletado de dueño por CUIT
- Creación de sujeto si el CUIT no existe

Validaciones:
- Dominio: AAA999 o AA999AA
- Fecha fabricación: formato YYYYMM, mes válido, no futuro
- CUIT: requerido (validación completa opcional)

Decisiones técnicas:
- Se utilizó JSON Server para simular backend
- Se implementó capa de servicios para desacoplar lógica
- Se priorizó funcionalidad completa antes que optimizaciones avanzadas
- Validación de existencia de CUIT separada de validación de formato
