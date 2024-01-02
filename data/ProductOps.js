const Product = require("../models/Product.js");

class ProductOps {
  // empty constructor
  ProductOps() {}

  async getAllProducts(filter = {}) { // Provide a default value of an empty object for the filter
    console.log("Getting all products with filter:", filter);
    let products = await Product.find(filter).collation({ locale: 'en' }).sort({ name: 1 }); // Apply the filter to the query
    return products;
  }

  async getProductById(id) {
    console.log(`getting product by id ${id}`);
    let product = await Product.findById(id);
    return product;
  }

  async createProduct(productObj) {
    try {
      const error = await productObj.validateSync();
      if (error) {
        const response = {
          obj: productObj,
          errorMsg: error.message,
        };
        return response; // Exit if the model is invalid
      }

      // Model is valid, so save it
      const result = await productObj.save();
      const response = {
        obj: result,
        errorMsg: "",
      };
      return response;
    } catch (error) {
      const response = {
        obj: productObj,
        errorMsg: error.message,
      };
      return response;
    }
  }
  
  async deleteProductById(id) {
    console.log(`deleting product by id ${id}`);
    let result = await Product.findByIdAndDelete(id);
    console.log(result);
    return result;
  }

  async updateProductById(id, productName, productCode, productCost) {
    console.log(`updating product by id ${id}`);
    const product = await Product.findById(id);
    console.log("original product: ", product);
    product.name = productName;
    product.code = productCode;
    product.unitCost = productCost;

    let result = await product.save();
    console.log("updated product: ", result);
    return {
      obj: result,
      errorMsg: "",
    };
  }
}

module.exports = ProductOps;
