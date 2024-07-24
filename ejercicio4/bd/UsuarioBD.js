const mysql = require('mysql2/promise');
const conexion = require('./ConectarBD'); // Asegúrate de tener una conexión configurada en este archivo

class UsuarioBD {
    constructor() {
        this.conexion = conexion;
    }

    async mostrarUsuario() {
        try {
            const [rows, fields] = await this.conexion.execute('SELECT * FROM usuarios'); // Ajusta el nombre de la tabla según sea necesario
            return rows;
        } catch (error) {
            console.error("Error al mostrar los usuarios: ", error);
            throw error;
        }
    }

    async buscarUsuarioPorId(id) {
        try {
            const [rows, fields] = await this.conexion.execute('SELECT * FROM usuarios WHERE id = ?', [id]); // Ajusta el nombre de la tabla y el campo ID según sea necesario
            return rows;
        } catch (error) {
            console.error("Error al buscar el usuario por ID: ", error);
            throw error;
        }
    }

    async crearUsuario(datos) {
        try {
            const { nombre, celular, correo } = datos;
            await this.conexion.execute('INSERT INTO usuarios (nombre, celular, correo) VALUES (?, ?, ?)', [nombre, celular, correo]); // Ajusta el nombre de la tabla y los campos según sea necesario
        } catch (error) {
            console.error("Error al crear el usuario: ", error);
            throw error;
        }
    }
}

module.exports = UsuarioBD;
