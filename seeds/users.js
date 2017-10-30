const faker = require('faker')
//const knex = require('knex')
const bcrypt = require('bcrypt')

const plainPwd = 'admin'
const userNumber = 9 // how many seeds should be generated
const settingNumber = userNumber

exports.seed = async (knex, Promise) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(plainPwd, salt)
  return knex('settings').del()
    .then(() => knex('users').del())
    .then(() => {
      const users = []
      for (let index = 0; index < userNumber; index += 1) {
        users.push({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
          deletedAt: faker.date.recent(),
          deleted: faker.random.boolean(),
        })
      }
      users.push({
        username: 'admin',
        password,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        deletedAt: null,
        deleted: false,
      })
      return knex('users').insert(users)
    })
    .then(() => knex('users').pluck('id').then((userIds) => {
      const settings = []

      for (let index = 0; index < settingNumber; index += 1) {
        settings.push({
          description: faker.lorem.paragraph(),
          image: faker.image.imageUrl(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
          deletedAt: faker.date.recent(),
          deleted: faker.random.boolean(),
          user_id: faker.random.arrayElement(userIds),
        })
      }
      return knex('settings').insert(settings)
    }))
}
