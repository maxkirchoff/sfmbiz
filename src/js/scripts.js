(function ($, window, document, undefined) {

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var bgNum = getRandomInt(3) + 1;

  $('body').addClass('sfm' + bgNum);

  $(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(!isChrome){
      $('#iframeAudio').remove()
    }
    else{
       $('#playAudio').remove() //just to make sure that it will not have 2x audio in the background
    }
  });

  function SetupCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'pink';
    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    function mouseMove(evt) {
      var mousePos = getMousePos(canvas, evt);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    }

    canvas.addEventListener('mousedown', function(evt) {
      $('h1').blur();
      var mousePos = getMousePos(canvas, evt);
      ctx.beginPath();
      ctx.moveTo(mousePos.x, mousePos.y);
      evt.preventDefault();
      canvas.addEventListener('mousemove', mouseMove, false);
    });

    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', mouseMove, false);
    }, false);

    document.getElementById('reset').addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, false);

    var colors = ['purple', 'yellow', 'pink', 'black', 'white'];

    function listener(i) {
      document.getElementById(colors[i]).addEventListener('click', function() {
        ctx.strokeStyle = colors[i];
      }, false);
    }
    for(var i = 0; i < colors.length; i++) {
      listener(i);
    }
  }

  var canvas = document.getElementById('art');

  $(canvas).attr('width', $(window).width());
  $(canvas).attr('height', $(window).height());
  SetupCanvas(canvas);

  $(window).on('resize', function(){
    $(canvas).attr('width', $(window).width());
    $(canvas).attr('height', $(window).height());
  });


})(jQuery, window, document);
