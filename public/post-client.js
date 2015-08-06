$(document).ready(function(){

  var Post = function(){
    this.title;
    this.content;
    this.category;
  };

  Post.prototype.showAllPosts = function(){
    $.ajax({
      context: this,
      type: 'GET',
      url: '/posts',
      success: function(response){
        var html = '';

        response.reverse().forEach(function (post) {
          html += '<div class="list-group">';
          html +=   '<a href="#" class="list-group-item">';
          html +=     '<h3 class="list-group-item-heading">';
          html +=       post.title;
          html +=     '</h3>';
          html +=     '<img src ="'+ post.photo + '" class ="img-responsive">'
          html +=     '<p> post.content </p>'
          html +=     '<p> post.category </p>'
          html +=     '<p class="list-group-item-text"> by '
          // html +=       post.username;
          // html +=       post.user_id;
          html +=     '</p>';
          html +=   '</a>';
          html += '</div>';
        });

        $('#posts').html(html);
      },
      error: function(xhr, status, error){
        console.log(xhr.responseText);
      }
    });   
  }

  Post.prototype.addPost = function(){
    $.ajax({
      context: this,
      type: 'POST',
      url: '/posts',
      data: {
        post: {
          'title': this.title,
          'content': this.content,
          'category': this.category,
          'photo': this.photo,
        }
      }
      success: function(response){
        console.log("post added", response)
      },
      error: function(xhr, status, error){
        console.log(xhr.responseText);
      }
    });  
    post.showAllPosts(); 
  }

  var post = new Post();
  post.showAllPosts();

  $('#addPost').click(function(){
    event.preventDefault();
      post.title = $('#addTitle').val();
      post.content = $('#addContent').val();
      post.category = $('#addCategory').val();
      post.photo = $('#addPhoto').val();

    post.addPost();
  });
});
  // var getAllPosts = function(){
  //   $.ajax({
  //     type: 'GET',
  //     url: '/posts',
  //     success: function(response){
  //       var html = '';

  //       response.reverse().forEach(function (post) {
  //         html += '<div class="list-group">';
  //         html +=   '<a href="#" class="list-group-item">';
  //         html +=     '<h3 class="list-group-item-heading">';
  //         html +=       post.title;
  //         html +=       post.content;
  //         html +=       post.category;
  //         html +=     '</h3>';
  //         html +=     '<p class="list-group-item-text"> by '
  //         html +=       post.username;
  //         html +=       post.user_id;
  //         html +=     '</p>';
  //         html +=   '</a>';
  //         html += '</div>';
  //       });

  //       $('#posts').html(html);
  //     },
  //     error: function(xhr, status, error){
  //       console.log(xhr.responseText);
  //     }
  //   });
  // };

  // getAllPosts();

  // $('#addPost').click(function(){
  //   event.preventDefault();

  //   $.ajax({
  //     type: 'POST',
  //     url: '/posts',
  //     data: {
  //       post: {
  //         message: $('#post input[name="message"]').val()
  //       }
  //     },
  //     dataType: 'JSON',
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     success: function(response){
  //       console.log(response);
  //       getAllTweets();
  //     },
  //     error: function(xhr, status, error){
  //       console.log(xhr.responseText);
  //     }
  //   })
  // });

  // $('#addPost').click(function(){
  //   event.preventDefault();

  //   $.ajax({
  //     type: 'POST',
  //     url: '/posts',
  //     data: {
  //       post: {
  //         message: $('#post input[name="message"]').val()
  //       }
  //     },
  //     dataType: 'JSON',
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     success: function(response){
  //       console.log(response);
  //       getAllTweets();
  //     },
  //     error: function(xhr, status, error){
  //       console.log(xhr.responseText);
  //     }
  //   })
  // });
