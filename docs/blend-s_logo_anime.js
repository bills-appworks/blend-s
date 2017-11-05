/**
 * @fileoverview 「ブレンド・S」オープニング風ロゴアニメーションジェネレータ
 * @author twitter:@billstw
 */

$(function() {
  // font
  //   Google Font Questrial
  //   font-style font-variant font-weight font-size[/line-height] font-family
  var animation_definition_json = function(){/*
    {
      "rendering_fps": 30,
      "gif_rendering_fps": 24,
      "total_frames": 20,
      "adjust_margin": 40,
      "bottom_margin": 30,
      "font": {
        "call_capital":     "normal normal 400 100pt Questrial",
        "call_non_capital": "normal normal 100  60pt Questrial",
        "attribute":        "normal normal 100  30pt Questrial",
        "name":             "normal normal 100  13pt Questrial"
      },
      "text_width_ratio": {
        "call_capital":     0.9,
        "call_non_capital": 0.9,
        "attribute":        0.7,
        "name":             0.6
      },
      "text_letter_spacing": {
        "call_capital":     "0.5em",
        "call_non_capital": "0.5em",
        "attribute":        "0.3em",
        "name":             "0.2em"
      },
      "step": {
        "call_capital":
          [ 0,  1,  2,  3,  4,  5,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,
            6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6],
        "call_non_capital":
          [ 0,  1,  3,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
           20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        "attribute":
          [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,
            9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9],
        "name":
          [ 0,  0,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,
            9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9]
      },
      "special": {
        "call_capital": {
          "steps": 5,
          "correction_width":      7
        },
        "call_non_capital": {},
        "attribute":        {
          "steps": 10,
          "correction_x_left":     4,
          "correction_y_left":     8,
          "correction_x_right":  -10,
          "correction_y_right":    8,
          "correction_x_bottom":   4,
          "correction_y_bottom":  -6,
          "correction_x_top":      4,
          "correction_y_top":      0
        },
        "name":             {
          "steps": 10,
          "correction_x_left":     4,
          "correction_y_left":    10,
          "correction_x_right":  -10,
          "correction_y_right":   10,
          "correction_x_bottom":   4,
          "correction_y_bottom":   0,
          "correction_x_top":      4,
          "correction_y_top":      0
        }
      },
      "bg_style": {
        "preset_1": "rgb(255,  77, 117)",
        "preset_2": "rgb(  0, 206, 255)",
        "preset_3": "rgb(255, 223,   0)",
        "preset_4": "rgb(183,  51, 208)",
        "preset_5": "rgb( 33, 207, 149)",
        "preset_6": "rgb(200, 226,   5)",
        "preset_7": "rgb(100, 196,  22)"
      },
      "fg_color": "rgb(255, 255, 255)",
      "gif_filename": "blend-s_logo_animation.gif"
    }
  */}.toString().split("\n").slice(1, -1).join("\n");
  var animation_definition = JSON.parse(animation_definition_json);

  var measure_values = {};
    // text_width...
    // text_height...

  var animation_config = {};

  var animation_context = {};
    // rendering_canvas
    // rendering_canvas_context
    // measure_canvas
    // measure_canvas_context
    // rendering_canvas_width
    // rendering_canvas_height
    // bg_style
    // frame_index
    // adjust_count
    // previous_frame_time
    // gif_encoder

  // String.prototype.endsWith()が無いIE用polyfill
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }

  // Code from Programming HTML5 Canvas
  window.requestNextAnimationFrame =
    (function() {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      if (window.webkitRequestAnimationFrame) {
        wrapper = function(time) {
          if (time === undefined) {
            time = +new Date();
          }
          self.callback(time);
        };
        originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
        window.webkitRequestAnimationFrame = function(callback, element) {
          self.callback = callback;
          originalWebkitRequestAnimationFrame(wrapper, element);
        }
      }

      if (window.mozRequestAnimationFrame) {
        index = userAgent.indexOf('rv:');
        if (userAgent.indexOf('Gecko') != -1) {
          geckoVersion = userAgent.substr(index + 3, 3);
          if (geckoVersion === '2.0') {
            window.mozRequestAnimationFrame = undefined;
          }
        }
      }

      return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
        function(callback, element) {
          var start,
              finish;

          window.setTimeout(function() {
            start = +new Date();
            callback(start);
            finish = +new Date();
            self.timeout = 1000 / 60 - (finish - start);
          }, self, timeout);
        };
      }
    )
  ();
  
  function animation_frame_clear() {
    var canvas_context = animation_context.rendering_canvas_context;
    canvas_context.clearRect(0, 0, animation_context.rendering_canvas_width, animation_context.rendering_canvas_height);
    canvas_context.fillStyle = animation_context.bg_style;
    canvas_context.beginPath();
    canvas_context.rect(0, 0, animation_context.rendering_canvas_width, animation_context.rendering_canvas_height);
    canvas_context.fill();
  }

  // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないための代替処理
  function fill_text_by_space(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing) {
    var letter_spacing_normalize = letter_spacing.toString().toLowerCase();
    var space_width = undefined;
    if (letter_spacing_normalize.endsWith('em')) {
      var value = parseFloat(letter_spacing_normalize.substring(0, letter_spacing_normalize.length - 'em'.length));
      space_width = canvas_context.measureText(' ').width * value * text_width_ratio;
    }

    var text_width = 0;
    for (var index = 0 ; index < text.length ; index++) {
      var single_char = text.charAt(index);
      var char_width = canvas_context.measureText(single_char).width * text_width_ratio;
      canvas_context.fillText(single_char, x + text_width, y, char_width);
      text_width += char_width;
      if (index < text.length - 1) {
        text_width += space_width;
      }
    }
    return text_width;
  }

  function fill_text(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing) {
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替処理
    //canvas_context.fillText(text, x, y, max_width);
    fill_text_by_space(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing);
  }

  function animation_call_capital() {
    var animation_step = animation_definition.step.call_capital[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.call_capital;

    var baseline, position_x, position_y;

    var call_center = measure_values.text_width.call / 2;
    var call_capital_x_start = call_center - measure_values.text_width.call_capital / 2;
    var call_capital_x_now
      = call_capital_x_start - call_capital_x_start / animation_definition.special.call_capital.steps * (animation_step - 1);
    var position_x = animation_definition.adjust_margin - (animation_context.adjust_count - 1) + call_capital_x_now;

    switch(animation_config.align) {
    case 'left':
    case 'right':
    case 'bottom':
    case 'top':
      baseline = 'alphabetic';
      position_y = measure_values.text_height.call_capital;
      break;
    }

    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    var canvas_context = animation_context.rendering_canvas_context;
    canvas_context.fillStyle = animation_config.fg_color;
    canvas_context.textBaseline = baseline;
    canvas_context.font = animation_definition.font.call_capital;
    var display_text = animation_config.text.call_capital;
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //var max_width = measure_values.text_width.call_capital * animation_definition.text_width_ratio.call_capital;
    var max_width = measure_values.text_width.call_capital;
    fill_text(canvas_context, display_text, position_x, position_y, max_width, animation_definition.text_width_ratio.call_capital, animation_definition.text_letter_spacing.call_capital);

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = '0';
  }

  function animation_call_non_capital() {
    var animation_step = animation_definition.step.call_non_capital[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.call_non_capital;

    var baseline, position_x, position_y;

    var position_x
      = animation_definition.adjust_margin - animation_context.adjust_count + measure_values.text_width.call_capital;

    switch(animation_config.align) {
    case 'left':
    case 'right':
    case 'bottom':
      baseline = 'alphabetic';
      position_y = measure_values.text_height.call_capital;
      break;
    case 'top':
      baseline = 'top';
      position_y = 0;
      break;
    }

    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    var canvas_context = animation_context.rendering_canvas_context;
    canvas_context.fillStyle = animation_config.fg_color;
    canvas_context.textBaseline = baseline;
    canvas_context.font = animation_definition.font.call_non_capital;
    var display_text = animation_config.text.call_non_capital.substring(0, animation_step);
    var max_width
      = canvas_context.measureText(display_text).width * animation_definition.text_width_ratio.call_non_capital;
    fill_text(canvas_context, display_text, position_x, position_y, max_width, animation_definition.text_width_ratio.call_non_capital, animation_definition.text_letter_spacing.call_non_capital);

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = '0';
  }

  function animation_attribute() {
    var animation_step = animation_definition.step.attribute[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.attribute;

    var baseline, position_x, position_y;

    switch(animation_config.align) {
    case 'left':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_left;
      position_y = measure_values.text_height.call_capital
        + animation_definition.special.attribute.correction_y_left;
      break;
    case 'right':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_right
        + measure_values.text_width.call
        - measure_values.text_width.attribute;
      position_y = measure_values.text_height.call_capital
        + animation_definition.special.attribute.correction_y_right;
      break;
    case 'bottom':
      baseline = 'alphabetic';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_bottom
        + measure_values.text_width.call_capital;
      position_y = measure_values.text_height.call_capital
        // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
        //- measure_values.text_height.call_non_capital
        - measure_text_height(animation_definition.font.call_non_capital, animation_definition.text_width_ratio.call_non_capital, 'ur')
        + animation_definition.special.attribute.correction_y_bottom;
      break;
    case 'top':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_top
        + measure_values.text_width.call_capital;
      position_y = measure_values.text_height.call_non_capital
        + animation_definition.special.attribute.correction_y_top;
    }

    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    var canvas_context = animation_context.rendering_canvas_context;
    var fg_color = animation_config.fg_color;
    fg_color = fg_color.replace('rgb(', 'rgba(');
    fg_color = fg_color.substring(0, fg_color.length - 1) + ', '
      + (1 / animation_definition.special.attribute.steps * (animation_step - 1)).toString() + ')'; 
    canvas_context.fillStyle = fg_color;
    canvas_context.textBaseline = baseline;
    canvas_context.font = animation_definition.font.attribute;
    var display_text = animation_config.text.attribute;
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //var max_width = measure_values.text_width.attribute * animation_definition.text_width_ratio.attribute;
    var max_width = measure_values.text_width.attribute;
    fill_text(canvas_context, display_text, position_x, position_y, max_width, animation_definition.text_width_ratio.attribute, animation_definition.text_letter_spacing.attribute);

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = '0';
  }

  function animation_name() {
    var animation_step = animation_definition.step.name[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.name;

    var baseline, position_x, position_y;

    switch(animation_config.align) {
    case 'left':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_left;
      position_y = measure_values.text_height.call_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_left;
      break;
    case 'right':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_right
        + measure_values.text_width.call
        - measure_values.text_width.name;
      position_y = measure_values.text_height.call_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_left;
      break;
    case 'bottom':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_bottom
        + measure_values.text_width.call_capital;
      position_y = measure_values.text_height.call_capital
        // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
        //- measure_values.text_height.call_non_capital
        - measure_text_height(animation_definition.font.call_non_capital, animation_definition.text_width_ratio.call_non_capital, 'ur')
        + animation_definition.special.name.correction_y_bottom;
      break;
    case 'top':
      baseline = 'top';
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_top
        + measure_values.text_width.call_capital;
      position_y = measure_values.text_height.call_non_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_top;
      break;
    }

    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    var canvas_context = animation_context.rendering_canvas_context;
    var fg_color = animation_config.fg_color;
    fg_color = fg_color.replace('rgb(', 'rgba(');
    fg_color = fg_color.substring(0, fg_color.length - 1) + ', '
      + (1 / animation_definition.special.name.steps * (animation_step - 1)).toString() + ')'; 
    canvas_context.fillStyle = fg_color;
    canvas_context.textBaseline = baseline;
    canvas_context.font = animation_definition.font.name;
    var display_text = animation_config.text.name;
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //var max_width = measure_values.text_width.name * animation_definition.text_width_ratio.name;
    var max_width = measure_values.text_width.name;
    fill_text(canvas_context, display_text, position_x, position_y, max_width, animation_definition.text_width_ratio.name, animation_definition.text_letter_spacing.name);

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = '0';
  }

  function calculateFps() {
    var now = (+new Date),
        fps = 1000 / (now - animation_context.previous_frame_time);
    animation_context.previous_frame_time = now;
    return fps.toFixed();
  }

  /*
   * jsgif download()がFirefoxでは動作しないので下記を参考に回避
   * https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
   */
  function download_altanative(filename) {
    // エンコーディングされたGIF chunkを参照
    var out = animation_context.gif_encoder.stream();
    // オリジナルメソッドのエラー処理は省略
    var templink = document.createElement("a");
    document.body.appendChild(templink); // 追加
    templink.setAttribute("type", "hidden"); // 追加
    templink.download=filename;
    templink.href= URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {type : "image/gif" } ));
    templink.click();
    document.body.removeChild(templink); // 追加
  }

  function animate(time) {
    if (!animation_context.now_playing) {
      if (animation_context.now_playing = animation_context.sequence_queue.shift()) {
        animate_initialize(animation_context.now_playing);
      }
    }

    if (animation_context.frame_index < animation_definition.total_frames) {
      if (time - animation_context.previous_animate_time > 1000 / animation_definition.rendering_fps) {
        animation_context.previous_animate_time = time;
        animation_frame_clear();
        animation_call_non_capital();
        animation_call_capital();
        animation_attribute();
        animation_name();
        animation_context.frame_index++;
        animation_context.adjust_count++;
        $('#effective_fps').text(calculateFps().toString());
        if (animation_context.gif_encoder) {
          animation_context.gif_encoder.addFrame(animation_context.rendering_canvas_context);
        }
      }
      window.requestNextAnimationFrame(animate);
    } else if (animation_context.sequence_queue.length > 0) {
      animation_context.now_playing = undefined;
      window.requestNextAnimationFrame(animate);
    } else if (animation_context.gif_encoder) { 
      animation_context.gif_encoder.finish();
      animation_context.gif_encoder.download(animation_definition.gif_filename);
      animation_context.gif_encoder = null;
    }
  }

  // 参考：http://www.yoheim.net/blog.php?q=20130603
  function measure_text_height(font, text_width_ratio, text) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (text === undefined) {
      text = 'Sg';
    }
    var canvas = animation_context.measure_canvas;
    var canvas_context = animation_context.measure_canvas_context;
    canvas_context.clearRect(0, 0, canvas[0].width, canvas[0].height);

    canvas_context.textBaseline = 'top';
    canvas_context.font = font;
    var max_width = canvas_context.measureText(text).width * text_width_ratio;
    canvas_context.fillText(text, 0, 0, max_width);

    var canvas_width = parseInt(canvas[0].width);
    var canvas_height = parseInt(canvas[0].height);
    var canvas_image = canvas_context.getImageData(0, 0, canvas_width, canvas_height);
    var image_data = canvas_image.data;
    var image_data_length = image_data.length;

    var text_height = 0;
    for (var index = 0 ; index < image_data_length ; index += 4) {
      var alpha = image_data[index + 3];
      if (alpha > 0) {
        var row = Math.floor((index / 4) / canvas_width);
        text_height = row;
      }
    }
    return text_height;
  }

  function measure_text_width(font, text_width_ratio, letter_spacing, text) {
    var canvas = animation_context.measure_canvas;
    var canvas_context = animation_context.measure_canvas_context;
    canvas_context.clearRect(0, 0, canvas[0].width, canvas[0].height);

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //canvas[0].style.letterSpacing = letter_spacing;
    canvas_context.textBaseline = 'top';
    canvas_context.font = font;
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //var text_width = canvas_context.measureText(text).width * text_width_ratio;
    var text_width = fill_text_by_space(canvas_context, text, 0, 0, undefined, text_width_ratio, letter_spacing);
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //canvas[0].style.letterSpacing = '0';
    return text_width;
  }

  function measure_text() {
    measure_values.text_height = {};
    measure_values.text_width = {};

    measure_values.text_height.call_capital = measure_text_height(
      animation_definition.font.call_capital,
      animation_definition.text_width_ratio.call_capital,
      animation_config.text.call_capital
    );

    measure_values.text_width.call_capital = measure_text_width(
      animation_definition.font.call_capital,
      animation_definition.text_width_ratio.call_capital,
      animation_definition.text_letter_spacing.call_capital,
      animation_config.text.call_capital
    );

    // 補正
    measure_values.text_width.call_capital +=
      animation_definition.special.call_capital.correction_width;

    measure_values.text_height.call_non_capital = measure_text_height(
      animation_definition.font.call_non_capital,
      animation_definition.text_width_ratio.call_non_capital,
      animation_config.text.call_non_capital
    );

    measure_values.text_width.call_non_capital = measure_text_width(
      animation_definition.font.call_non_capital,
      animation_definition.text_width_ratio.call_non_capital,
      animation_definition.text_letter_spacing.call_non_capital,
      animation_config.text.call_non_capital
    );

    measure_values.text_width.call
      = measure_values.text_width.call_capital + measure_values.text_width.call_non_capital;

    measure_values.text_height.attribute = measure_text_height(
      animation_definition.font.attribute,
      animation_definition.text_width_ratio.attribute
    );

    measure_values.text_width.attribute = measure_text_width(
      animation_definition.font.attribute,
      animation_definition.text_width_ratio.attribute,
      animation_definition.text_letter_spacing.attribute,
      animation_config.text.attribute
    );

    measure_values.text_height.name = measure_text_height(
      animation_definition.font.name,
      animation_definition.text_width_ratio.name
    );

    measure_values.text_width.name = measure_text_width(
      animation_definition.font.name,
      animation_definition.text_width_ratio.name,
      animation_definition.text_letter_spacing.name,
      animation_config.text.name
    );

  }

  function screen_align() {
    var screen_width = animation_context.rendering_canvas_width;
    var screen_height = animation_context.rendering_canvas_height;

    var offset_right_x = screen_width
      - measure_values.text_width.call
      - animation_definition.adjust_margin;
    var offset_bottom_y = screen_height
      - measure_values.text_height.call_capital
      - animation_definition.bottom_margin;
    var offset_left_y = (
      screen_height
      - measure_values.text_height.call_capital
      - animation_definition.special.attribute.correction_y_left
      - measure_values.text_height.attribute
      - animation_definition.special.name.correction_y_left
      - measure_values.text_height.name
    ) / 2;
    var offset_right_y = (
      screen_height
      - measure_values.text_height.call_capital
      - animation_definition.special.attribute.correction_y_right
      - measure_values.text_height.attribute
      - animation_definition.special.name.correction_y_right
      - measure_values.text_height.name
    ) / 2;

    switch(animation_config.align) {
    case 'left':
      animation_context.align_screen_offset_x = 0;
      animation_context.align_screen_offset_y = offset_left_y;
      break;
    case 'right':
      animation_context.align_screen_offset_x = offset_right_x;
      animation_context.align_screen_offset_y = offset_right_y;
      break;
    case 'bottom':
      animation_context.align_screen_offset_x = 0;
      animation_context.align_screen_offset_y = offset_bottom_y;
      break;
    case 'top':
      animation_context.align_screen_offset_x = 0;
      animation_context.align_screen_offset_y = 0;
      break;
    }
  }

  function initialize_animation_context_sequence_start() {
    // frame_index
    animation_context.frame_index = 0;
    // adjust_count
    animation_context.adjust_count = 0;
  }

  function initialize_animation_context() {
    // rendering_canvas
    animation_context.rendering_canvas = $('#rendering_canvas');
    // rendering_canvas_context
    animation_context.rendering_canvas_context = animation_context.rendering_canvas[0].getContext('2d');

    // measure_canvas
    animation_context.measure_canvas = $('#measure_canvas');
    // measure_canvas_context
    animation_context.measure_canvas_context = animation_context.measure_canvas[0].getContext('2d');

    var rendering_canvas_width = parseInt(animation_context.rendering_canvas.css('width'));
    var rendering_canvas_height = parseInt(animation_context.rendering_canvas.css('height'));
    animation_context.rendering_canvas.attr('width', rendering_canvas_width);
    animation_context.rendering_canvas.attr('height', rendering_canvas_height);
    // rendering_canvas_width
    animation_context.rendering_canvas_width = rendering_canvas_width;
    // rendering_canvas_height
    animation_context.rendering_canvas_height = rendering_canvas_height;

    initialize_animation_context_sequence_start();

    // previous_animate_time
    animation_context.previous_animate_time = 0;
    // previous_frame_time
    animation_context.previous_frame_time = 0;

  }

  function initialize_animation_config(sequence) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (sequence === undefined) {
      sequence = '1';
    }
    target = sequence;
    animation_config.text = {};
    var text = $('#config_call_' + target).val();
    animation_config.text.call_capital = text.charAt(0);
    animation_config.text.call_non_capital = text.substring(1);

    animation_config.text.attribute = $('#config_attribute_' + target).val();

    animation_config.text.name = $('#config_name_' + target).val();

    var value = $('input[name="config_bgcolor_preset_' +target + '"]:checked').val();
    var bg_style;
    switch(value) {
    case 'preset_1':
      bg_style = animation_definition.bg_style.preset_1;
      break;
    case 'preset_2':
      bg_style = animation_definition.bg_style.preset_2;
      break;
    case 'preset_3':
      bg_style = animation_definition.bg_style.preset_3;
      break;
    case 'preset_4':
      bg_style = animation_definition.bg_style.preset_4;
      break;
    case 'preset_5':
      bg_style = animation_definition.bg_style.preset_5;
      break;
    case 'preset_6':
      bg_style = animation_definition.bg_style.preset_6;
      break;
    case 'preset_7':
      bg_style = animation_definition.bg_style.preset_7;
      break;
    }
    animation_context.bg_style = bg_style;

    value = $('input[name="config_align_' + target + '"]:checked').val();
    switch(value) {
    case 'left':
      animation_config.align = 'left';
      break;
    case 'right':
      animation_config.align = 'right';
      break;
    case 'bottom':
      animation_config.align = 'bottom';
      break;
    case 'top':
      animation_config.align = 'top';
      break;
    }

    animation_config.fg_color = animation_definition.fg_color;
  }

  function animate_initialize(sequence) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (sequence === undefined) {
      sequence = '1';
    }
    initialize_animation_context();
    $('#target_fps').text(animation_definition.rendering_fps.toString());
    initialize_animation_config(sequence);
    measure_text();
    screen_align();
  }

  function sequence_queue_initialize() {
    animation_context.sequence_queue = [];
    for (var i = 1 ; i <= 6 ; i++) {
      if ($('[id=sequence_enable_' + i.toString() + ']:checked').val()) {
        animation_context.sequence_queue.push(i.toString());
      }
    }
  }

  function animate_ignite() {
    sequence_queue_initialize();
    animation_context.now_playing = undefined;
    window.requestNextAnimationFrame(animate);
  }

  $('#operation_animate').on('click', function() {
    animation_context.gif_encoder = undefined;
    animate_ignite();
  });

  $('#operation_download').on('click', function() {
    animation_context.gif_encoder = new GIFEncoder();
    // Firefoxでdownload()メソッドが動作しないため代替
    animation_context.gif_encoder.download = download_altanative;
    // 負数は無視されるが繰り返し無しを明確化のため指定
    animation_context.gif_encoder.setRepeat(-1);
    animation_context.gif_encoder.setDelay(1000 / animation_definition.gif_rendering_fps);
    // 数値以外を指定すると誤動作するので注意（単位のpxなど）
    animation_context.gif_encoder.setSize(parseInt(animation_context.rendering_canvas.css('width')), parseInt(animation_context.rendering_canvas.css('height')));
    animation_context.gif_encoder.start();
    animate_ignite();
  });

  animate_ignite();
});
