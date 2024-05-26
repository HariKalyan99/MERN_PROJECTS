const Authmodel = require("../models/auth.model")
const bcrypt = require('bcrypt');
const UserService = require("./user.services");
const User = new UserService();
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const DiscussionModel = require('../models/discussion.model');

class AuthService {
    encryptPassword = async(password) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }
    signUp = async(body) => {
        try{
            const hashedPassword = await this.encryptPassword(body.password);
            const Auth = new Authmodel({...body, password: hashedPassword});
            const result = await Auth.save();
            return result; 
        }catch(error){
            throw error;
        }
    }
    
    generateToken = async(userName) => {
        try{
            const payload = {
                userName
            }
            const options = {
                expiresIn: "1hr"
            }
            const token = jwt.sign(payload, SECRET_KEY, options);
            return token;
        }catch(error){
            throw error
        }
    }


    verifyPassword = async(username, password) => {
        try{
            const user = await User.findByUserName(username);
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                return user
            }else{
                return null;
            }
        }catch(error){
            throw error;
        }
    }
    login = async(body) => {
        try{
            const response = await this.verifyPassword(body.userName, body.password);
            if(response){
                const token = await this.generateToken(response.userName);
                return {isLoggedIn: true, token}
            }else{
                return {isLoggedIn: false}
            }
        }catch(error){
            throw error
        }
    }
    newDiscussion = async(body) => {
        try{
            const discussion = new DiscussionModel({...body});
            const result = await discussion.save();
            return result;
        }catch(error){
            throw error
        }
    }
}

module.exports = AuthService;