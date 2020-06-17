var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var peliculasRouter = require('./routes/peliculas');
var editarPeliculaRouter = require('./routes/editar_pelicula');
var nuevaPeliculaRouter = require('./routes/nueva_pelicula');
var eliminaPeliculaRouter = require('./routes/elimina_pelicula');

var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sisinfo2020:sisinfo.2020@cluster0-frd8n.mongodb.net/peliculas?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {})
.catch(error => console.log(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/peliculas', peliculasRouter);
app.use('/editar', editarPeliculaRouter);
app.use('/nueva', nuevaPeliculaRouter);
app.use('/eliminar', eliminaPeliculaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
