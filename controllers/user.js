const validator = require('express-validator');
const userService = require('../services/user');

const create = async(req,res,next)=>{
    
    try {
        if(req.body.name){
            let userInfo = {
                "name" : req.body.name
            }
            const user = await userService.create(userInfo);
            return res.json(user);
        }else{
            res.status(422).json({
                "message": "field name is missing"
            });
        }
        

        
        
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

const fetchById = async(req,res,next)=>{
    
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
const fetchAll = async(req,res,next)=>{
    
    try {
        const user = await userService.fetchAll();
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

const update = async(req,res,next)=>{
    
    try {
        const user = await userService.update(req.params.id, req.body);
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
    create,
    fetchById,
    fetchAll,
    update
}