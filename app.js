const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// 🧨 CONNECT TO MONGODB ATLAS 🧨
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB CONNECTED!'))
  .catch(err => console.log(err));

// 🔥 ROUTES 🔥
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

// 🔥 MIDDLEWARE 🔥
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(morgan('dev'));

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized!'});
  }
});

// 🧨 SERVER 🧨
const PORT = process.env.PORT || 4000;

app.listen(4000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`APP LISTENING ON ${PORT}`);
  }
});
