const db = require('../database/models');
let sequelize = db.sequelize;
let op = db.sequelize.Op;
let moduloLogin = require('../modulo-login');
let bcrypt = require("../node_modules/bcryptjs");



const controladores = {

  
    listaGeneros : function (req,res) {
        res.render('listaGeneros')
    },
    favoritos : function (req,res) {
        res.render('favs')
    },
    buscadorAvanzado : function (req,res) {
        res.render('buscadorAvanzado')
    },
    detalleSerie : function (req,res) {
        let idPeli = req.query.idPeli
        res.render('detalleSerie', {idPeli: idPeli})
    },
    buscador : function (req,res) {
        res.render('buscador')
    },
    registrarse : function (req,res) {
        res.render('registrarse')
    },
registrarUsuario : function(req,res) {
    let passEncriptada = bcrypt.hashSync(req.body.password, 10);
    
    db.usuarios.create({
        nombreCompleto: req.body.nombreCompleto,
        email: req.body.email,
        password: passEncriptada,
        fechaNacimiento: req.body.fechaNacimiento,
    });
    res.redirect("/")
},
    buscadorDeUsuarios : function(req,res) {
        res.render("buscadorDeUsuarios")
    },
    crearResena : function(req,res) {
        moduloLogin.validar(req.body.email, req.body.password)
        .then(function(resultado){
            db.resenas.create({
                usuarioID: resultado.id,
                resena: req.body.resena,
                puntaje: req.body.puntaje,
                fechaDeCreacion: db.sequelize.literal("CURRENT_DATE"),
                fechaDeActualizacion: db.sequelize.literal("CURRENT_DATE"),
                peliculaID: req.body.idPeli,
            })
          

        })
        .then(function(){
            res.redirect("/")
        })
    },
    misResenas : function(req,res) {
        res.render("misResenas")
    },
    editarResena : function(req,res) {
        db.resena.findOne({
            where: [
                {id : req.params.id}
            ]
        })
        .then(resultados =>{
            res.render("editarResena", {resultados : resultados})
        })



    },
    login : function(req,res) {
        res.render("misResenasLogin")
    },
    usuarioLogin : function(req,res) {
        moduloLogin.validar(req.body.email, req.body.password)
        .then(resultados=>{
          
              db.resenas.findAll({
                  where: [
                      {usuarioID : resultados.id}
                  ]
              })
              .then(resultados => {
                  console.log(resultados);
                  
                  res.render("misResenas", {resultados: resultados})
  
              })

              
          
           
          })
        
          
      
      }
    


}

module.exports = controladores;