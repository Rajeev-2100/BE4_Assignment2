const mongoose = require('mongoose')

require('dotenv').config()

const mongoUri = process.env.MONGO_URL

const intailizeDatabase = async () => {
    await mongoose.connect(mongoUri).then(() => {
        console.log('Connecting to Database')
    }).catch(error => {
        console.log('Failed to connecting Database')
    })
}

module.exports = { intailizeDatabase }