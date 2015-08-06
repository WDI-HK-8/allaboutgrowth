$(document).ready(function(){

  var Account = function(){
  };

  Account.prototype.signUp = function(username, email, password){
    $.ajax({
      context: this,
      type: 'POST',
      url: '/users',
      data: {
        user: {
          email: email.val(),
          username: username.val(),
          password: password.val()
        }
      },
      dataType: 'JSON',
      success: function(response){
        console.log("Create Account",response);
      }
    });

    $('#signUpSubmit').click(function(){
      event.preventDefault();
      console.log('hello signup');
      var email = $('.signUp > input[id="email"]');
      var username = $('.signUp > input[id="username"]');
      var password = $('.signUp > input[id="password"]');

      account.signIn(username,password);
    });
  };

  Account.prototype.signIn = function(username,password){
    $.ajax({
      context: this,
      type: 'POST',
      url: '/sessions',
      data: {
        user: {
          username: username.val(),
          password: password.val()
        }
      },
      dataType: 'JSON',
      success: function(response){
        console.log("Account logged in",response);
      }
    });
  };
  Account.prototype.signOut = function(){
    $.ajax({
      type: 'DELETE',
      url: '/sessions',
      dataType: 'JSON',
      success: function(response){
        console.log(response);
        // this.checkLogin();
      },
      error: function(response) {
        console.log(response);
      }
    });
  };

  var account = new Account();

  $('#signUpSubmit').click(function(){
    event.preventDefault();
    console.log('hello signup');
    var email = $('.signUp > input[id="email"]');
    var username = $('.signUp > input[id="username"]');
    var password = $('.signUp > input[id="password"]');

    account.signUp(username,email,password);
  });

  $('#signInSubmit').click(function(){
    event.preventDefault();
    console.log('hello signin');
    var username = $('.signIn > input[id="siusername"]');
    var password = $('.signIn > input[id="sipassword"]');

    account.signIn(username,password);
  });

  $('#signOut').click(function(){
    event.preventDefault();
    console.log('hello signout');

    account.signOut();
  });
  // $('#signUpSubmit').click(function(){
  //   event.preventDefault();
  //   console.log('hello signup');
  //   var email = $('.signUp > input[id="email"]');
  //   var username = $('.signUp > input[id="username"]');
  //   var password = $('.signUp > input[id="password"]');

  //   $.ajax({
  //     type: 'POST',
  //     url: '/users',
  //     data: {
  //       user: {
  //         email: email.val(),
  //         username: username.val(),
  //         password: password.val()
  //       }
  //     },
  //     dataType: 'JSON',
  //     success: function(response){
  //       console.log(response);
  //     }
  //   });
  // });


  // $('#signInSubmit').click(function(){
  //   event.preventDefault();
  //   console.log('hello signin');
  //   var username = $('.signIn > input[id="siusername"]');
  //   var password = $('.signIn > input[id="sipassword"]');

  //   $.ajax({
  //     type: 'POST',
  //     url: '/sessions',
  //     data: {
  //       user: {
  //         username: username.val(),
  //         password: password.val()
  //       }
  //     },
  //     dataType: 'JSON',
  //     success: function(response){
  //       console.log(response);
  //     }
  //   });
  // });
  

  // $('#signOut').click(function(){
  //   event.preventDefault();
  //   console.log('hello signout');

  //   $.ajax({
  //     type: 'DELETE',
  //     url: '/sessions',
  //     dataType: 'JSON',
  //     success: function(response){
  //       console.log(response);
  //       // this.checkLogin();
  //     },
  //     error: function(response) {
  //       console.log(response);
  //     }
  //   });
  // });

});