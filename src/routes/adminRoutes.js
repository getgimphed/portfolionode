var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

    adminRouter.route('/addProjects')
    .get(function(req,res){
        url = "mongodb://localhost:27017/projectApp";
        mongodb.connect(url,function(err,db){
            var collection = db.collection('projects');
            collection.insertMany(projects,function(err,results){
                res.send(results);
                console.log(err);
                db.close();             // To be done here and not down
            }); 
        });                             // not here .. as async.. and database will be closed before operations
    });

module.exports = adminRouter;