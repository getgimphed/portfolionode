var express = require('express');
var app = express();
var port = 8080;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

// For Post Requests 
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// For Auth
app.use(cookieParser());
app.use(session({
    secret:'portfolio',
    resave : true,
    saveUninitialized: true
}));
require('./src/config/passport')(app);

app.use(express.static('./public'));

app.set('views', './src/views');
app.set('view engine', 'ejs'); 
   
var projects = [{
            Link: '/projects/1',
            Project: 'MBM'
        }, {
            Link: '/projects/2',
            Project: 'Encarta 2K15'
        }, {
            Link: '/projects/3',
            Project: 'IAMGCON'
        }];

var projectRouter = require('./src/routes/projectRoutes')(projects);
var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');

app.use('/projects', projectRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Vedant Jain | Gimphy',
        list: ['Dream', 'Design', 'Develop'],
        portfolio: projects
    });     
});

app.listen(port, function (err) {
    console.log('listening to ' + port);

});

// Three steps to define a custom route
// var projectRouter = express.Router();
// projectRouter.route('/')
//    .get(function (req, res) {
//        res.render("projects", {
//            title: 'My Projects | Gimphy',
//            portfolio: [{
//                Link: '/projects/1',
//                Project: 'MBM'
//        }, {
//                Link: '/projects/2',
//                Project: 'Encarta 2K15'
//        }, {
//                Link: '/projects/3',
//                Project: 'IAMGCON'
//        }]
//        });
//    });