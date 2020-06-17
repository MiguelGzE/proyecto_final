var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  var url = req.protocol + '://' + req.get('host') + '/peliculas';
  request(url, (error, response, body) => {
    res.render('index', {title: 'Catálogo de películas', data: JSON.parse(body) });
  });
});

router.post('/', (req, res, next) => {
  res.render('no_permitido', { mensaje: "Esta accion no está permitida" });
});

module.exports = router;
