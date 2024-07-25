const express = require('express');
const ruta = require("express").Router();
const Usuario = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");

ruta.post("/agregarUsuario", async (req, res) => {
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined) {
        res.render("error"); // Verificar que esta vista exista
    } else {
        try {
            const usuariobd = new UsuarioBD();
            await usuariobd.crearUsuario(usuario1.obtenerDatos);
            res.redirect("/");
        } catch (error) {
            console.error("Error al agregar usuario: ", error);
            res.render("error"); // Verificar que esta vista exista
        }
    }
});

ruta.get("/agregarUsuario", (req, res) => {
    res.render("formulario");
});

ruta.get("/", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuariosBD = await usuariobd.mostrarUsuario();
        console.log(usuariosBD);
        res.render("mostrarUsuario", { usuariosBD });
    } catch (error) {
        console.error("Error al recuperar los usuarios: ", error);
        res.render("error"); // Verificar que esta vista exista
    }
});

ruta.get("/editarUsuario/:id", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
        res.render("editarUsuario", usuario);
    } catch (error) {
        console.error("Error al editar usuario: ", error);
        res.render("error"); // Verificar que esta vista exista
    }
});

module.exports = ruta;
