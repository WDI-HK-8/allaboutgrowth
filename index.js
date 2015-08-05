// Require hapi
var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();



// Configure server connections
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000, // What is process.env.PORT? It's an environment variable prepared by Heroku Deployment
  routes: {
    cors: {
      headers: ["Access-Control-Allow-Credentials"],
      credentials: true
    } 
  }
});

// Require MongoDB
var plugins = [
  { register: require('./routes/users.js')},
  { register: require('./routes/sessions.js')},  
  { register: require('./routes/static-pages.js')},
  { register: require('hapi-mongodb'),
    options: {
      url: process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/allaboutgrowth",
      settings: {
        db: {
          "native_parser": false
        }
      }
    }
  },
  {
    register: require('yar'),
    options: {
      cookieOptions: {
        password: process.env.COOKIE_PASSWORD || 'timtimtim',
        isSecure: false // we are not going to https, yet, for development
      }
    }
  }
];

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname,'templates')
});

// Start server if there's no error in code
server.register(plugins, function (err) {
  if (err) {
    throw err;
  }

  server.start(function() {
    console.log('info', 'Server running at: ' + server.info.uri);
  });
});

