const Users = require('../models/userModel')

const authAdmin = async (req,res,next) =>{
    try {
        const user = await Users.findOne({
            _id:req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({mes:"Admin resources access denied"})
        next()
    } catch (error) {
        res.status(500).json({mes:error.message})
    }
}

module.exports = authAdmin;