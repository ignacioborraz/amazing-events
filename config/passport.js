const passport = require('passport')
const passportJwt = require('passport-jwt')

const {KEY_JWT} = process.env
const User = require('../models/User')

passport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        },
        async (jwt_payload,done) => {
            try {
                let user = await User
                    .findOne({_id:jwt_payload.id})
                    .select('id name email role photo')
                    .exec()

                if (user) {
                    return done(null, user)
                }

                return done(null, false)
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
    )
)

module.exports = passport
