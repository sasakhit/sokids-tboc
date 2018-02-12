const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3001));
app.listen(app.get("port"), () => {
  console.log("Listening on port: " + app.get("port"));
});

// Route includes
var tboc = require('./server/routes/tboc');
//var sns = require('./server/routes/sns');

// Routes
app.use('/tboc', tboc);
//app.use('/sns', sns);

// Static files
app.use('/public', express.static('./public'))
app.use('/login', express.static('./public'))
app.use('/signup', express.static('./public'))
app.use('/home', express.static('./public'))
app.use('/admin', express.static('./public'))
app.use('/', express.static('./public'))
