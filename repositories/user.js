const db = require('../models/');
const User = db.User;


const create = async(userInfo)=>{
    try {
        return await User.create(userInfo);
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}
const fetchById = async(id)=>{
    try {
        return await User.findByPk(id)
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}
const fetchAll = async()=>{
    try {
        return await User.findAll()
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}
const update = async(myUser)=>{
    try {
        return await myUser.save()
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}
module.exports = {
    create,
    fetchById,
    fetchAll,
    update
}