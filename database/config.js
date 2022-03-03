const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // ,useCreateIndex: true,
            // useFindAnyModify: false
        });

        console.log('DB Connected!\n')

    } catch (error) {
        console.log(error);
        throw new Error('Error in DB initialize');
    }
}


module.exports = {
    dbConnection
}