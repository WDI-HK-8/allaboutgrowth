$(document).ready(function(){

  $('#signUpSubmit').click(function(){
    event.preventDefault();
    console.log('hello');
    var email = $('.signUp > input[id="email"]');
    var username = $('.signUp > input[id="username"]');
    var password = $('.signUp > input[id="password"]');

    debugger
    $.ajax({
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
        console.log(response);
      }
    });
  });


});