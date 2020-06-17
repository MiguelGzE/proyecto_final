var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', (req, res, next) => {
  res.render('no_permitido', { mensaje: "Esta accion no está permitida" });
});

router.get('/:id_pelicula', function(req, res, next) {
  var url = req.protocol + '://' + req.get('host') + '/peliculas/' + req.params.id_pelicula;
  request(url, (error, response, body) => {
    res.render('elimina_pelicula', {title: 'Eliminar película', data: JSON.parse(body), mostrar: true });
  });
});

router.post('/:id_pelicula', (req, res, next) => {
  var url = req.protocol + '://' + req.get('host') + '/peliculas/' + req.params.id_pelicula;
  request.delete(url, {json: req.body}, (error, response, body) => {
    if (error) res.send('Se ha producido un error al editar los datos.');
    else res.render('elimina_pelicula', {title: 'Pelicula eliminada', data: body, eliminada: 'Se ha eliminado la película correctamente'});
  });
});

module.exports = router;
