const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
            mongoose.connect(process.env.DB,connectionParams);
            console.log("Connected to DB");
    } catch(error){
            console.log(error);
    }

}