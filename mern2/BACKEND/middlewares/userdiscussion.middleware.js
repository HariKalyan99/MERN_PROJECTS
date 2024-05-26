const UserService = require("../service/user.services");
const User = new UserService();

const fetchUserInCollection = async(request, response, next) => {
    try{
        const {author} = request.body;
        const user = await User.findByUserName(author);
        if(!user){
            return response.status(404).json({message: "User/author not found!", userName: author});
        }else{
            next();
        }
    }catch(error){
        return response.status(500).json({message: "Could not find user"})
    }
}

module.exports = {fetchUserInCollection};