const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const querystring = require('querystring');
require('dotenv').config();


const env = process.env.NODE_ENV || 'development';

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

// connect to mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://kwagi:q4VQtadoiPgXgqBo@cluster0.s1ckl.mongodb.net/kmla_storage?retryWrites=true&w=majority&appName=Cluster0";

// Get the default connection
const db = mongoose.connection;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req.body가 Buffer인 경우 이를 JSON으로 파싱하는 미들웨어
app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body) && req.is('application/json')) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (error) {
      return res.status(400).send('Invalid JSON');
    }
  }
  next();
});

// req.body가 Buffer인 경우 이를 URL-encoded 데이터로 파싱하는 미들웨어
app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body) && req.is('application/x-www-form-urlencoded')) {
    const bodyString = req.body.toString('utf-8');
    req.body = querystring.parse(bodyString);
  }
  next();
});

app.use(logger(env === 'development'? 'dev' : 'combined'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* app.use(credentials);
app.use(cors(corsOptions)); */
app.use(cors({
  origin: env === 'development'? 'http://localhost:5173' : 'https://kmla-warehouse.netlify.app',
  credentials: true,
  
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// API routes
app.use('/api', apiRouter);

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
  // res.render('error');
  res.send(err);
});

module.exports = app;
