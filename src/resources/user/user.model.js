import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config'

const {secrets} = config


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: [true, "Field can't be Blank"],
        unique: [true, 'Username already taken'],
        lowercase: true,
        unique: true,
        trim: true,
        index: true
      },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        lowercase: true,
        unique: [true, 'Email already taken'],
        trim: true,
        index: true
    },
    password: {
        type: String,
        require: true,
        minlength: [8, 'Minimum of 8 Characters']
    }
}, { timestamps: true })

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
      return next()
    }
  
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err)
      }
  
      this.password = hash
      next()
    })
})

userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err)
        }
  
        resolve(same)
      })
    })
}

userSchema.methods.generateJWT = function() {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60)
    
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secrets.jwt);
}

userSchema.methods.verifyJWT = function(token) {
    new Promise((resolve, reject) => {
        jwt.verify(token,secrets.jwt, (err, payload) => {
          if (err) return reject(err)
          resolve(payload)
        })
      })
}


userSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

export const User = mongoose.model('user', userSchema)
