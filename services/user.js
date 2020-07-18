const userRepository = require('../repositories/user');


const fetchAll = async (filters) => {
    try {
        return await userRepository.fetchAll(filters);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}


const create = async (userInfo) =>{          
    try {
                    
        const userInserted = await userRepository.create(userInfo);
        return userInserted;
    } catch (e) {
        console.error(e);
        throw(e);
    }
}


const changePass = async (uuid,password)=>{
    try {
        const userUpdated = await userRepository.changePass(uuid,password);
        return userUpdated;
    } catch (e) {
        console.error(e);
    }
}


const fetchByUuid = async (uuid) =>{
    try {
        return await userRepository.fetchByUuid(uuid);
    } catch (e) {
        console.error(e);
    }
}


const update = async(uuid,userData)=>{
    try {
        let myUserObt = await userRepository.fetchByUuid(uuid);
        if(userData.name){
            myUserObt.name = userData.name;
        }
        if(userData.surname){
            myUserObt.surname = userData.surname; 
        }
        if(userData.image){
            myUserObt.image = userData.image;
        }
        if(userData.email){
            myUserObt.email = userData.email;
        }

        return await userRepository.update(myUserObt);
    } catch (e) {
        console.error(e);
    }
}


const fetchByMail = async (userMail) => {
    try {
        return await userRepository.findByMail(userMail);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}
const fetchByUsername = async (username) => {
    try {
        return await userRepository.findByUsername(username);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}


const remove = async (uuid) => {
    try {
        return await userRepository.remove(uuid);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const reactivate = async (userMail) => {
    try {
        return await userRepository.reactivate(userMail);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const getNumberOfUsers = async (uuid) => {
    try {
        let user = await userRepository.fetchByUuid(uuid);

        return await userRepository.getNumberOfUsers(user.companyId);
    } catch (e) {
        console.error("user not found: "+uuid);
        throw (e);
    }
}

const fetchByMailActive = async (userMail) => {
    try {
        return await userRepository.findByMailActive(userMail);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

module.exports = {
    fetchAll, 
    create, 
    changePass, 
    fetchByUuid, 
    update, 
    fetchByMail, 
    remove, 
    fetchByUsername, 
    reactivate,
    getNumberOfUsers,
    fetchByMailActive
}