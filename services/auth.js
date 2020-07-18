const createError = require('http-errors');
const crypto2 = require('crypto2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userService = require('../services/user');

const db = require('../models/');
const User = db.User;

const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOpts = require('../config/jwt');
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async function(email,password,done){
            const user = await User.findAll({
                attributes: ['id','uuid','email','type','companyId'],
                where: {
                    email: email,
                    password: await crypto2.hash.sha1(password)
                },
                raw: true,
                limit: 1
            });
            if(!user){
                return done(null, false,{message: 'Incorrect email or password'}); 
            }
            return done(null,user[0], {message: 'Logged in successfully'});
        }
));

passport.use(new JwtStategy(jwtOpts, async(token,done)=>{
    try {
        return done(null,token);
    } catch (e) {
        done(e);
    }
}));

/**
  * @desc Try to authenticate users
  * @params request, response, next (error handler)
  * @return success - user.id 
  * @return failure - error 401
*/
const authenticate = (req,res,next)=>{
    passport.authenticate('jwt', {session: false},async (err,user,info)=>{
        if(err||info||!user){
            next(createError(401));
        
        }else{
            //Comprueba que el usuario exista
            let myUser = await userService.fetchByUuid(user.uuid);
            if(!myUser){
                next(createError(401));
            }
            //Guardamos en el token los siguientes datos
            req.userId= user.id;
            req.userUuid = user.uuid;
            req.userType = user.type;
            req.userCompany = user.companyId;
            return next();
        }    
    })
    (req,res,next)
}

module.exports = {
    authenticate
}