const db = require('../models/');
const User = db.User;
const Podcast = db.Podcast;
const Channel = db.Channel;

const fetchAll = async (filters) =>{
    try {
        let where = [];
        let pageSize = 5;
        let offset = 0;
        if (filters&&filters.size && filters.size>0){
            pageSize = parseInt(filters.size);
        }
        if (filters&&filters.page && filters.page>0){
            offset = (filters.page-1) * pageSize;
        }
        if(filters.companyId){
            where.push({"companyId": filters.companyId})
        }
        let filter={
            offset: offset,
            limit: pageSize, 
            where: where,
            distinct: true
        }
        let {count, rows} = await User.findAndCountAll(filter);
        return ({"users": rows,"count": count}); 
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}
const create = async (userInfo)=>{
    try {
        return await User.create(userInfo);
    } catch (e) {
        console.error(e);
        throw ('Could not create User');
    }
}
const changePass = async(uuid,password)=>{
    let user;
    try {
        user = await User.findOne({where: {"uuid": uuid}})
        user.isVerified = 1;
        user.password = password;
        return await user.save();
    } catch (e) {
        console.error(e);
        throw('Can not update the user');
    }
}
const fetchByUuid = async(uuid)=>{
    try {
        return await User.findOne({where: {"uuid": uuid}})
        
    } catch (e) {
        console.error(e);
        throw('Error getting de user');
    }
}

const update = async(myUser)=>{
    
    try {
        return await myUser.save();
    } catch (e) {
        console.error(e);
        throw('Can not update the user');
    }
}

const findByMail = async (userMail) =>{
    try {
        return await User.findOne({where: {"email": userMail},paranoid:false});
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}

const remove = async (uuid) => {
    try {
        let myUser = await User.findOne({where: {"uuid": uuid}});
        let removed = await myUser.destroy();
        let newUser = await User.findOne({where: {companyId: myUser.companyId}, order:[ [ 'createdAt', 'ASC' ]]})
        
        myPodcasts = await Podcast.findAll({where: {userId: myUser.id}});
        
        for (const podcast of myPodcasts) {
            podcast.userId = newUser.id;
            await podcast.save();
        }
        //await myPodcasts.save();

        myChannels = await Channel.findAll({where: {userId: myUser.id}});
        
        for (const channel of myChannels) {
            channel.userId = newUser.id;
            await channel.save();
        }
        //await myChannels.save();

        return removed;
    } catch (e) {
        console.error(e);
        throw ('Could not destroy the user')
    }
}

const findByUsername = async (username) =>{
    try {
        return await User.findOne({where: {"username": username}});
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}

const reactivate = async (userMail) =>{
    try {
        return await User.restore({where: {"email": userMail}});
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}

const getNumberOfUsers = async (companyId) =>{
    try {
        return await User.count({where: {"companyId": companyId}});
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}

const findByMailActive = async (userMail) =>{
    try {
        return await User.findOne({where: {"email": userMail}});
    } catch (e) {
        console.error(e);
        throw('Can not fetch Users')
    }
}
module.exports={ 
    fetchAll, 
    create, 
    changePass, 
    fetchByUuid, 
    update, 
    findByMail, 
    remove, 
    findByUsername, 
    reactivate,
    getNumberOfUsers,
    findByMailActive
}