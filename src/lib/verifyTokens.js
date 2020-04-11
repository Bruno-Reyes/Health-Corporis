const jwt = require('jsonwebtoken')
const {secret} = require('./config')

const verifyToken = (req,res,next) =>{
    const { token } = req.body

    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            res.json({
                message : 'Ocurrio algún error, intenta volver a iniciar sesión',
                error : err.message
            })
        }
        else{
            req.userId = decoded.id
            next()
        }
    })
}

module.exports = verifyToken