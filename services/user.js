const userRepository = require('../repositories/user');



const fetchById = async (id) =>{
    try {
        return await userRepository.fetchById(id);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    fetchById
}