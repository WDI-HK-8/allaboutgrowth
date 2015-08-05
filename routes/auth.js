module.exports = {};

// Auth.authenticated = ...
module.exports.authenticated = function(request, callback) {
  // 1. retrieve session_id from cookie
  var session = request.session.get('allaboutgrowth_session');
  var db      = request.server.plugins['hapi-mongodb'].db;

  var errorMsg = "Unauthorized access detected. Computer will self-destruct in T-5 seconds.";
  
  if (!session) {
    return callback( {authenticated: false, message: errorMsg} );
  }
  
  // 2. look into the DB to find matching session)id
  db.collection('sessions').findOne({ session_id: session.session_id }, function(err, session) {
    // 3. return true/false
    if (session === null) {
      return callback({authenticated: false, message: errorMsg});
    } else {
      callback({authenticated: true, user_id: session.user_id});  
    }
  });
};

