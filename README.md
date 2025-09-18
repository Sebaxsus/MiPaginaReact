# PaginaAnimes-Back

A RESTful API and server for the MiPaginaReact client, managing anime and manga data, authentication, and business logic. Built with Node.js and Express, using MVC architecture.

## Features

- REST API for anime and manga resources
- JWT authentication and authorization
- Modular MVC structure (Models, Controllers, Routes)
- Input validation and error handling with middleware
- SQL database integration (see `PaginaMangasYAnime.sql`)
- Unit and integration tests with Jest
- Utilities for data handling and custom logic
- Mocking for robust test coverage

## Folder Structure

```
.
├── app.js                  # Main application entry point
├── jest.config.js          # Jest test configuration
├── PaginaMangasYAnime.sql  # Database schema and seed
│
├── Back/
│   ├── Models/             # Database models
│   ├── Controllers/        # Business logic/controllers
│   ├── Routes/             # API route definitions
│   ├── Middleware/         # Authentication, error, and validation middleware
│   ├── Schemas/            # Data validation schemas (e.g. Joi)
│   ├── Utils/              # Utility functions/helpers
│   ├── Auth/               # Authentication logic (JWT, login, register)
│   ├── __mocks__/Models/   # Model mocks for testing
│
├── Pruebas_API/            # API test scripts/examples
├── Test/                   # Automated tests (Jest)
```

## Getting Started

### Que son los Tokens Basic y Bearer

> [!NOTE]
> Tipos de Token en OAuth2
>
> Basic:
>      Es una cadena de Texto (String) codificado en Base64 HEX que contiene
>      usuario:contraseña, Se usa para la autenticación (Inicio de Sesión)
>      , No debe usarse para el acceso de recursos protegidos en OAuth2
>      Ya que este tipo de token puede ser interceptado en transito y decodificado
>      Es el método Antiguo de Auth en OAuth, Su propósito es de uso en 
>      Esquemas de autenticación de credenciales Simples.
>
> Bearer:
>      Es una cadena de texto (String) Opaca mas Conocido como JSON Web Token (JWT)
>      Es un token encriptado con técnicas de Criptografía comúnmente la Técnica
>      de [Cifrado de Flujo de Clave Encadenada](https://es.wikipedia.org/wiki/Modos_de_operaci%C3%B3n_de_una_unidad_de_cifrado_por_bloques#:~:text=puntos%20de%20experiencia.-,Modo%20CBC%20(Cipher%2Dblock%20chaining),inicializaci%C3%B3n%20en%20el%20primer%20bloque.&text=CBC%20es%20el%20modo%20usado,no%20puede%20funcionar%20en%20paralelo.)
>      Se usa el Termino "Bearer" por su significado "Portador" Que implica que
>      el poseedor de el token puede acceder a recursos Asegurados,
>      Dentro de el Token si es un JWT puede estar información util como
>      ID de Usuario, Rol o Permisos; Asi evitando consultas innecesarias
>      A la BD.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running SQL database (see SQL file for schema)

### Installation

```bash
git clone https://github.com/Sebaxsus/PaginaAnimes-Back.git
cd PaginaAnimes-Back
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your database and secret values.

### Database Setup

1. Create the database using the provided SQL script:
   ```bash
   # In your SQL client:
   source PaginaMangasYAnime.sql
   ```
2. Configure your `.env` to match your DB credentials.

### Running the Server

```bash
npm start
```
or (for nodemon/dev)
```bash
npm run dev
```

Server will start on the port defined in `.env` or default (e.g., 3000).

### Running Tests

```bash
npm test
```

## API Overview

See the [routes](./app/Routes) and [controllers](./app/Controllers) for available endpoints and request/response structure.

## Contributing

Pull requests and issues are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).  
See the [LICENSE](./LICENSE) file for more details.

---

For questions or support, open an issue!