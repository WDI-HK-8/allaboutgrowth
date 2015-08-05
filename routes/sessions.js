var Joi = require('joi');
var Bcrypt = require('bcrypt');
var Auth = require('./auth');

exports.register = function(server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/sessions',
      handler: function(request,reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        // email authentication ??? what's userMongo? = input? 
        var user = {
          "username": request.payload.user.username,
          "password": request.payload.user.password
        };
        db.collection('users').findOne({"username": user.username}, function(err, userMongo){
          if (err) {return reply('Internal MongoDB error', err);}
          if (userMongo === null) {
            return reply({"message": "user doesn't exist"});
          }
          Bcrypt.compare(user.password, userMongo.password, function(err, result){
            // if pwd matches, authenticae user and add to cookie
            if (result){
              function randomKeyGenerator(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
              }
              var randomKey = randomKeyGenerator();
              //var db = request.server.plugins['hapi-mongodb'].db;
              var newSession = {
                session_id: randomKey,
                user_id: userMongo._id
              };
              db.collection('sessions').insert(newSession,function(err, result){
                if (err) {
                  return reply('internal MongoDB error, error');
                }
                // store session in browser cookie ? what's message?  
                return reply ({'message:':"Authenticated"});
              });
            } else {
              reply({message: "Not authroized"});
            }
          });
        })
      }
    }, 
    {
      method: 'DELETE',
      path: '/sessions',
      handler: function(request, reply) {
        var session = request.session.get('allaboutgrowth_session');
        var db = request.server.plugins['hapi-mongodb'].db;

        if (!session) { 
          return reply({ "message": "Already logged out" });
        }

        db.collection('sessions').remove({ "session_id": session.session_id }, function(err, writeResult) {
          if (err) { return reply('Internal MongoDB error', err); }
          // whats writeresult
          reply(writeResult);
        });
      }
    }
  ])
  next();
};

exports.register.attributes = {
  name: 'sessions-route',
  version: '0.0.1'
};