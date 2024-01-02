const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
 
  },
  code: {
    type: String,
  
  },
  unitCost: {
    type: Number,
  
  },
},
{collection: 'products'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;