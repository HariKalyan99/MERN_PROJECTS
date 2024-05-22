const usersInfo = require('../users.json')
const serverInfo = {
    server: "node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const getUser = (request, response) => {
    response.send("<h1> Welcome to node-express server </h1>");
}

const getUserServer =  (request, response) => {
    response.status(200).json({...serverInfo, server: "node-express server"})
}

const getUserData = (request, response) => {
    response.status(200).json(usersInfo)
}


const getUserDataByUuid = (request, response) => {
    const {uuid} = request.params;
    response.status(200).json(usersInfo.data.find(x => x.login.uuid === uuid));
}

const getData = (request, response) => {
    const {gender, age} = request.query;

    if(gender && age){
        const found = usersInfo.data.find(x => x.gender?.toLowerCase() === gender?.toLowerCase() && x.dob.age === Number(age));
        if(found){
            return response.status(200).json(found);
        }else{
            return response.sendStatus(404)
        }
    }

    if(gender){
        return response.status(200).json(usersInfo.data.filter(x => x.gender?.toLowerCase() === gender?.toLowerCase()))
    }

    if(age){
        return response.status(200).json(usersInfo.data.filter(x => x.dob.age === Number(age)))
    }
  
}

module.exports = {getUser, getUserServer, getUserData, getUserDataByUuid, getData};
