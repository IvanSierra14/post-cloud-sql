const userRepository = require('../repositories/user');

const create = async (userInfo) =>{
    try {
        return await userRepository.create(userInfo);
    } catch (e) {
        console.error(e);
    }
}

const fetchById = async (id) =>{
    try {
        return await userRepository.fetchById(id);
    } catch (e) {
        console.error(e);
    }
}

const fetchAll = async () =>{
    try {
        return await userRepository.fetchAll();
    } catch (e) {
        console.error(e);
    }
}

const update = async (id ,body) =>{
    try {
        let myUser = await userRepository.fetchById(id);
        myUser.name = body.name;
        return await userRepository.update(myUser);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    create,
    fetchById,
    fetchAll,
    update
}