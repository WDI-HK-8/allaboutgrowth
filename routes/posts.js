var Joi = require('joi');
var Auth = require('./auth');

exports.register = function(server, options, next){

  server.route([
    // GET all posts
    {
      method: 'GET',
      path: "/posts",
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('posts').find().toArray(function(err,posts){
          if (err) {return reply('Internal MongoDB error', err);}

          reply(posts);
        })
      }
    },
    {
      // Retrieve all tweets by a specific user
      method: 'GET',
      path: '/users/{username}/posts',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var username = encodeURIComponent(request.params.username);

        db.collection('users').findOne({ "username": username }, function(err, user) {
          if (err) { return reply('Internal MongoDB error', err); }

          db.collection('posts').find({ "user_id": user._id }).toArray(function(err, posts) {
            if (err) { return reply('Internal MongoDB error', err); }

            reply(posts);
          });
        })
      }
    }
    // GET one post
    {
      method: 'GET',
      path: "/posts/{id}",
      handler: function(request, reply){
        var post_id = encodeURIComponent(request.params.id);
        var db = request.server.plugins['hapi-mongodb'].db;
        //ObjectId = key & ObjectID = function ?
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID; 

        db.collection('posts').findOne({_id: ObjectId(postID)}, function(err,post){
          if (err) {return reply('Internal MongoDB error', err);}

          reply(post);
        });
      }
    },
    // POST a post
    {
      method: 'POST',
      path: '/posts',
      config: {
        handler: function(request, reply){
          Auth.authenticated(request, function(result){
            if (result.authenticated) {
              var db = request.server.plugins['hapi-mongodb'].db;

              var post = {
                "message": request.payload.post.message,
                // "date": new Date(), do when we have the frontend
                "user_id": result.user_id
              };

              db.collection('posts').insert(post, function(err,writeResult){
                if (err) {return reply('Internal MongoDB error', err);}

                reply(writeResult);
              });

            } else {
              reply(result.message);
            }
          })
        },
        validate: {
          payload: {
            post: {
              message: Joi.string().min(1).max(140).required()
            }
          }
        }
      }
    }
  ]);

next();
}

exports.register.attributes = {
  name: 'posts-routes',
  version: '0.0.1'
}