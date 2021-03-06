const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
var connect = require('./config/db')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
  res.render('errorPage')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
try {
  await connect();
} catch (error) {
  console.log(error.message);
}

  console.log(`🚀 @ http://localhost:${PORT}`)


});
