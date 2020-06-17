var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', (req, res, next) => {
  res.render('no_permitido', { mensaje: "Esta accion no está permitida" });
});

router.post('/:id_pelicula', (req, res, next) => {
  var url = req.protocol + '://' + req.get('host') + '/peliculas/' + req.params.id_pelicula;
  request.patch(url, {json: req.body}, (error, response, body) => {
    if (error) res.send('Se ha producido un error al editar los datos.');
    else res.render('editar_pelicula', {title: 'Pelicula editada', data: body, pelicula: 'Se ha editado la película correctamente'});
  });
});

router.get('/:id_pelicula', function(req, res, next) {
  var url = req.protocol + '://' + req.get('host') + '/peliculas/' + req.params.id_pelicula;
  request(url, (error, response, body) => {
    res.render('editar_pelicula', {title: 'Editar película', data: JSON.parse(body) });
  });
});

module.exports = router;
