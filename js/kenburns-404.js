/*
 * Slideshow - 404 Page
 * Build Date: October 2016
 * Author: joashp
 */

(function ($) {
  $(window).load(function() {
      var slides = [];
      getImage(function(url) {
        slides.push({src: url});
        getImage(function(url) {
          slides.push({src: url});
          getImage(function(url) {
            slides.push({src: url});
            getImage(function(url) {
              slides.push({src: url});
              getImage(function(url) {
                slides.push({src: url});
                done();
              });
            });
          });
        });
      });

      var index = 0;
      function done() {
        console.log(new Date().getSeconds());
        $(".kenburns").css('background-image', 'url("' + slides[index].src + '")');
        index++;
        if (index >= slides.length) {
          index = 0;
        }
        // preload image
        $('<div>')
          .css('background-image', 'url("' + slides[index].src + '")')
          .appendTo($(".kenburns"));

        setTimeout(done, 30000);
      }
  });

  var tryCount = 0;
  var targetDate = new Date();
  function getImage(callback) {
    var date = targetDate.toISOString().slice(0, 10);
    // Set targetDate to previous day
    targetDate.setDate(targetDate.getDate() - 1);
    var year = date.slice(0, 4);
    $.ajax('https://api.dailyrandomphoto.com/' + year + '/' + date + '.json')
      .done(function(data) {
        var imgUrl = data.photo.urls.regular;
        callback(imgUrl);
      })
      .error(function() {
        tryCount++;
        if (tryCount <= 5) {
          // Try again
          getImage(callback);
        }
      });
  }

})(jQuery);
