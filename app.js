const express = require("express");
const { getCategories } = require("./controllers/controller");

app.use(express.json());

app.get("/api/categories", getCategories);

module.exports = app;
