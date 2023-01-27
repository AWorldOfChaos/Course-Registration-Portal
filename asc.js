var express = require('express');
var app = express();
app.use(express.static('public'));

//
app.get('/login/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/verifylogin/', function (req, res) {
    console.log(req.query.student_id, req.query.password);
    res.sendFile( __dirname + "/" + "index.html" );
 })

//
app.get('/home/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// 
app.get('/home/registration', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// 
app.get('/course/:course_id', function (req, res) {
   console.log("");
   res.send('id: ' + req.query.course_id);
})

// 
app.get('/instructor/:instructor_id', function (req, res) {
   console.log("");
   res.send('id: ' + req.query.id);
})

// 
app.get('/', function(req, res) {   
   console.log("");
   res.send('Page Pattern Match');
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})