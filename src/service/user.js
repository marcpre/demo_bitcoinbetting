const knex = require('../connection/db')
const bcrypt = require('bcrypt')

const saltRounds = 10

async function findUserByUserName(username) {
  const user = await knex('users').where({
    username,
  })
  if (!username) {
    return null
  }
  return user
}

async function findUserById(id) {
  const user = await knex('users').where({
    id,
  })
  if (!id) {
    return null
  }
  return user
}

async function createUser(username, pwd) {
  // check if username already exists
  const userExist = await findUserByUserName(username)
  try {
    if (userExist) {
      const salt = await bcrypt.genSalt(saltRounds)
      const pwdHash = await bcrypt.hash(pwd, salt)

      const user = {
        username,
        password: pwdHash,
        createdAt: new Date(),
        deleted: false,
      }
      console.log(`Create User: ${user.username} ${user.pwdHash} ${user.createdAt} ${user.deleted}`)

      await knex('users').insert(user, 'id')
    } else {
      console.log('Username already exists')
    }
  } catch (err) {
    console.log(err)
  }
}

async function login(username, plaintTextPassword) {
  try {
    const userObj = await knex('users').select().where({
      username,
    }).first()
    if (!userObj) return null

    const resComp = await bcrypt.compare(plaintTextPassword, userObj.password)

    if (resComp) {
      console.log('login: login')
      return userObj
    }
    console.log('login: cannot login')
    return false
  } catch (e) {
    return console.log(e)
  }
}

module.exports = {
  createUser,
  findUserByUserName,
  login,
  findUserById,
}
