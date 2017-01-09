
$('button').click(function(e){
  console.log('a');
  var linkarr = [];
  var $input = $('.default');
  var isValidUrl = /[0-9a-z_-]+\.[0-9a-z_-][0-9a-z]/;
  var blnIsValid = true;

  $input.each(function() {
    var inputVal = $(this).val();
    if(!isValidUrl.test(inputVal)) {
      $(this).parent().animateCss('shake');
      blnIsValid = false;
      return false;
    }
    if(inputVal) linkarr.push(inputVal);
  });

  e.preventDefault();
  if(blnIsValid) {
    $.ajax({
      url: '/api/compress',
      type: 'POST',
      dataType: 'JSON',
      data: {url: linkarr},
      success: function(data){
          var resultHTML = '<div class="modal"><div class="shadow-box"><div class="shadow-header"><i class="material-icons remove md-36">clear</i></div>'+
          '<div class="shadow-content"><div class="shadow-wrapper"><div class="shadow-link"><a target="_blank" href="http://'+data.shortUrl +'" id="shortUrl">'+ data.shortUrl + '</a>'+
        '</div><i class="material-icons copy_icon">content_copy</i></div><div class="social_media"><ul><li class="entypo-twitter"></li><li class="entypo-facebook"></li><li class="entypo-gplus"></li></div></div></div>';
          $('.IndexBody').append(resultHTML);
          $('.modal').animateCss('fadeIn');
          $('.default').blur().val('');
      }
    });
  }
  });
