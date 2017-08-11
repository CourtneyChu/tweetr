
$(document).ready(function(){ //jquery start
    var count = 140;
    $("textarea").keyup(function(){
      var text = $('textarea').val();
      var len = text.length;
      var newLen = (count-len);
      if (newLen < 0) {
         $(".counter").html(newLen);
         $(".counter").css('color','#ff0000');
      } else {
         $(".counter").html(newLen);
         $(".counter").css('color','grey');
      }
    });
});//end jquery

