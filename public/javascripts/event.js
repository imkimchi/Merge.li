$(document).ready(function(){

  //remove shadow-box when user clicks x button
  $(document).on('click', '.remove', function(e) {
    e.preventDefault();
    $('.modal').remove();
  });
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  $(document).on('click', '.copy_icon', function(e) {
    copyToClipboard($('#shortUrl'));
    $('.shadow-link').animateCss('fadeIn');
  });

  //append .urlinput element when user clicks plus button
  $(document).on('click', '.add', function(e) {
    e.preventDefault();
    var html = '<div class="urlinput"><input type="text" placeholder="" class="default">'
    +'<i class="material-icons add md-36">add</i></div>';
    $('.add').remove();
    $('.urlinput').last().append(($('<i class="material-icons remove md-36">remove</i>')));
    $('.urlinput').last().after(html);
    $('.urlinput').last().animateCss('fadeIn');
  });
  $(document).on('click', '.entypo-twitter', function(e) {
  var width  = 575,
      height = 400,
      left = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  window.open("http://twitter.com/share?text=http://"+$('#shortUrl').text()+" — Link made by ", 'twitter', opts);
  return false;
})

$(document).on('click', '.entypo-facebook', function(e) {
  var width  = 575,
      height = 400,
      left = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  window.open("https://www.facebook.com/sharer/sharer.php?u="+$('#shortUrl').text()+"&amp;src=sdkpreparse", 'facebook', opts);
  return false;
})
$(document).on('click', '.entypo-gplus', function(e) {
  var width  = 575,
      height = 400,
      left = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  window.open("https://plus.google.com/share?url="+$('#shortUrl').text(), 'facebook', opts);
  return false;
})


/*
      $('.IndexBody').arrive('#shortUrl', function(){
        var shortUrl = $('#shortUrl').text();
        var socialTags = ['.entypo-twitter', '.entypo-facebook', '.entypo-gplus'];
        var socialLinks = ["http://twitter.com/share?text=http://"+shortUrl+" — Link made by ",
                           "https://www.facebook.com/sharer/sharer.php?u="+shortUrl+"&amp;src=sdkpreparse",
                           "https://plus.google.com/share?url="+shortUrl];

        for(var i=0; i<3; i++){
          $(socialTags[i]).click(handler(socialLinks, i));
        }

        function handler (socialLinks, i) {
          var width  = 575,
              height = 400,
              left = ($(window).width()  - width)  / 2,
              top    = ($(window).height() - height) / 2,
              opts   = 'status=1' +
                       ',width='  + width  +
                       ',height=' + height +
                       ',top='    + top    +
                       ',left='   + left;
          console.log($(socialTags[i]).length);
          window.open(socialLinks[i], 'facebook', opts);

          return false;
        }
      });
*/
  //remove .urlinput when x button is clicked
  $(document).on('click', '.urlinput > .remove', function(e) {
    e.preventDefault();
    $(this).parent().animateCss('fadeOut');
    var $urlinput = $(this).parent();
    setTimeout(function() { $urlinput.remove(); }, 400);
  })
})


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
