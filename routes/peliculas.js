var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Pelicula = require('../models/Film');

router.get('/', (req, res, next) => {
  Pelicula.find({}, (error, data) => {
    if (error) res.status(400).json({'mensaje': 'Se ha encontrado un error en api'})
    else res.status(200).json(data);
  });
});

router.get('/:id_pelicula', (req, res, next) => {
  Pelicula.findOne({'_id': req.params.id_pelicula}, (error, data) => {
    if (data == null) {
      res.status(400).json({'mensaje': 'No encontrado'});
    }else{
      res.status(200).json(data);
    }
  });
});

router.post('/', (req, res, next) => {
  var pelicula = Pelicula({
    name:  req.body.name,
    year: req.body.year,
    gender: req.body.gender,
    director: req.body.director,
    producer: req.body.producer,
    url: req.body.url
  });
  pelicula.save( (error,data) => {
    if (error) res.send('Se ha producido un error al guardar los datos.');
    else res.status(200).json(data);
  });
});

router.get('/', (req, res, next) => {
  Pelicula.find({}, (error, data) => {
    if (error) res.status(400).json({'mensaje': 'Se ha encontrado un error en api'})
    else res.status(200).json(data);
  });
});

router.patch('/:id_pelicula', (req, res, next) => {
  Pelicula.findOneAndUpdate({ _id: req.body.id_pelicula },
      {
        name: req.body.name,
        year: req.body.year,
        gender: req.body.gender,
        director: req.body.director,
        producer: req.body.producer,
        url: req.body.url
      }, (error, data) => {
      if (error) res.status(400).json({'mensaje': 'Se ha encontrado un error en api'})
      else res.status(200).json(req.body);
  });
});

router.delete('/:id_pelicula', (req, res, next) => {
  console.log(req.body);
  Pelicula.findOneAndDelete({'_id': req.body.id_pelicula}, (error, data) => {
    if (error) res.status(404).json(error);
    else res.status(200).json(data);
  });
});

router.post('/:id_pelicula', (req, res, next) => {
  res.status(404).json({mensaje: 'No está permitida la acción'});
});

module.exports = router;
