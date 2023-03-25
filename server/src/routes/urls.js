const express = require("express");
const UrlsRepository = require("../repository/urlsRepository");
const UrlsService = require("../services/urlsService");

const urelsRepo = new UrlsRepository();
const urlsService = new UrlsService(urelsRepo);
const urlsRoute = express.Router();

urlsRoute.post("/add", urlsService.add.bind(urlsService));
urlsRoute.get("/:token", urlsService.redirect.bind(urlsService));
urlsRoute.get("/", urlsService.getList.bind(urlsService));

module.exports = urlsRoute;
