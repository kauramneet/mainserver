let mongoose = require('mongoose')
const dbPath = 'mongodb+srv://amneet:amneet@amneet.wyfbdl7.mongodb.net/foodorder'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dbPath, options).then(res => {
    console.log("Db Connected")
}).catch(err => {
    console.log("Db Connect Err", err)
})
