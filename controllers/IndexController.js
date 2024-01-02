const RequestService = require("../services/RequestService");

exports.Index = async function (req, res) {
  let reqInfo = RequestService.reqHelper(req);
  // Combine the reqInfo and title into a single object
  return res.render("index", { 
    reqInfo: reqInfo, 
    title: "Mongo Crud - Home Page" 
  });
};
