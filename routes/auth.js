module.exports = {};
// Auth.authenticated = ...
module.exports.authenticated = function(request, callback) {
  // 1. retrieve session_id from cookie
  var session = request.session.get('allaboutgrowth_session');
  //var session_id = cookie.session_id;

  var message = "Unauthorized access detected. Computer will self-destruct in T-5 seconds."
  var db = request.server.plugins['hapi-mongodb'].db;

  if (!session) {
    return callback({authenticated: false, message: message});
  }

  // 2. look into the DB to find matching session)id
  db.collection('sessions').findOne({ "session_id": session.session_id }, function(err, session) {
    // 3. return true/false
    if (!session) {
      return callback({authenticated: false, message: message});
    }
    callback({authenticated: true, user_id: session.user_id});
  });
};

exports.register.attributes = {
  name: 'auth-route',
  version: '0.0.1'
};