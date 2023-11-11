const mongoose=require('mongoose')
const bcrypt= require('bcrypt')
const validator= require('validator')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  
  }, { timestamps: true });

  // static sign up method
  // we cant use arrow function with this.
   userSchema.statics.signup=  async function (email, password){
    //validation
    if(!email || !password)
    { throw Error('All fields must be filled')

    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassowrd(password)){
        throw Error('Password is not strong enough')
    }
    const exits = await this.findOne({email})
    
    if (exists){
        throw Error('Email already in use')
    }
    
    
    //my password29842u398 we add so many characters to users before hashing toprevent hackers from password matching
  const salt = await bcrypt.genSalt(10) //29842u398
  //we will hash that with pass
  const hash = await bcrypt.hash(passowrd,salt)
  const user= await this.create({email, password:hash})
  return user
}

//static login method
userSchema.statics.login = async function(email,password){

    //validation
    if(!email || !password)
    { throw Error('All fields must be filled')

    }
    
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    const user= await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match= await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect Password')

    }
    return user
}

module.exports = mongoose.model('User', userSchema);