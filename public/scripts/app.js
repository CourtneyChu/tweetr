$(document).ready(function(){

  $( ".compose-tweets" ).click(function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  function createTweetElement(tweet) {
    return `<article class="tweet module">
            <header class="module-header">
              <img class="tweet-avatar" src=${tweet.user.avatars.small}>
              <span class="tweet-name module-title">${tweet.user.name}</span>
              <span class="tweet-handle">${tweet.user.handle}</span>
            </header>
            <main class="module-body">
              <div class="tweet-text">${tweet.content.text}</div>
            </main>
            <footer class="module-footer tweet-meta">
              <span class="tweet-timestamp">${tweet.created_at}</span>
              <span class="tweet-actions">
                <a href="#" class="tweet-action">Like</a>
                <a href="#" class="tweet-action">Report</a>
                <a href="#" class="tweet-action">Retweet</a>
              </span>
            </footer>
          </article>
        `;
  }

  function renderTweets(tweets){
    $('.tweets').empty();
    tweets.forEach(function (tweet) {
      var atweet = createTweetElement(tweet);
      $('.tweets').prepend(atweet);
    });
  }


  function loadTweets(){
    $.getJSON('/tweets', renderTweets);
  }

  $(loadTweets);

  $('form').submit(function(event){
    event.preventDefault();
    var text = $('textarea').val();
    if (text.length === 0) {
      alert("you must enter at least 1 character");
    } else if (text.length > 140) {
      alert("tweets cannot be longer than 140 characters");
    } else {
      var form = this;
      $.ajax({
        url: '/tweets',
        method: 'post',
        data: $(form).serialize()
      }).done(function(){
        loadTweets();
        form.reset();
        $(".counter").text(140);
      });
    }
  });


});