$(document).ready(function(){

// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

$( ".compose-tweets" ).click(function() {
  $(".new-tweet").toggle();
  $("textarea").focus();
});

$('form').submit(function(event){
  event.preventDefault();
      var text = $('textarea').val();
      if (text.length === 0) {
      alert("you must enter at least 1 character")
    } else if (text.length > 140) {
      alert("tweets cannot be longer than 140 characters")
    } else {
      var form = this;
  $.ajax({
    url: '/tweets',
    method: 'post',
    data: $(form).serialize()
    }).done(function(){
      loadTweets();
      form.reset()
      $(".counter").text(140);
    });
    }

      })


function loadTweets(){
  console.log("loading tweets")
    // $.ajax({
    // url: '/tweets',
    // method: 'GET',
    // success: function(tweets) {
    //   renderTweets(tweets);
    //   console.log('success:', tweets)
    // }
    // })
  $.getJSON('/tweets', renderTweets);
}

$(loadTweets);


function renderTweets(tweets){
  $('.tweets').empty();
  tweets.forEach(function (tweet) {
    var atweet = createTweetElement(tweet);
    $('.tweets').prepend(atweet);
})
}




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

});