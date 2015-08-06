exports. register = function(server, options, next) {
  server.route([
    {
      //Retrieve all users 
      method: 'GET',
      path: '/',
      handler: function(request,reply) {
        reply.view('index');
      }
    },
    {
      //Retrieve all users 
      method: 'GET',
      path: '/userPosts', // web url
      handler: function(request,reply) {
        reply.view('posts'); // link to posts.html
      }
    },
    {
      method: 'GET',
      path: '/public/{path*}',
      // application.js & css.js
      handler: {
        directory: {
          path: 'public'
        }
      }
    }
  
  ])
  next();
};

exports.register.attributes = {
  name: 'static-pages-route',
  version: '0.0.1'
}