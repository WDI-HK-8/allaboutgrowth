$(document).ready(function(){

  $('#signUpSubmit').click(function(){
    event.preventDefault();

    var email = $('#signUp > input[id="signUpEmail"]');
    var username = $('#signUp > input[id="signUpUsername"]');
    var password = $('#signUp > input[id="signUpPassword"]');

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