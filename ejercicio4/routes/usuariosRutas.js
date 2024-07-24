const express = require('express');
const ruta = express.Router();
const Usuario = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");  // Asegúrate de importar UsuarioBD

// Ruta - agregar usuario
ruta.post("/agregarUsuario", (req, res) => {
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined) {
        res.render("error");
    } else {
        res.render("usuariosVista", usuario1.obtenerDatos);
    }
});

// Ruta - mostrar el formulario de agregar usuario
ruta.get("/agregarUsuario", (req, res) => {
    res.render("formulario");
});

// Ruta - mostrar todos los usuarios
ruta.get("/", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuariosBD = await usuariobd.mostrarUsuario();
        console.log(usuariosBD);
        res.render("mostrarUsuario", { usuariosBD });
    } catch (error) {
        console.error("error al recuperar los usuarios " + error);
        res.render("error");
    }
});

// Ruta - agregar un usuario a la base de datos
ruta.post("/agregarUsuario", (req, res) => {
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined) {
        res.render("error");
    } else {
        const usuariobd = new UsuarioBD();
        usuariobd.crearUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

// Ruta - mostrar el formulario de agregar usuario (duplicada, puedes eliminarla si ya está)
ruta.get("/agregarusuario", (req, res) => {
    res.render("formulario");
});

// Ruta - editar un usuario
ruta.get("/editarUsuario/:id", async (req, res) => {
    const usuariobd = new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
    res.render("editarUsuario", usuario);
});

module.exports = ruta;
