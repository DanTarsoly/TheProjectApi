const express = require('express');
const path = require('path');
const logger = require('morgan');
require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const placesRouter = require('./routes/places');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');
require('./services/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);
app.use('/auth', authRouter);

// Handling not supported paths
app.use((req, res) => {
  return res.status(404).json({message: "Not supported"});
});

// Error handling
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed'){
    return res.status(400).json({ message: 'Invalid request body' })
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID: ' + err.value})
  }
  if (err.name === 'ValidationError') {
    let message = '';
    Object.keys(err.errors).forEach(member => {
      message += err.errors[member].message + ', ';
    });
    message = message ? message.substring(0, message.length -2) : null;
    return res.status(400).json({ message: message || 'Server error' });
  }
  if (err.name === 'MongoError') {
    switch (err.code){
      case 2: return res.status(400).json({message: 'Invalid query parameters'});
    }
  }
  console.error(err);
  if (req.app.get('env') === 'development'){
    return res.status(err.status || 500).json(err);
  }
  return res.status(err.status || 500).json({ message: 'Server error' });
});

module.exports = app;
