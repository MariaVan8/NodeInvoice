const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const ClientA = require("./Client");
const Product = require("./Product");

const invoiceSchema = mongoose.Schema({
  client: { type: ClientA.schema }, // Embedding the client document
  invoiceNumber: {
    type: String,
    unique: true,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    validate: [dateValidator, 'dueDate must be later than issueDate']
  },
  products: [{
    type: Product.schema, // Embedding product documents
  }],
  quantities: [{
    type: Number,
  }],
},
{collection: 'invoices'}
);


function dateValidator(value) {
  return this.issueDate < value;
}

const Invoice = mongoose.model("Invoice", invoiceSchema);


module.exports = Invoice;
