const Client = require("../models/Client.js");

class ClientOps {
  // empty constructor
  ClientOps() {}


  async getAllClients(filter = {}) { // Provide a default value of an empty object for the filter
    console.log("Getting all clients with filter:", filter);
    let clients = await Client.find(filter).collation({ locale: 'en' }).sort({ name: 1 }); // Apply the filter to the query
    return clients;
  }


  async getClientById(id) {
    console.log(`getting client by id ${id}`);
    let client = await Client.findById(id);
    return client;
  }

  async createClient(clientObj) {
    try {
      const error = await clientObj.validateSync();
      if (error) {
        const response = {
          obj: clientObj,
          errorMsg: error.message,
        };
        return response; // Exit if the model is invalid
      }

      // Model is valid, so save it
      const result = await clientObj.save();
      const response = {
        obj: result,
        errorMsg: "",
      };
      return response;
    } catch (error) {
      const response = {
        obj: clientObj,
        errorMsg: error.message,
      };
      return response;
    }
  }
  async deleteClientById(id) {
    console.log(`deleting client by id ${id}`);
    let result = await Client.findByIdAndDelete(id);
    console.log(result);
    return result;
  }

  async updateClientById(id, clientName, clientCode, companyName, email) {
    console.log(`updating client by id ${id}`);
    const client = await Client.findById(id);
    console.log("original client: ", client);
    client.name = clientName;
    client.code = clientCode;
    client.companyName = companyName;
    client.email = email;

    let result = await client.save();
    console.log("updated client: ", result);
    return {
      obj: result,
      errorMsg: "",
    };
  }
}

module.exports = ClientOps;
