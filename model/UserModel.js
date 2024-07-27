const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const bcrypt = require('bcryptjs');
// const argon2 = require('argon2');

console.log('i am at model');
const UserSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true,
    minlenght: 4
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+234\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  
    createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  referralId: {
    type: String
  }
});


// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     this.password = await argon2.hash(this.password);  

//     next();
//   } catch (err) {
//     return next(err);
//   }
// });


// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await argon2.verify(this.password, enteredPassword);  

// };

module.exports = mongoose.model('User', UserSchema);