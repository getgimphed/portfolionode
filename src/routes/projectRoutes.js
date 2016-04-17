var express = require('express');
var projectRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
    
var projectRoute = function(projects){
    projectRouter.route('/')
    .get(function(req,res){
        var url = "mongodb://localhost:27017/projectApp";
        mongodb.connect(url,function(err,db){
            var collection =  db.collection('projects');
            collection.find({}).toArray(
                function(err,results){
                    res.render("projectsView", {
                    title: 'My Projects | Gimphy',
                    portfolio: results
                });   
            });
        });
        // res.render('projectsView',{
        //     title: 'My Projects | Gimphy',
        //     portfolio : projects
        // });
    });

    projectRouter.route('/:id')
    .get(function (req, res) {
        var id = new objectId(req.params.id);
        var url="mongodb://localhost:27017/projectApp";
            mongodb.connect(url,function(err,db){
                var collection = db.collection('projects');
                collection.findOne({_id:id},
                    function(err,result){
                        res.render('projectView',{
                            title:'Title Single Page',
                            project : result
                        });
                    });
            });
    });
    
    return projectRouter;
}
module.exports = projectRoute;

//Cognizance
//07611010804
    
    // var projects = [{
    //     Link: '/projects/1',
    //     Project: 'MBM'
    //         }, {
    //     Link: '/projects/2',
    //     Project: 'Encarta 2K15'
    //         }, {
    //     Link: '/projects/3',
    //     Project: 'IAMGCON'
    //         }];

    // projectRouter.route('/')
    // .get(function (req, res) { 
    //     res.render("projectsView", {
    //         title: 'My Projects | Gimphy',
    //         portfolio: projects
    //     });
    // });
    