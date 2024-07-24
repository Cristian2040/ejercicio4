const conectarBD = require('./ConectarBD');

class UsuarioBD {
    constructor() {
        this.conexion = null;
    }

    async init() {
        if (!this.conexion) {
            this.conexion = await conectarBD.conectarMySql();
        }
    }

    async mostrarUsuario() {
        await this.init();
        try {
            const [rows] = await this.conexion.execute('SELECT * FROM usuarios'); // Ajusta el nombre de la tabla según sea necesario
            return rows;
        } catch (error) {
            console.error("Error al mostrar los usuarios: ", error);
            throw error;
        }
    }

    async buscarUsuarioPorId(id) {
        await this.init();
        try {
            const [rows] = await this.conexion.execute('SELECT * FROM usuarios WHERE id = ?', [id]); // Ajusta el nombre de la tabla y el campo ID según sea necesario
            return rows;
        } catch (error) {
            console.error("Error al buscar el usuario por ID: ", error);
            throw error;
        }
    }

    async crearUsuario(datos) {
        await this.init();
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
