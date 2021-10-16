const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology : true
})
  .then(() => console.log('Database is connected'))
  .catch((e) => console.log(e))