const AuthService = require("../service/auth.service");
const Auth = new AuthService();

const postAuthSignup = async(request, response) => {
    try{
        const result = await Auth.signUp({...request.body});
        return response.status(200).json(result);
    }catch(error){
        if(error.code === 11000){
            response.status(409).json({
                message: "Failed to create new user",
                reason: "Alrady Exists in DB"
            });
        }else{
            response.json({message: "Failed to create new user", error});
        }
    }
} 

const postAuthLogin = async(request, response) => {
    try{
        const result = await Auth.login({...request.body});
        if(result.isLoggedIn) {
            response.cookie("remember_cookie", result.token, {
                maxAge: 60*60*1000,
                httpOnlt: true
            })
            return response.status(200).json(result);
        }else{
            return response.status(403).json({message: "Invalid Credentials"})
        }
    }catch(error){
        return response.status(500).json({message: "Failed to login user", error})
    }
}

module.exports = {postAuthSignup, postAuthLogin};