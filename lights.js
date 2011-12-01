// Calculate the actual width
function absolute_width_of(element) {
  var w = 0;
  w += $(element).width();
  w += parseInt($(element).css('border-left-width'), 10);
  w += parseInt($(element).css('border-right-width'), 10);
  w += parseInt($(element).css('padding-left'), 10);
  w += parseInt($(element).css('padding-right'), 10);
  w += parseInt($(element).css('margin-left'), 10);
  w += parseInt($(element).css('margin-right'), 10);
  return w;
}
// Calculate the actual height
function absolute_height_of(element) {
  var h = 0;
  h += $(element).height();
  h += parseInt($(element).css('border-top-width'), 10);
  h += parseInt($(element).css('border-bottom-width'), 10);
  h += parseInt($(element).css('padding-top'), 10);
  h += parseInt($(element).css('padding-bottom'), 10);
  h += parseInt($(element).css('margin-top'), 10);
  h += parseInt($(element).css('margin-bottom'), 10);
  return h;
}

function christmas_lights(element) {
  var colors = [{on: "FF0000", off: "A20000"}, 
                {on: "F700FF", off: "910196"}, 
                {on: "1E00FF", off: "10008D"}, 
                {on: "00FF2A", off: "007E15"}, 
                {on: "FFA200", off: "815200"}, 
                {on: "FFFFFF", off: "8D8D8D"}];
  
  var x = Math.floor($(element).position().top);
  var y = Math.floor($(element).position().left);
  var w = absolute_width_of(element);
  var h = absolute_height_of(element);
  
  var x_times = Math.floor(h / 15);
  var y_times = Math.floor(w / 16);
  var color_count_i = 0;
  var color_count_j = 0;
  var color_count_k = 0;
  var color_count_l = 0;
  
  // LEFT
  for(var i = 0; i < x_times; i++) {
    if(color_count_i >= colors.length) {
      color_count_i = 0;
    }
    var color = colors[color_count_i];
    color_count_i++;
    var light = $('<div class="xmaslight" data-state="off" rel="c'+color_count_i+'"></div>');
    light.css({
      "background-color": "#" + color.off,
      "top": (x + (i * 15) + i - 2) + "px",
      "left": (y - 2) + "px"
    });
    $('body').append(light);
  }
  
  // TOP
  for(var j = 0; j < y_times; j++) {
    if(color_count_j >= colors.length) {
      color_count_j = 0;
    }
    var color = colors[color_count_j];
    var light = $('<div class="xmaslight" data-state="off" rel="c'+color_count_j+'"></div>');
    color_count_j++;
    light.css({
      "background-color": "#" + color.off,
      "top": (x - 2) + "px",
      "left": (y + (j * 15) + j - 2) + "px"
    });
    $('body').append(light);
  }
  
  // RIGHT
  for(var k = 0; k < x_times; k++) {
    if(color_count_k >= colors.length) {
      color_count_k = 0;
    }
    var color = colors[color_count_k];
    var light = $('<div class="xmaslight" data-state="off" rel="c'+color_count_k+'"></div>');
    color_count_k++;
    light.css({
      "background-color": "#" + color.off,
      "top": (x +(k * 15) + k - 2) + "px",
      "left": (y + w - 2) + "px"
    });
    $('body').append(light);
  }
  
  // BOTTOM
  for(var l = 0; l < y_times; l++) {
    if(color_count_l >= colors.length) {
      color_count_l = 0;
    }
    var color = colors[color_count_l];
    var light = $('<div class="xmaslight" data-state="off" rel="c'+color_count_l+'"></div>');
    color_count_l++;
    light.css({
      "background-color": "#" + color.off,
      "top": (x + h - 2) + "px",
      "left": (y + (l * 15) + l - 2) + "px"
    });
    $('body').append(light);
  }
  
  // For some reason the 0 index only gets run once
  function start_lights(i) {
    setInterval(function() {
      var el = $('.xmaslight[rel=c'+i+']');
      if($(el).attr("data-state") == "off") {
        $(el).css({"background-color": "#" + colors[i].on});
        $(el).attr("data-state", "on");
      } else {
        $(el).css({"background-color": "#" + colors[i].off}); 
        $(el).attr("data-state", "off");
      }
    }, 500);

    if(i < colors.length - 1) {
      setTimeout(function() {
        start_lights(++i);
      }, 500);
    }
  }
  start_lights(0);
  
}


$(function() {
  christmas_lights($('#container')[0]);
});