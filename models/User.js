const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  roles: {
    type: Array,
  },
});
// Add passport-local-mongoose to our Schema
userSchema.plugin(passportLocalMongoose);

// Pass the Schema into Mongoose to use as our model
const User = mongoose.model("User", userSchema);

// Export it so that we can use the model in our App
module.exports = User;
