const { fetchEndpointList } = require("../models/model");
const { readFile } = require("fs/promises");

exports.getEndpointList = (req, res, next) => {
  return readFile("./endpoints.json")
    .then((endpoints) => {
      const parsedEndpoint = JSON.parse(endpoints);
      return parsedEndpoint;
    })
    .then((endpoints) => {
      res.send(endpoints);
    })
    .catch(next);
};
