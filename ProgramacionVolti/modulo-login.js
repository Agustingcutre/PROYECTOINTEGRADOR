let db = require('./database/models')

let moduloLogin = {
    chequearUsuario: function (email) {
        return db.Usuario.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })
    },

    buscarPorEmail: function (email){
        return db.usuarios.findOne({
            where: {
                email:email
            }
        })
        .then(resultado=> {
            return resultado
        })
    },

    validar: function (email, password) {
        return db.usuarios.findOne({
            where:{
                email:email,
                password: password
            
            },
        })
        .then(resultado=>{
            return resultado;
        })
    }
}



module.exports = moduloLogin;