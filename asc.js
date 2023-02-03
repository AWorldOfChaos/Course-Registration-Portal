var express = require('express');
var app = express();
app.use(express.json())
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require("cors");
app.use(cors());

var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

// Database Connection
const  client  =  require("./configs/database");

client.connect((err) => { 
   if (err) {
      console.log(err); 
   }
   else {
      console.log("Data logging initiated!");
   }
});

// Users
const  user  =  require("./routes/user");

app.use("/user",  user); 

const home = require("./controllers/home");
const courses = require('./controllers/courses');
const departments = require('./courses/departments');
const department_course = require('./courses/department_course');
const course_info = require('./courses/course_info');
const instructor = require('./instructor/instructor_info');

//
app.get('/user/login/', function (req, res) {
   res.sendFile( __dirname + "/" + "login_form.html" );
})

app.get('/user/register/', function (req, res) {
    res.sendFile( __dirname + "/" + "register_form.html" );
 })

//
app.get('/home', function (req, res) {
   var message = req.session.message;
   home.student_details(req, res);
})

app.get('/home/registration', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.get('/course/running', function(req, res) {
   departments.department_list(req, res);
})

app.get('/course/running/:dept_id', function(req, res) {
   departments.department_list(req, res);
})

app.get('/course/:course_id', function (req, res) {
   course_info.course_info(req,res);
})

app.get('/instructor/:instructor_id', function (req, res) {
   instructor.instructor_info(req, res);
})

app.get('/courses', function(req, res) {
   courses.course_list(req, res);
})

app.get('/deptcourses', function(req, res) {
   department_course.department_course_list(req, res);
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})