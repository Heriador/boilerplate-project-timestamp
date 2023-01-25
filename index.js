// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//api Date

//Test: 1674680950

app.get('/api/:date?', (req, res) => {
  let unixtimestamp = req.params.date;
  let DateObject;

  if (unixtimestamp === undefined) {
    DateObject = new Date();

    return res.json({
      unix: DateObject.valueOf(),
      utc: DateObject.toGMTString(),
    });
  }

  if (!isNaN(unixtimestamp)) {
    unixtimestamp = Number(unixtimestamp);

    if (unixtimestamp.toString().length <= 10) {
      unixtimestamp *= 1000;
    }
  }

  DateObject = new Date(unixtimestamp);

  if (DateObject.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: DateObject.valueOf(),
    utc: DateObject.toGMTString(),
  });
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
