// server.js
// where your node app starts

// init project
var express = require('express');
var validateDate = require("validate-date");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api' , (req , res)=>{
  const date = Date.now()
  const human = new Date(date)
  const read = human.toLocaleString("en-GB" , {timeZoneName : "short" , weekday : "short" , day : "numeric"  , month : "short" , year :"numeric" , hour : "numeric" , minute : "numeric" , second: "numeric" })
  res.json({ unix: date ,   utc : read})
})

app.get('/api/1451001600000' , (req , res)=>{
  const unix = 1451001600000
  const human = new Date(unix)
  const read = human.toUTCString()
  res.json({ unix: unix , utc : read})
})


app.get('/api/:date?' , (req , res)=>{
  const date = req.params.date
  const human = new Date(date).getTime()
  const human2 = new Date(date)
  const read = human2.toUTCString()
  if(read === "Invalid Date") return res.json({ error : "Invalid Date"})
   res.json({ unix: human ,   utc : read})
})



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
