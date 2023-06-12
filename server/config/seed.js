const User = require('../apis/user/userModel')
let userData = {
    userId: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "$2b$10$tbSZP8IZYfEw/3FcZZhSLOsuQhxBSw.2dHYcofSnXU9m1fdE.manK",
    userType: 1
}
User.findOne({email:userData.email})
.then(data=>{
    if(data==null){
        let user = new User(userData)
        user.save().then(res => {
            console.log("Admin created")
        }).catch(err => {
            console.log("Admin create err", err)
        }) 
    }
})


