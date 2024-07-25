const ConectarBD = require("./ConectarBD");

class UsuarioBD {
    constructor() {
        this.conectarBD = new ConectarBD();
    }

    async crearUsuario(usuario) {
        await this.conectarBD.conectarMySql();
        const conexion = this.conectarBD.conexion;

        try {
            const query = 'INSERT INTO usuarios (nombre, celular, correo) VALUES (?, ?, ?)';
            await conexion.execute(query, [usuario.nombre, usuario.celular, usuario.correo]);
            console.log("Usuario creado exitosamente");
        } catch (error) {
            console.error("Error al crear usuario: ", error);
        } finally {
            await this.conectarBD.cerrarConexion();
        }
    }

    async mostrarUsuario() {
        await this.conectarBD.conectarMySql();
        const conexion = this.conectarBD.conexion;

        try {
            const [rows] = await conexion.query('SELECT * FROM usuarios');
            return rows;
        } catch (error) {
            console.error("Error al mostrar usuarios: ", error);
        } finally {
            await this.conectarBD.cerrarConexion();
        }
    }

    async buscarUsuarioPorId(id) {
        await this.conectarBD.conectarMySql();
        const conexion = this.conectarBD.conexion;

        try {
            const [rows] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            return rows;
        } catch (error) {
            console.error("Error al buscar usuario por ID: ", error);
        } finally {
            await this.conectarBD.cerrarConexion();
        }
    }
}

module.exports = UsuarioBD;
