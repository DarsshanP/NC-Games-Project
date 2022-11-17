const { fetchEndpointList } = require("../models/model");

exports.getEndpointList = (req, res, next) => {
  fetchEndpointList()
    .then((endpoints) => {
      res.send(endpoints);
    })
    .catch(next);
};
