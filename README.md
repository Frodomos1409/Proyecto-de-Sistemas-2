# 🐾 Adopción API - PostgreSQL + MongoDB

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, y conexión dual a bases de datos **PostgreSQL** (relacional) y **MongoDB** (no relacional).

La API gestiona:
- Animales
- Adopciones
- Evaluaciones médicas
- Transferencias
- Usuarios
- Rescatistas

---

## 📁 Estructura de Carpetas

```
├── config/               # Configuración de PostgreSQL y MongoDB
├── controllers/          # Controladores divididos por base de datos
│   ├── animal/
│   │   ├── pgAnimalController.js
│   │   ├── mongoAnimalController.js
│   │   └── index.js
│   └── ...
├── models/               # Modelos Sequelize y Mongoose
│   ├── postgres/
│   └── mongo/
├── routes/               # Rutas por módulo + index.js centralizador
├── .env                  # Variables de entorno
├── server.js             # Punto de entrada de la API
└── README.md             # Este archivo
```

---

## ⚙️ Variables de entorno (`.env`)

```
PORT=5000
JWT_SECRET=supersecreto

# MongoDB
MONGO_URI=mongodb://localhost:27017/adopcion

# PostgreSQL
PG_DB_NAME=adopcion_db
PG_DB_USER=postgres
PG_DB_PASSWORD=admin
PG_DB_HOST=localhost
PG_DB_PORT=5432
```

---

## 🚀 Instalación y Ejecución

1. **Clonar el proyecto:**
```bash
git clone https://github.com/tuusuario/adopcion-api.git
cd adopcion-api
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar base de datos:**
- MongoDB debe estar corriendo localmente (`MONGO_URI`)
- PostgreSQL debe estar accesible y tener la base creada (`PG_DB_NAME`)

4. **Ejecutar el servidor:**
```bash
npm run dev
# o
node server.js
```

---

## 📡 Endpoints disponibles (base: `/api/`)

- `/animales` → CRUD de animales y relación con rescatistas
- `/adoptions` → CRUD de adopciones
- `/evaluations` → CRUD de evaluaciones médicas
- `/transfers` → CRUD de traslados
- `/users` → CRUD de usuarios
- `/rescatistas` → CRUD de rescatistas

Todos los endpoints interactúan con **ambas bases de datos en paralelo**.

---

## ✅ Ejemplo de respuesta `/api/animales`
```json
{
  "postgres": [ { "id": 1, "nombre": "León", ... } ],
  "mongo": [ { "_id": "661f...", "nombre": "León", ... } ]
}
```

---

## 👨‍💻 Autor

Desarrollado por Ecuipo.

---

## 🧪 Próximos pasos
- Middleware de autenticación JWT
- Subida de imágenes
- Documentación Swagger

---

¡Gracias por usar esta API! 💚
