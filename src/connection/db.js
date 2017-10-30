// Loading from an external file
const config = require('../../knexfile')

const env = process.env.DB_ENV
const knex = require('knex')(config[env])

module.exports = knex
