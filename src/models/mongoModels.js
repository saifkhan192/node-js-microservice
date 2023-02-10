const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"]
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// module.exports = mongoose.model('User', userSchema);

module.exports = (app) => {
  app.locals.models = {};
  let connection = app.locals.databases.dbMongo;
  app.locals.models.User = connection.model('User', userSchema)
};
