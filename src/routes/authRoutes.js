var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
authRouter.route('/signUp')
	.post(function(req,res){
		var url = "mongodb://localhost:27017/projectApp";
		mongodb.connect(url,function(err,db){
			var collection = db.collection('users');
			var user = {
				username:req.body.username,
				password:req.body.password
			};
			collection.insert(user,function(err,results){
				req.login(results.ops[0],function(){
					res.redirect('/auth/profile');
				});
			});
		});
	});
authRouter.route('/profile')
	.all(function(req,res,next){
		if(!req.user){
			res.redirect('/');
		}
		next();
	})
	.get(function(req,res){		
		res.json(req.user);

	});
authRouter.route('/signIn')
	.post(passport.authenticate('local',{
			failureRedirect: '/'
		}),function(req,res){
			res.redirect('/auth/profile');
	});
module.exports = authRouter;


// var authRoute = function(){
// 	authRouter.route('signUp')
// 		.post(function(res,req){
// 			console.log(res.body);
// 		});
// 	return authRouter;
// };
// module.exports = authRoute;

// The above way not working.. Dont know why !!