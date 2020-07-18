const validator = require('express-validator');
const userService = require('../services/user');

const getById = async(req,res,next)=>{
    
    try {
        const user = await userService.fetchById(req.params.id);
        return res.json(user);
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

module.exports = {
    getById
}