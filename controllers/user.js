const validator = require('express-validator');
const userService = require('../services/user');
const send = require('../utils/mail');
const crypto2 =require('crypto2');
const uuid = require('uuid-v4');
const control = require('../utils/control-methods');

/**
  * @desc create a db.user and finally, if correct, send a mail to the new user
  * @param request, response, next (error handler)
  * @return success - ok
  * @return failure - error 422
*/
const create = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        //Solo super admin y admin puede crear usuarios
        if( req.userType !== "Superadmin" && req.userType !== "Admin"){
            return res.status(403).json({ message: "Forbidden" });
        }
        let company;
        if(req.userType == "Superadmin"){
            company = parseInt(req.body.companyId);
            if(!req.body.companyId){
                return res.status(422).json({ message: "companyId field must be filled" });
            }
        }else if(req.userType == "Admin"){
            company = parseInt(req.userCompany);
        }
        let token =uuid();
        let email = req.body.email;
        if(email){
            console.log("email",email);
        }else{
            return res.status(422).json({errors: errors.array()});
        }
        let username = email.split("@")[0];

        let checkName = await userService.fetchByUsername(username);

        if(checkName){
            username = email;
        }

        const userInfo = {
        "type": req.body.type,
        "name": req.body.name,
        "surname": req.body.surname,
        "companyId": company,    
        "username" : username,
        "email" : req.body.email,
        "password" : token,
        "uuid" : token,
        "image" : process.env.AVATAR_URL
    }
        const user = await userService.create(userInfo);
        await send.verificationMail(req,userInfo);
               
        return res.json({user,msg : 'A verification email has been send to ' + userInfo.email + '.'});
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors:[
                {
                msg : e
                }
            ]
        })
    }
}

/**
  * @desc change password for a given user
  * @param request, response, next (error handler)
  * @return success - return ok
  * @return failure - error 422
*/
const changePass = async(req,res,next)=>{
    
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    var password = await crypto2.hash.sha1(req.body.password);
    try {
        const user = await userService.changePass(req.params.uuid,password);
        
        return res.json(user);
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors:[
                {
                msg : e
                }
            ]
        })        
    }
    

}

/**
  * @desc find a user by uuid and get all the details
  * @param request, response, next (error handler)
  * @return success - return ok
  * @return failure - error 422
*/
const getByUuid = async(req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const user = await userService.fetchByUuid(req.params.uuid);
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

/**
  * @desc find a user by uuid and get verification and email fields
  * @param request, response, next (error handler)
  * @return success - return ok
  * @return failure - error 422
*/
const getVerificationByUuid = async(req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const user = await userService.fetchByUuid(req.params.uuid);
        return res.json({isVerified: user.isVerified, name: user.name});
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

/**
  * @desc change user info identified by its UUID
  * @param request, response, next (error handler)
  * @return success - return ok
  * @return failure - error 422
*/
const update = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        //Solo el Superadmin, el Admin de la misma empresa o el propietario pueden actualizar los datos del usuario
        let myUser = await control.userControl(req);
        if(!myUser){
            return res.status(403).json({ message: "Forbidden" });
        }

        let updateResponse = await userService.update(req.params.uuid,req.body);
        return res.status(200).json(updateResponse);
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

/**
  * @desc resend mail to the new user
  * @param request, response, next (error handler)
  * @return success - ok
  * @return failure - error 422
*/
const resendMail = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        //Solo el Superadmin, el Admin de la misma empresa o el propietario pueden reenviar el mail
        const userInfo = await userService.fetchByUuid(req.params.uuid);
        if(req.userType !== "Superadmin"){
            if(req.userType == "Admin" && userInfo.companyId !== req.userCompany){
                return res.status(403).json({ message: "Forbidden" });
            }
        }
        await send.verificationMail(req,userInfo);
               
        return res.json({message : 'A verification email has been send to ' + userInfo.email + '.'});
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors:[
                {
                msg : e
                }
            ]
        })
    }
}
/**
  * @desc resend mail to the user if don't remember password
  * @param request, response, next (error handler)
  * @return success - ok
  * @return failure - error 422
*/
const resetPassMail = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        const userInfo = await userService.fetchByMail(req.body.email);
        await send.resetPassMail(req,userInfo);
               
        return res.json({userInfo,message : 'A verification email has been send to ' + userInfo.email + '.'});
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors:[
                {
                msg : e
                }
            ]
        })
    }
}

/**
  * @desc remove user
  * @param request, response, next (error handler)
  * @return success - removed id
  * @return failure - error 422
*/
const remove = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        //Solo el Superadmin, el Admin de la misma empresa  pueden eliinar un usuario
        let myUser = await userService.fetchByUuid(req.params.uuid);
        if(req.userType !== "Superadmin"){
            if(req.userType == "Admin" && myUser.companyId !== req.userCompany){
                return res.status(403).json({ message: "Forbidden" });
            }
        }
        //No puede borrarse a si mismo
        if(req.userId == myUser.id){
            return res.status(422).json({message: "Bad request"});
        }

        let removedUser = await userService.remove(req.params.uuid);
        return res.json({id: removedUser.id})
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
/**
  * @desc get user list
  * @param request, response, next (error handler)
  * @return success -  a list of db.users objects
  * @return failure - error 422
*/
const fetchAll = async (req,res,next) =>{
    
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        if(req.userType !== "Superadmin" && req.userType !== "Admin" ){
                return res.status(403).json({ message: "Forbidden" });
            
        }
        let filters = {};
        if(req.query.page){
            filters.page = req.query.page;
        }
        if(req.query.size){
            filters.size = req.query.size;
        }
        if(req.userType == "Admin"){
            filters.companyId = req.userCompany;
        }
        const users = await userService.fetchAll(filters);

        return res.json(users);
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

/**
  * @desc reactivate a removed user
  * @param request, response, next (error handler)
  * @return success - reactivated: email address
  * @return failure - error 422
*/
const reactivate = async (req,res,next)=>{
    const errors = validator.validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        //Solo el Superadmin, el Admin de la misma empresa  pueden reactivar un usuario
        const myUser = await userService.fetchByMail(req.params.email);
        if(req.userType !== "Superadmin"){
            if(req.userType == "Admin" && myUser.user.companyId !== req.userCompany){
                return res.status(403).json({ message: "Forbidden" });
            }
        }
                
        
        const userInfo = await userService.reactivate(req.params.email);
        return res.json({"reactivated": req.params.email});
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors:[
                {
                msg : e
                }
            ]
        })
    }
}
module.exports = {
    create, 
    changePass, 
    getByUuid, 
    getVerificationByUuid, 
    update, resendMail, 
    resetPassMail, 
    remove, 
    fetchAll,
    reactivate
}