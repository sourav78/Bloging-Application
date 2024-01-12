const mongoose = require('mongoose')

const databaseConnect = () => {
    mongoose.connect(process.env.MONGODB_URL).then((c) => {
        console.log(`Database connected Host: ${c.connection.host}`);
    }).catch(err => {
        console.log(err.message);
    })
}

module.exports = {
    databaseConnect,
}