const ruta=require("express").Router();
const Usuario = require("../clases/UsuarioClase");

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render("error");
    }
    else{
        res.render("usuariosVista", usuario1.obtenerDatos);
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/",async (req,res)=>{
    try {
        const usuariobd = new UsuarioBD();
        const [UsuarioBD]=await usuariobd.mostrarUsuario();
        console.log(usuariosBD);
        res.render("mostrarUsuario",{UsuarioBD});
        
    } catch (error) {
        console.error("error al recuperar los usuario "+error);
    }
})

ruta.post("/agregarUsuario", (req,res)=>{
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render("error");
    }else{
        const usuariobd = new usuariosBD();
        usuariobd.crearUsuario(usuario1.obtenerDatos);
        res.redirect("/"); 
    }
})

ruta.get("/agregarusuario", (req,res)=>{
    res.render("formulario");
})

ruta,get("/editarUsuario/:id",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
    //console.log(usuario);
    res.render("editarUsuario", usuario);
})

module.exports=ruta;