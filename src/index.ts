// src/index.ts
import "reflect-metadata"; // [IMPORTANTE]: DEBE SER LA PRIMERA LÍNEA
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./container";
import express from "express";

// Crear servidor con el contenedor configurado
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(express.json()); // Parsear JSON
    // Aquí puedes agregar cors, helmet, morgan, etc.
});

const app = server.build();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});