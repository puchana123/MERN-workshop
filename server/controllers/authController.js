const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')

exports.login = (req,res) =>{
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
        return res.status(400).json({error:'Wrong Password'})
    }
   
}

// token check
exports.requireLogin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms:['HS256'],
    userProperty:'auth'
})