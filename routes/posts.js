var Bcrypt = require('bcrypt');
var Joi = require('joi');
var Auth = require('./auth');

exports.register = function(server, options, next){

  server.route([
    // POST a post
    {
      method: 'POST',
      path: '/posts',
      config: {
        handler: function(request, reply){
          Auth.authenticated(request, function(result){
            if (result.authenticated) {
              var db       = request.server.plugins['hapi-mongodb'].db;
              var session = request.session.get('hapi_twitter_session');
              var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

              var post = {
                // .title & .content from client
                // TEST BY reply(post / request.payload.post)
                'title':    request.payload.post.title,
                'content':  request.payload.post.content,
                'category': request.payload.post.category,
                'photo':    request.payload.post.photo,
                //'username': ObjectId(result.username), 
                // "date": new Date(), do when we have the frontend
                'user_id': ObjectId(result.user_id)
                //'user_id': session.user_id ??
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
              content:    Joi.string().min(1).max(140).required(),
              title:      Joi.string().min(1).max(140).required(),
              category:   Joi.string().min(1).max(140).required(),
              photo:      Joi.string().min(1).max(140).allow()
            }
          }
        }
      }
    },
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
    // GET one post
    {
      method: 'GET',
      path: '/posts/{id}',
      handler: function(request, reply){
        var post_id = encodeURIComponent(request.params.id);
        // .id retrieve from path , path from window's browser url? 
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID; 
        db.collection('posts').findOne({_id: ObjectId(post_id)}, function(err,post){
          if (err) {return reply('Internal MongoDB error', err);}

          reply(post);
        });
      }
    },
    // {
    //   // Retrieve all posts by a specific user
    //   method: 'GET',
    //   path: '/users/{username}/posts',
    //   handler: function(request, reply) {
    //     var db = request.server.plugins['hapi-mongodb'].db;
    //     var session = request.session.get('hapi_twitter_session');
    //     var username = encodeURIComponent(request.params.username);

    //     db.collection('users').findOne({ "username": username }, function(err, user) {
    //       if (err) { return reply('Internal MongoDB error', err); }

    //         db.collection('posts').find({'user_id': user._id}).toArray(function(err, posts) {
    //           if (err) { return reply('Internal MongoDB error', err); }

    //             reply(posts);
    //       });
    //     })
    //   }
    // }

  ]);

next();
}

exports.register.attributes = {
  name: 'posts-routes',
  version: '0.0.1'
}