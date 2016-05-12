'use strict';

const express = require('express');
const passport = require('passport');

module.exports = function (app) {
  const controller = app.controllers["instituicao-veiculo"];
  const router = express.Router();

  router.get('/', controller.findAll);
  router.post('/', controller.create);
  router.get('/:id', controller.find);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  app.use('/instituicao-veiculo', router)
};