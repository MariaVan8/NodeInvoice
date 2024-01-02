const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    //required: true,
    //unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    //unique: true,
    lowercase: true,
    trim: true,
  },
},
{collection: 'clients'});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;