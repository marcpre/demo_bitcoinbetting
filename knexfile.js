//load env variables
require("dotenv").config()

// Update with your config settings.
module.exports = {

    development: {
        client: process.env.DB_CONNECTION,
        connection: {
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
    },

}
