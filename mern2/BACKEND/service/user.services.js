const Authmodel = require('../models/auth.model');


class UserService  {
    findByUserName = async(userName) => {
        try{
            const result = await Authmodel.findOne({userName})
            return result;
        }catch(error){
            throw error;
        }
    }
}

module.exports = UserService;