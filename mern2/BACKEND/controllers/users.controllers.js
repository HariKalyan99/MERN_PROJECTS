const serverInfo = {
    server: "Node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const userInfo = require('../json/users.json')

const getUser = (request, response) => {
    response.send("<h1>Welcome to the Node-express server");
}

const getUsers = (request, response) => {
    response.status(200).json(userInfo.data);
}

const getUserServer = (request, response) => {
    response.status(200).json({...serverInfo, server: "Node-epress server"});
}

const getUserByUuid = (request, response) => {
    const {uuid} = request.params;
    if(uuid){
        let foundUser = userInfo.data.find(x => x.login.uuid === uuid);
        if(foundUser){
            return response.status(302).json(foundUser);
        }else {
            return response.status(403).json({message: "User not found"})
        }
    }
}

const getUserByGenderAge = (request, response) => {
    const {gender, age} = request.query;

    if(gender && age){
        return response.status(302).json(userInfo.data.filter(x => x.gender?.toLowerCase() === gender?.toLowerCase() && x.dob.age === Number(age)));
    }

    if(gender){
        return response.status(302).json(userInfo.data.filter(x => x.gender?.toLowerCase() === gender?.toLowerCase()));
    }

    if(age){
        return response.status(302).json(userInfo.data.filter(x => x.dob.age === Number(age)));
    }


    return response.status(404).json({message: "Not found"})
}

module.exports = {getUser, getUsers, getUserByUuid, getUserServer, getUserByGenderAge};