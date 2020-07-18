const db = require('../models/');
const User = db.User;

const fetchById = async(id)=>{
    try {
        return await User.findByPk(id)
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}
module.exports = {
    fetchById
}