const UserService = require('../service/user.services');
const User = new UserService();

const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const SECRET_KEY = process.env.SECRET_KEY;

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}
const stratergy = new JWTStratergy(options, async(payload, done) => {
    try{
        console.log("PAYLOAD", payload);
        const user = await User.findByUserName(payload.userName);
        return done(null, user);
    }catch(error){
        return done(error, false)
    }
})


module.exports = (passport) => {
    passport.use(stratergy);
}