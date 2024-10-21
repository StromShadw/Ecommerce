const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try{
        const token = req.headers("Authorization")

        if(!token) return res.status(400).json({mes:"invalid Authorization"})
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({mes:"invalid Authorization"})
            
                req.user = user
                next();
        })
    }
    catch(err){
        return res.status(500).json({mes: err.message})
    }
}

module.exports = auth