const Invoice = require("../models/Invoice.js");

class InvoiceOps {
  // empty constructor
  InvoiceOps() {}


  async getAllInvoices(filter = {}) { // Provide a default value of an empty object for the filter
    console.log("Getting all invoices with filter:", filter);
    let invoices = await Invoice.find(filter).collation({ locale: 'en' }).sort({ name: 1 }); // Apply the filter to the query
    return invoices;
  }


  async getInvoiceById(id) {
    console.log(`getting invoice by id ${id}`);
    let invoice = await Invoice.findById(id);
    return invoice;
  }

  async createInvoice(invoiceObj) {
    try {
      console.log("ccreate new invoice!!",invoiceObj)
      const error = await invoiceObj.validateSync();
      if (error) {
        const response = {
          obj: invoiceObj,
          errorMsg: error.message,
        };
        return response; // Exit if the model is invalid
      }

      // Model is valid, so save it
      const result = await invoiceObj.save();
      const response = {
        obj: result,
        errorMsg: "",
      };
      return response;
    } catch (error) {
      const response = {
        obj: invoiceObj,
        errorMsg: error.message,
      };
      return response;
    }
  }
  async deleteInvoiceById(id) {
    console.log(`deleting invoice by id ${id}`);
    let result = await Invoice.findByIdAndDelete(id);
    console.log(result);
    return result;
  }

  async updateInvoiceStatus(findId) {
    try {
      const invoiceDoc = await this.getInvoiceById(findId)
      if (!invoiceDoc) {
        console.error("error in retrieving invoice");
        return false;
      }
      invoiceDoc.status = !invoiceDoc.status
      await invoiceDoc.save();
      return true;
    }
    catch (error) {
      console.error("error updating invoice:", error.message);
      return false;
    }
  }

}

module.exports = InvoiceOps;
