var express = require('express');
var router = express.Router();
var request = require('request');

// var Pelicula = require('../models/Film');

router.get('/', function(req, res, next) {
  res.render('nueva_pelicula', { title: 'Nueva película' });
});

router.post('/', (req, res, next) => {
  var url = req.protocol + '://' + req.get('host') + '/peliculas/';
  request.post(url, {json: req.body}, (error, response, body) => {
    if (error) res.send('Se ha producido un error al editar los datos.');
    else res.render('editar_pelicula', {title: 'Pelicula guardada', data: body, pelicula: 'Se ha guardado la película correctamente'});
  });
});

router.post('/:peliculaId', (req, res, next) => {
  res.render('no_permitido', { mensaje: "Esta accion no está permitida" });
});

router.delete('/', (req, res, next) => {
  res.render('no_permitido', { mensaje: "Esta accion no está permitida" });
});

router.delete('/:peliculaId', (req, res, next)=>{
  Pelicula.findOneAndDelete({_id:req.params.peliculaId}, (error, data)=>{
    if(error) res.status(404).json(error);
    else res.status(200).json(data);
  });
});


module.exports = router;
