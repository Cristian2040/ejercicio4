require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2");
    }
    async conectarMySql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.host,
                user:process.env.user,
                password:process.env.password,
                database:process.env.database,
                port:process.env.port
            });
            console.log("Conexión creada a MySql");
        
        } catch (error) {
            console.error("Error al conectar con MySql "+error);
        }
    }
    async cerrarConexion(){
        try {
            await this.conexion.end();
            console.log("Desconexión de MySql");
        } catch (error) {
            console.error("Error al desconectar de MySql "+error);
        }
    }
}

async function principal() {
    var conectarbd=new ConectarBD();
    await conectarbd.conectarMySql();
    await conectarbd.cerrarConexion();
}
principal();