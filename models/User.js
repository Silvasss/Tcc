import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça nome'],
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça email'],
    validate: {
      validator: validator.isEmail,
      message: 'Por favor, forneça um email válido',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Por favor, forneça senha'],
    minlength: 6,
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 40,
    default: 'BR',
  },
  nomePais: {
    type: String,
    trim: true,
    maxlength: 40,
    default: 'Brasil',
  },
  locationEstado: {
    type: String,
    trim: true,
    maxlength: 40
  },
  locationCidade: {
    type: String,
    trim: true,
    maxlength: 40
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) { 
    return
  }

  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME,})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)

  return isMatch
}


export default mongoose.model('User', UserSchema)