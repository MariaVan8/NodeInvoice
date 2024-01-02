const Client = require("../models/Client");

const ClientOps = require("../data/ClientOps");
const RequestService = require("../services/RequestService");

// instantiate the class so we can use its methods
const _clientOps = new ClientOps();

exports.Index = async function (request, response) {
  console.log("Loading clients from controller");
  let reqInfo = RequestService.reqHelper(request);
  if (reqInfo.authenticated){
  let searchQuery = request.query.search; // Retrieve search query from the request parameters
  let filter = {};

  if (searchQuery) {
    // If there's a search query, create a regex to filter the clients by name
    filter.name = { $regex: searchQuery, $options: 'i' };
  }

  try {
    let clients = await _clientOps.getAllClients(filter); // Pass the filter to your client operations
    response.render("clients", {
      title: "Mongo Crud - Clients",
      clients: clients,
      reqInfo: reqInfo, 
      searchQuery: searchQuery // Pass the search query back to the view for potential use
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    response.redirect("/clients");
  }
}else{
  response.redirect(
    "/user/login?errorMessage=You must be logged in to view this page."
  );
}
};

exports.Detail = async function (request, response) {
  let reqInfo = RequestService.reqHelper(request);
  if (reqInfo.authenticated){
  const clientId = request.params.id;
  console.log(`loading single client by id ${clientId}`);
  let client = await _clientOps.getClientById(clientId);
  let clients = await _clientOps.getAllClients();
  if (client) {
    response.render("client", {
      title: "Mongo Crud - " + client.name,
      reqInfo: reqInfo, 
      clients: clients,
      clientId: request.params.id,
      layout: "./layouts/clients-sidebar",
    });
  } else {
    response.render("clients", {
      title: "Mongo Crud - Clients",
      clients: [],
    });
  }
}
};

// Handle client form GET request
exports.Create = async function (request, response) {
  response.render("client-create", {
    title: "Create Client",
    errorMessage: "",
    client_id: null,
    myClient: {},
  });
};



exports.CreateClient = async function (request, response) {
  // instantiate a new client Object populated with form data
  let tempClientObj = new Client({
    name: request.body.name,
    code: request.body.code,
    companyName: request.body.companyName,
    email: request.body.email,
  });
  
  try {
    
    let responseObj = await _clientOps.createClient(tempClientObj);

    // if no errors, save was successful, redirect to client details
    if (responseObj.errorMsg == "") {
      response.redirect(`/clients/${responseObj.obj._id.valueOf()}`);
    } else {
      // There are errors. Show form again with an error message.
      console.log("An error occurred. Client not created.");
      response.render("client-create", {
        title: "Create Client",
        myClient: tempClientObj, // send back the data entered by the user
        errorMessage: responseObj.errorMsg,
      });
    }
  } catch (error) {
    // Handle any exceptions that occur during client creation
    console.error("Exception occurred in CreateClient.", error);
    response.render("client-create", {
      title: "Create Client",
      myClient: {}, // Reset form
      errorMessage: error.message || "An unexpected error occurred.",
    });
  }
};


// Handle delete client GET request
exports.DeleteClientById = async function (request, response) {
  const clientId = request.params.id;
  console.log(`deleting single client by id ${clientId}`);
  let deletedClient = await _clientOps.deleteClientById(clientId);
  let clients = await _clientOps.getAllClients();

  if (deletedClient) {
    response.render("clients", {
      title: "Mongo Crud - Clients",
      clients: clients,
    });
  } else {
    response.render("clients", {
      title: "Mongo Crud - Clients",
      clients: clients,
      errorMessage: "Error.  Unable to Delete",
    });
  }
};

// Handle edit client form GET request
exports.Edit = async function (request, response) {
  let reqInfo = RequestService.reqHelper(request);
  if (reqInfo.authenticated){
  const clientId = request.params.id;
  let clientObj = await _clientOps.getClientById(clientId);
  response.render("client-form", {
    title: "Edit Client",
    errorMessage: "",
    client_id: clientId,
    myClient: clientObj,
    reqInfo: reqInfo,
  });
}
};

// Handle client edit form submission
exports.EditClient = async function (request, response) {
  const clientId = request.body.client_id;
  const clientName = request.body.name;
  const clientCode = request.body.code;
  const companyName = request.body.companyName;
  const email = request.body.email;

  // send these to clientOps to update and save the document
  let responseObj = await _clientOps.updateClientById(clientId, clientName, clientCode, companyName, email);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clients = await _clientOps.getAllClients();
    response.render("client", {
      title: "Mongo Crud - " + responseObj.obj.name,
      clients: clients,
      clientId: responseObj.obj._id.valueOf(),
      layout: "./layouts/clients-sidebar",
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occured. Client not edited.");
    response.render("client-form", {
      title: "Edit Client",
      myClient: responseObj.obj,
      clientId: clientId,
      errorMessage: responseObj.errorMsg,
    });
  }
};
