var Joi = require('joi');
var Bcrypt = require('bcrypt');

exports.register = function(server, options, next){
  server.route([
    {
      method: 'POST',
      path: '/users',
      config: {
        handler: function(request, reply){
          // Now, add the new user into the database
          var db   = request.server.plugins['hapi-mongodb'].db;
          // Get user input parameters (username, email, password)
          var user = request.payload.user;
          // var user = {
          //   username: request.payload.user.username,
          //   email:    request.payload.user.email,
          //   password: request.payload.user.password,
          //   bio: request.payload.user.bio,
          //   profilepic: request.payload.user.profilepic
          // };
          // Check if there is an existing user with the same username or the same email address
          var uniqUserQuery = { 
            $or: [
              {username: user.username}, 
              {email: user.email}
            ] 
          };
          db.collection('users').count(uniqUserQuery, function(err, userExist){
              if (userExist) {
                return reply('Error: Username or Email already exist', err);
              }
        // encrypt         
            Bcrypt.genSalt(10, function(err, salt) {
              Bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                // Store hash in your password DB.
                db.collection('users').insert(user, function(err, writeResult) {
                  if (err) { return reply('Internal MongoDB error', err); }
                  reply(writeResult);
                });
              })
            })
          });
        },
        validate: {
          payload: {
            user: {
              username:   Joi.string().max(20).required(),
              email:      Joi.string().max(40).required(),
              password:   Joi.string().min(5).max(20).required(),
              bio:        Joi.string(),
              profilepic: Joi.string()
            }
          }
        }
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'users-route',
  version: '0.0.1'
};
