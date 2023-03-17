const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
    try {
       let usuario;
       
       //Se crea el usuario
       usuario = new Usuario(req.body);

       await usuario.save();
       res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error!!! :(');
    }
}

exports.obtenerUsuarios = async(req,res) =>{
  
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error!!! :(');
    }
}


// Definimos el método para actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    // Extraemos las propiedades del usuario que se van a actualizar desde la solicitud
    const { nombreUsuario, apePaterno, apeMaterno, email, edad, genero, rol, empresa, contrasena } = req.body;
    
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);
    
    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    // Actualizamos las propiedades del usuario con los valores recibidos en la solicitud
    usuario.nombreUsuario = nombreUsuario;
    usuario.apePaterno = apePaterno;
    usuario.apeMaterno = apeMaterno;
    usuario.email = email;
    usuario.edad = edad;
    usuario.genero = genero;
    usuario.rol = rol;
    usuario.empresa = empresa;
    usuario.contrasena = contrasena;

    // Guardamos los cambios en la base de datos
    await usuario.save();
    
    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Definimos el método para obtener un usuario
exports.obtenerUsuario = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);
    
    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Definimos el método para obtener un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);
    
    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    await Usuario.findByIdAndRemove({_id:req.params.id});
    res.json({msg:'Usuario Eliminado'});
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.eliminarUsuarioLog = async (req, res) => {
  try {
    // Buscamos al usuario en la base de datos por su ID
    const usuario = await Usuario.findById(req.params.id);
    
    // Si no se encuentra el usuario, retornamos un error 404
    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    //If para cambiar el status
    if(usuario.status==1){
      // Cambiamos la propiedad 'status' a 0 para indicar que el usuario está eliminado de manera lógica
      usuario.status = 0;
    }else{
      //'status' a 1
      usuario.status = 1;
    }
    
    
    await usuario.save();
    
    // Retornamos el usuario actualizado como respuesta
    res.json(usuario);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

 exports.obtenerUsuariosOrdenados = async (req, res) => {
    try {
      const campo = req.query.campo;
      const orden = parseInt(req.query.orden);
      const usuarios = await Usuario.find().sort({ [campo]: orden });
      res.json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error!!! :(');
    }
 }