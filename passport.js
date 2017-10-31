const passport = require('passport')
const service = require('./services/user')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await service.findUserById(id)
    done(null, user || false)
  })

}