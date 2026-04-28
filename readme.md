# 🚀 Guía de instalación y ejecución del proyecto

## Requisitos previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

---

## Pasos para correr el proyecto

### 1. Instalar dependencias

```bash
npm install
```

---

### 2. Levantar los servicios con Docker

```bash
docker compose up -d
```

Esto levantará los contenedores en segundo plano. Una vez arriba, **detén el contenedor de MongoDB** desde Docker Desktop (o con el comando de abajo) y deja corriendo únicamente **Redis**.

```bash
docker stop <nombre-del-contenedor-mongodb>
```

> 💡 Puedes ver el nombre exacto del contenedor con `docker ps`.

---

### 3. Configurar la base de datos en MongoDB

1. Abre **MongoDB Compass**
2. Conéctate usando la siguiente URI:

```
mongodb://localhost:27017
```

3. Crea una base de datos llamada **`test`**

---

### 4. Restaurar los datos de la base de datos

```bash
npm run restore
```

Este comando restaura automáticamente todas las colecciones y datos de prueba en la base de datos. ✨

---

### 5. Ejecutar el proyecto

```bash
npm run dev
```

---

## Resumen rápido

| Paso | Comando |
|------|---------|
| Instalar dependencias | `npm install` |
| Levantar Docker | `docker compose up -d` |
| Apagar MongoDB en Docker | `docker stop <contenedor-mongo>` |
| Conectar a MongoDB Compass | `mongodb://localhost:27017` |
| Crear base de datos | `test` |
| Restaurar datos | `npm run restore` |
| Ejecutar el proyecto | `npm run dev` |