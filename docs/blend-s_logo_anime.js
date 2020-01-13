/**
 * @fileoverview 「ブレンド・S」オープニング風ロゴアニメーションジェネレータ
 * @author twitter:@billstw
 * 
 * Copyright (c) 2017 bills-appworks
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

$(function() {
  /**
   * アニメーション関連定義
   * 
   * [アニメーション対象要素]
   * call_capital: 「コール」文字列の先頭文字
   * call_non_capital: 「コール」文字列の2文字目以降
   * attribute: 「属性」文字列
   * name: 「名前」文字列
   */
  var animation_definition_json = function(){/*
    {
      "//rendering_fps": "画面上レンダリング目標FPS",
      "rendering_fps": 24,

      "//gif_rendering_fps": "GIFアニメーションFPS",
      "gif_rendering_fps": 24,

      "//default_sequence_number": "シーケンス数（デフォルト）",
      "default_sequence_number": 6,

      "//total_frames": "1シーケンスのフレーム数",
      "total_frames": 20,

      "//adjust_margin": "左に流れる動きのための左マージンピクセル数",
      "adjust_margin": 40,

      "//bottom_margin": "下寄せでの下マージンピクセル数",
      "bottom_margin": 30,

      "//font": "font-style font-variant font-weight font-size font-family",
      "font": {
        "call_capital":       "normal normal 400 100pt Questrial",
        "call_non_capital":   "normal normal 100  60pt Questrial",
        "attribute":          "normal normal 100  30pt Questrial",
        "name":               "normal normal 100  13pt Questrial"
      },

      "//font_small": "小画面用フォント（暫定対応） threshold:判定canvas幅ピクセル閾値",
      "font_small": {
        "threshold": 400,
        "call_capital":       "normal normal 400  75pt Questrial",
        "call_non_capital":   "normal normal 100  45pt Questrial",
        "attribute":          "normal normal 100  22pt Questrial",
        "name":               "normal normal 100  10pt Questrial"
      },

      "//text_width_ratio": "文字列幅のフォント標準に対する比率",
      "text_width_ratio": {
        "call_capital":     0.9,
        "call_non_capital": 0.9,
        "attribute":        0.7,
        "name":             0.6
      },

      "//text_letter_spacing": "文字間隔(letter spacing)",
      "text_letter_spacing": {
        "call_capital":     "0.5em",
        "call_non_capital": "0.5em",
        "attribute":        "0.3em",
        "name":             "0.2em"
      },

      "//step": "フレーム単位のアニメーションステップ番号",
      "step": {
        "call_capital":
          [ 0,  1,  2,  3,  4,  5,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,
            6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6],
        "call_non_capital":
          [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
           20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        "attribute":
          [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,
            9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9],
        "name":
          [ 0,  0,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,
            9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9]
      },

      "//special": "特殊定義",
      "special": {
        "call_capital": {
          "//steps": "出現から定位置までの移動フレーム数",
          "steps": 5,
          "//correction_width": "位置補正ピクセル数",
          "correction_width":      7
        },
        "call_non_capital": {},
        "attribute":        {
          "//steps": "出現から完全表示までの透過段階フレーム数",
          "steps": 10,
          "//correction*": "位置補正ピクセル数",
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
          "//steps": "出現から完全表示までの透過段階フレーム数",
          "steps": 10,
          "//correction*": "位置補正ピクセル数",
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
      
      "//bg_style": "プリセット背景色",
      "bg_style": {
        "preset_1": "rgb(255,  77, 117)",
        "preset_2": "rgb(  0, 206, 255)",
        "preset_3": "rgb(255, 223,   0)",
        "preset_4": "rgb(183,  51, 208)",
        "preset_5": "rgb( 33, 207, 149)",
        "preset_6": "rgb(200, 226,   5)",
        "preset_7": "rgb(100, 196,  22)"
      },

      "//bg_style_separate": "プリセット背景色(RGB値分割)",
      "bg_style_separate": {
        "preset_1": {
          "r": 255,
          "g":  77,
          "b": 117
        },
        "preset_2": {
          "r":   0,
          "g": 206,
          "b": 255
        },
        "preset_3": {
          "r": 255,
          "g": 223,
          "b":   0
        },
        "preset_4": {
          "r": 183,
          "g":  51,
          "b": 208
        },
        "preset_5": {
          "r":  33,
          "g": 207,
          "b": 149
        },
        "preset_6": {
          "r": 200,
          "g": 226,
          "b":   5
        },
        "preset_7": {
          "r": 100,
          "g": 196,
          "b":  22
        }
      },

      "//fg_color": "文字列デフォルト表示色",
      "fg_color": "rgb(255, 255, 255)",

      "//gif_filename": "アニメーションGIFダウンロードファイルデフォルト名",
      "gif_filename": "blend-s_logo_animation.gif",

      "//sequence_select_bg_style": "シーケンス選択時背景色",
      "sequence_select_bg_style": "rgba(255, 255, 255, 0.1)",

      "//stripe": "ロード時表示ストライプ関連",
      "stripe": {
        "total_frames": 40,
        "bg_style": "rgb(255, 255, 255)",
        "sequence_number": "0",
        "count": 5,
        "length": 1000,
        "delay": 100,
        "move_step": 50 
      },

      "//cookie": "cookie関連",
      "cookie": {
        "expires": 60,
        "name": "blend-s_logo_anime",
        "sequence_max": 100
      },

      "//default_config": "デフォルト設定",
      "default_config": {
        "animation_priority_time": true,
        "sequence_number": 6,
        "sequence": [
          {
            "enable": true,
            "call": "Smile",
            "attribute": "Sadistic",
            "name": "Maika Sakuranomiya",
            "bgcolor": "preset_1",
            "bgcolor_variable": "preset_1",
            "align": "right",
            "fg_color": "rgb(255, 255, 255)"
          },
          {
            "enable": true,
            "call": "Sweet",
            "attribute": "Tsundere",
            "name": "Kaho Hinata",
            "bgcolor": "preset_2",
            "bgcolor_variable": "preset_2",
            "align": "left",
            "fg_color": "rgb(255, 255, 255)"
          },
          {
            "enable": true,
            "call": "Sister",
            "attribute": "Imouto",
            "name": "Mafuyu Hoshikawa",
            "bgcolor": "preset_3",
            "bgcolor_variable": "preset_3",
            "align": "right",
            "fg_color": "rgb(255, 255, 255)"
          },
          {
            "enable": true,
            "call": "Sadistic",
            "attribute": "Oneesan",
            "name": "Miu Amano",
            "bgcolor": "preset_4",
            "bgcolor_variable": "preset_4",
            "align": "left",
            "fg_color": "rgb(255, 255, 255)"
          },
          {
            "enable": true,
            "call": "Surprise",
            "attribute": "Idol",
            "name": "Hideri Kanzaki",
            "bgcolor": "preset_5",
            "bgcolor_variable": "preset_5",
            "align": "bottom",
            "fg_color": "rgb(255, 255, 255)"
          },
          {
            "enable": true,
            "call": "Service",
            "attribute": "",
            "name": "",
            "bgcolor": "preset_6",
            "bgcolor_variable": "preset_6",
            "align": "top",
            "fg_color": "rgb(255, 255, 255)"
          }
        ]
      }
    }
  */}.toString().split("\n").slice(1, -1).join("\n");
  var animation_definition = JSON.parse(animation_definition_json);

  /**
   * 非表示領域measure_canvasに描画して計測した値
   */
  var measure_values = {};
    // .text_width.*: アニメーション対象要素毎の文字列幅
    // .text_height.*: アニメーション対象要素要素毎の文字列高さ

  /**
   * 表示設定
   */
  var animation_config = {};
    // .text.* アニメーション対象要素毎の文字列
    // .fg_color: 文字列表示色
    // .align: 揃え方向

  /**
   * アニメーション状態管理
   */
  var animation_context = {};
    // アニメーション描画canvas
    // .rendering_canvas: jQuery要素オブジェクト
    // .rendering_canvas_context: canvas 2Dコンテキスト
    // .rendering_canvas_width: 幅
    // .rendering_canvas_height: 高さ
    //
    // 描画サイズ計測用canvas
    // .measure_canvas: jQuery要素オブジェクト
    // .measure_canvas_context: canvas 2Dコンテキスト
    //
    // アニメーション処理制御関連
    // .total_frames: 1シーケンスのフレーム数
    // .frame_index: アニメーション定義のステップ配列インデックス
    // .adjust_count: 左に流れる動きのカウンタ
    // .previous_frame_time: 前回フレーム描画の時刻
    // .previous_animate_time: アニメーション処理メソッドの前回処理時刻
    // .frame_interval: 目標フレーム間隔時間(msec)
    // .now_playing: 現時点のアニメーション処理対象シーケンス番号
    // .sequence_queue: シーケンス番号のキュー
    //
    // 表示関連
    // .bg_style: 背景色
    // .align_screen_offset_x: 揃え方向に応じた表示位置のオフセット(横)
    // .align_screen_offset_y: 揃え方向に応じた表示位置のオフセット(縦)
    //
    // GIFファイル関連
    // .gif_encoder: jsgifのGIFEncoderインスタンス

  /**
   * アニメーション中止フラグ（設定変更操作等）
   */
  var animation_stop = false;

  /**
   * String.prototype.endsWith()が無いIE用polyfill
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
   */
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

  /**
   * requestAnimationFrameのブラウザ差異吸収polyfill
   * オライリー刊「プログラミング HTML5 Canvas」より
   */
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
  
  /**
   * 設定内容をcookie保存
   */
  function store_cookie() {
    var value = {};
    // 選択タブ
    value.select_tab = "1";
    // 時間優先
    value.animation_priority_time = $('#animation_priority_time').prop('checked');
    // シーケンス毎の設定
    value.config = [];
    for (var i = 1 ; i <= animation_definition.default_config.sequence_number ; i++) {
      var sequence = {};
      // n番目（有効／無効チェック）
      sequence.enable = $('#sequence_enable_' + i).prop('checked');
      // コール
      sequence.call = $('#config_call_' + i).val();
      // 属性
      sequence.attribute = $('#config_attribute_' + i).val();
      // 名前
      sequence.name = $('#config_name_' + i).val();
      // 背景色
      sequence.bgcolor = $('input[name="config_bgcolor_' + i + '"]:checked').val();
      // 背景色（color picker）
      sequence.bgcolor_variable = $('#config_bgcolor_variable_' + i).val();
      // 揃え方向
      sequence.align = $('input[name="config_align_' + i + '"]:checked').val();
      // 文字色
      sequence.fgcolor = animation_definition.fg_color;
      value.config.push(sequence);
    }
    // cookie保存
    Cookies.set(animation_definition.cookie.name, value, {
      expires: animation_definition.cookie.expires,
      path: location.pathname
    });
  }

  /**
   * 設定内容をcookieから取得
   */
  function load_cookie() {
    var value = Cookies.get(animation_definition.cookie.name);
    if (value) {
      value = JSON.parse(value);
      // 選択タブ
      //value.select_tab;
      // 時間優先
      $('#animation_priority_time').prop('checked', value.animation_priority_time);
      // シーケンス毎の設定
      if (value.config && Array.isArray(value.config)) {
        // シーケンス数上限
        if (value.config.length > animation_definition.cookie.sequence_max) {
          value.config.length = animation_definition.cookie.sequence_max;
        }
        for (var i = 1 ; i <= value.config.length ; i++) {
          var sequence = value.config[i - 1];
          // n番目（有効／無効チェック）
          $('#sequence_enable_' + i).prop('checked', sequence.enable);
          // コール
          $('#config_call_' + i).val(sequence.call);
          // 属性
          $('#config_attribute_' + i).val(sequence.attribute);
          // 名前
          $('#config_name_' + i).val(sequence.name);
          // 背景色
          $('input[name="config_bgcolor_' + i + '"]').val([sequence.bgcolor]);
          // 背景色（color picker）
          // WebブラウザがHTML5ネイティブのcolor pickerに対応しているか否か
          var is_native = $('#config_bgcolor_variable_1').spectrum.inputTypeColorSupport();
          if (is_native) {
            // HTML5ネイティブのcolor picker設定
            $('#config_bgcolor_variable_' + i).val(sequence.bgcolor_variable);
          } else {
            // spectrumライブラリのcolor picker設定
            $('#config_bgcolor_variable_' + i).spectrum("set", sequence.bgcolor_variable);        
          }
          // 揃え方向
          $('input[name="config_align_' + i + '"]').val([sequence.align]);
          // 文字色
          //sequence.fgcolor;
        }
      }
    }
  }

  /**
   * アニメーション描画処理：canvas全体を背景色で初期化
   */
  function animation_frame_clear() {
    var canvas_context = animation_context.rendering_canvas_context;
    canvas_context.clearRect(0, 0, animation_context.rendering_canvas_width, animation_context.rendering_canvas_height);
    canvas_context.fillStyle = animation_context.bg_style;
    canvas_context.beginPath();
    canvas_context.rect(0, 0, animation_context.rendering_canvas_width, animation_context.rendering_canvas_height);
    canvas_context.fill();
  }

  /**
   * 文字列描画
   * Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないためのpolyfill
   * letter spacingに相当する文字間隔を調整して文字列を描画
   * https://stackoverflow.com/questions/8952909/letter-spacing-in-canvas-element
   * 当実装ではletter_spacingの単位がem'のみ対応
   * @param {Object} canvas_context 描画対象canvasの2Dコンテキスト
   * @param {string} text 描画文字列
   * @param {number} x 文字列描画X座標
   * @param {number} y 文字列描画Y座標
   * @param {number} max_width 描画最大幅（超える場合はこの幅に縮小）
   * @param {number} text_width_ratio 文字列の標準フォント幅に対する比率
   * @param {number|string} letter_spacing スタイルシートに指定したいletter spacing(CSS値)
   *     現在の実装は単位が'em'のみ対応
   * @return {number} 描画テキスト幅ピクセル数
   */
  function fill_text_by_space(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing) {
    /**
     * 文字間隔の空白幅ピクセル数を算出
     */
    // letter_spacingパラメタの単位文字を小文字に正規化
    var letter_spacing_normalize = letter_spacing.toString().toLowerCase();
    var space_width = undefined;
    // 現在の実装は単位が'em'のみ対応
    if (letter_spacing_normalize.endsWith('em')) {
      // letter_spacingパラメタの数値部を抽出
      var value = parseFloat(letter_spacing_normalize.substring(0, letter_spacing_normalize.length - 'em'.length));
      // canvas上での空白文字描画幅を測定し、letter_spacingパラメタ数値とtext_width_ratioパラメタ数値による比率調整
      space_width = canvas_context.measureText(' ').width * value * text_width_ratio;
    }

    /**
     * 算出した空白幅を文字間隔として空けて1文字ずつ文字列描画
     */
    var text_width = 0;
    for (var index = 0 ; index < text.length ; index++) {
      // 文字描画
      var single_char = text.charAt(index);
      // text_width_ratioパラメタ数値による幅比率調整
      var char_width = canvas_context.measureText(single_char).width * text_width_ratio;
      canvas_context.fillText(single_char, x + text_width, y, char_width);
      text_width += char_width;

      // 文字間隔
      if (index < text.length - 1) {
        text_width += space_width;
      }
    }
    return text_width;
  }

  /**
   * 文字列描画
   * 現在の実装ではpolyfill実装に処理を移譲
   * @param {Object} canvas_context 描画対象canvasの2Dコンテキスト
   * @param {string} text 描画文字列
   * @param {number} x 文字列描画X座標
   * @param {number} y 文字列描画Y座標
   * @param {number} max_width 描画最大幅（超える場合はこの幅に縮小）
   * @param {number} text_width_ratio 文字列の標準フォント幅に対する比率
   * @param {number|string} letter_spacing スタイルシートに指定したいletter spacing(CSS値)
   */
  function fill_text(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing) {
    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替処理
    //canvas_context.fillText(text, x, y, max_width);
    fill_text_by_space(canvas_context, text, x, y, max_width, text_width_ratio, letter_spacing);
  }

  /**
   * 「コール」先頭文字のアニメーション処理
   */
  function animation_call_capital() {
    // 現描画タイミングでのアニメーションステップ
    var animation_step = animation_definition.step.call_capital[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.call_capital;

    // baseline: 文字列描画基準(position_yが示す文字の基準線)
    // position_x: 文字列描画位置X座標
    // position_y: 文字列描画位置Y座標
    var baseline, position_x, position_y;

    // 「コール」文字列全体の幅の半分のピクセル数算出
    var call_center = measure_values.text_width.call / 2;
    // 出現X初期座標は「コール」文字列全体幅の半分 - 「コール」先頭文字幅の半分
    // →「コール」文字列全体の中央に先頭文字が表示される位置
    var call_capital_x_start = call_center - measure_values.text_width.call_capital / 2;
    // アニメーションステップに応じた現在位置を算出
    var call_capital_x_now
      = call_capital_x_start - call_capital_x_start / animation_definition.special.call_capital.steps * (animation_step - 1);
    // 左に流れる動きの現在位置で補正
    var position_x = animation_definition.adjust_margin - (animation_context.adjust_count - 1) + call_capital_x_now;

    // 揃え方向いずれでもY座標基準は同一
    switch(animation_config.align) {
    case 'left':
    case 'right':
    case 'bottom':
    case 'top':
      baseline = 'alphabetic';
      position_y = measure_values.text_height.call_capital;
      break;
    }

    // 揃え方向に応じ表示位置オフセット調整
    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    // これまでに算出した条件で文字描画
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

  /**
   * 「コール」先頭文字以外のアニメーション処理
   */
  function animation_call_non_capital() {
    // 現描画タイミングでのアニメーションステップ
    var animation_step = animation_definition.step.call_non_capital[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.call_non_capital;

    // baseline: 文字列描画基準(position_yが示す文字の基準線)
    // position_x: 文字列描画位置X座標
    // position_y: 文字列描画位置Y座標
    var baseline, position_x, position_y;

    // 左に流れる動きの現在位置補正 + 「コール」先頭文字の右側
    var position_x
      = animation_definition.adjust_margin - animation_context.adjust_count + measure_values.text_width.call_capital;

    // 揃え方向に応じたY座標基準調整
    switch(animation_config.align) {
    case 'left':
    case 'right':
    case 'bottom':
      // 左・右・下ならば先頭文字と下側を揃える
      baseline = 'alphabetic';
      position_y = measure_values.text_height.call_capital;
      break;
    case 'top':
      // 上ならば先頭文字と上側を揃える
      baseline = 'top';
      position_y = 0;
      break;
    }

    // 揃え方向に応じ表示位置オフセット調整
    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    // これまでに算出した条件で文字描画
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

  /**
   * 「属性」文字列のアニメーション処理
   */
  function animation_attribute() {
    // 現描画タイミングでのアニメーションステップ
    var animation_step = animation_definition.step.attribute[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.attribute;

    // baseline: 文字列描画基準(position_yが示す文字の基準線)
    // position_x: 文字列描画位置X座標
    // position_y: 文字列描画位置Y座標
    var baseline, position_x, position_y;

    // 揃え方向に応じたX・Y座標基準調整
    switch(animation_config.align) {
    case 'left':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「属性」左寄せ個別補正
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_left;
      // 「コール」先頭文字高さ + 「属性」左寄せ個別補正
      position_y = measure_values.text_height.call_capital
        + animation_definition.special.attribute.correction_y_left;
      break;
    case 'right':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「属性」右寄せ個別補正 + 「コール」全体幅 - 「属性」幅
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_right
        + measure_values.text_width.call
        - measure_values.text_width.attribute;
      // 「コール」先頭文字高さ + 「属性」右寄せ個別補正
      position_y = measure_values.text_height.call_capital
        + animation_definition.special.attribute.correction_y_right;
      break;
    case 'bottom':
      baseline = 'alphabetic';
      // 左に流れる動きの現在位置補正 + 「属性」下寄せ個別補正 + 「コール」先頭文字幅
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_bottom
        + measure_values.text_width.call_capital;
      // 「コール」先頭文字高さ - 「コール」先頭以外文字列高さ + 「属性」下寄せ個別補正
      position_y = measure_values.text_height.call_capital
        // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
        //- measure_values.text_height.call_non_capital
        - measure_text_height(animation_definition.font.call_non_capital, animation_definition.text_width_ratio.call_non_capital, 'ur')
        + animation_definition.special.attribute.correction_y_bottom;
      break;
    case 'top':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「属性」上寄せ個別補正 + 「コール」先頭文字幅
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.attribute.correction_x_top
        + measure_values.text_width.call_capital;
      // 「コール」先頭以外文字列高さ + 「属性」上寄せ個別補正
      position_y = measure_values.text_height.call_non_capital
        + animation_definition.special.attribute.correction_y_top;
    }

    // 揃え方向に応じ表示位置オフセット調整
    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    // これまでに算出した条件で文字描画
    var canvas_context = animation_context.rendering_canvas_context;
    // 出現時に透明→不透明に段階的に表示
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

  /**
   * 「名前」文字列のアニメーション処理
   */
  function animation_name() {
    // 現描画タイミングでのアニメーションステップ
    var animation_step = animation_definition.step.name[animation_context.frame_index];
    if (animation_step == 0) {
      return;
    }

    // Chrome以外ではcanvas.style.letterSpacingへの設定が反映されないため代替
    //animation_context.rendering_canvas[0].style.letterSpacing = animation_definition.text_letter_spacing.name;

    // baseline: 文字列描画基準(position_yが示す文字の基準線)
    // position_x: 文字列描画位置X座標
    // position_y: 文字列描画位置Y座標
    var baseline, position_x, position_y;

    // 揃え方向に応じたX・Y座標基準調整
    switch(animation_config.align) {
    case 'left':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「名前」左寄せ個別補正
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_left;
      // 「コール」先頭文字高さ + 「属性」高さ + 「名前」左寄せ個別補正
      position_y = measure_values.text_height.call_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_left;
      break;
    case 'right':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「名前」右寄せ個別補正 + 「コール」全体幅 - 「名前」幅
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_right
        + measure_values.text_width.call
        - measure_values.text_width.name;
      // 「コール」先頭文字高さ + 「属性」高さ + 「名前」右寄せ個別補正
      position_y = measure_values.text_height.call_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_left;
      break;
    case 'bottom':
      baseline = 'top';
      // 左に流れる動きの現在位置補正 + 「名前」下寄せ個別補正 + 「コール」先頭文字幅
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
      // 左に流れる動きの現在位置補正 + 「名前」上寄せ個別補正 + 「コール」先頭文字幅
      position_x = animation_definition.adjust_margin - animation_context.adjust_count
        + animation_definition.special.name.correction_x_top
        + measure_values.text_width.call_capital;
      // 「コール」先頭以外文字列高さ + 「属性」高さ + 「属性」上寄せ個別補正
      position_y = measure_values.text_height.call_non_capital
        + measure_values.text_height.attribute
        + animation_definition.special.name.correction_y_top;
      break;
    }

    // 揃え方向に応じ表示位置オフセット調整
    position_x += animation_context.align_screen_offset_x;
    position_y += animation_context.align_screen_offset_y;

    // これまでに算出した条件で文字描画
    var canvas_context = animation_context.rendering_canvas_context;
    // 出現時に透明→不透明に段階的に表示
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

  /**
   * ロード時のストライプアニメーション処理
   * ロード直後のテキストアニメーションが乱れる事象の緩和策として実行
   * 描画領域の下から現れたストライプが上へ抜けていくように表示
   * ストライプは1本ずつ少し遅れて隣を追従
   */
  function animation_stripe() {
    // ストライプ数
    var stripe_count = animation_definition.stripe.count;
    // ストライプ表示間隔ピクセル数（描画領域幅をストライプ数で等分）
    var stripe_interval = animation_context.rendering_canvas_width / stripe_count;
    // ストライプの幅（=表示間隔）ピクセル数
    var stripe_width = stripe_interval;
    // ストライプの長さピクセル数
    var stripe_length = animation_definition.stripe.length;
    // 後のストライプが先のストライプより遅れて隣を追うように見せるための遅延間隔ピクセル数
    var stripe_delay = animation_definition.stripe.delay;
    // ストライプが進む速さ（1フレームあたりの進行ピクセル数）
    var move_step = animation_definition.stripe.move_step;
    // ストライプ移動開始位置となる描画領域下端座標
    var bottom = animation_context.rendering_canvas_height;
    // 参照名読み替え
    var frame_index = animation_context.frame_index;
    var canvas_context = animation_context.rendering_canvas_context;

    var left, top;
    for (var stripe_index = 0 ; stripe_index < stripe_count; stripe_index++) {
      // ストライプを間隔ごとに表示
      left = stripe_interval * stripe_index;
      // ストライプ上端を描画領域下端からフレーム単位に上へ移動（+後進補正）
      top = bottom - frame_index * move_step + stripe_delay * stripe_index;
      canvas_context.fillStyle = animation_definition.bg_style['preset_' + (stripe_index + 1)];
      canvas_context.beginPath();
      canvas_context.rect(left, top, stripe_width, stripe_length);
      canvas_context.fill();
    }
  }

  /**
   * FPS算出
   * @return {number} 前回時刻と現在時刻の差から算出したFPS
   */
  function calculateFps() {
    var now = (+new Date),
        fps = 1000 / (now - animation_context.previous_frame_time);
    animation_context.previous_frame_time = now;
    return fps.toFixed();
  }

  /**
   * jsgif download()がFirefox/IEでは動作しないので下記を参考に回避
   * https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
   * ダウンロード用ダミーa要素をdocumentに紐づけ
   * @param {string} filename 利用者に提示するファイル名
   */
  function download_alternative(filename) {
    // エンコーディングされたGIF chunkを参照
    var out = animation_context.gif_encoder.stream();
    // オリジナルメソッドのエラー処理は省略
    var templink = document.createElement("a");
    document.body.appendChild(templink); // オリジナルに追加
    templink.setAttribute("type", "hidden"); // オリジナルに追加
    templink.download=filename;
    templink.href= URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {type : "image/gif" }));
    templink.click();
    document.body.removeChild(templink); // オリジナルに追加
  }

  /**
   * jsgif download()がFirefox/IEでは動作しないのでFileSaverを利用
   * @param {string} filename 利用者に提示するファイル名
   */
  function download_alternative_FileSaver(filename) {
    // エンコーディングされたGIF chunkを参照
    var out = animation_context.gif_encoder.stream();
    saveAs(new Blob([new Uint8Array(out.bin)], {type : "image/gif" }), filename);
  }

  /**
   * アニメーション処理主制御
   * @param {number} time 呼び出し時刻
   */
  function animate(time) {
    // アニメーション中止（設定変更操作等）
    if (animation_stop) {
      // GIFエンコーディング中ならばクリーンナップ
      if (animation_context.gif_encoder) {
        animation_context.gif_encoder.finish();
        animation_context.gif_encoder = null;
      }
      return;
    }
    // シーケンス処理中でなければ次のシーケンスで初期化処理
    if (!animation_context.now_playing) {
      if (animation_context.now_playing = animation_context.sequence_queue.shift()) {
        animate_initialize(animation_context.now_playing);
      }
    }

    // 以下の条件を満たす場合にアニメーション描画処理実施
    // ・全アニメーションフレームが終了していない
    // ・目標FPSとなる前フレーム処理からの時間経過（アニメーションGIF録画処理ならば判定対象外）
    if (animation_context.frame_index < animation_context.total_frames) {
      var actual_interval = time - animation_context.previous_animate_time;
      if (animation_context.gif_encoder || (actual_interval > animation_context.frame_interval)) {
        // アニメーションGIF録画中ではなく、かつ時間優先の場合、フレーム遅延が生じていたらスキップする（コマ落ち）
        if (!animation_context.gif_encoder && $('#animation_priority_time').prop('checked')) {
          if (animation_context.previous_animate_time > 0 && 
              actual_interval >= animation_context.frame_interval * 2) {
            var frame_correction = (actual_interval / animation_context.frame_interval).toFixed() - 1;
            animation_context.frame_index += frame_correction;
            animation_context.adjust_count += frame_correction;
          }
        }
        animation_context.previous_animate_time = time;
        // 背景色でクリアし、各要素を描画
        animation_frame_clear();
        switch(animation_context.now_playing) {
        case animation_definition.stripe.sequence_number:
          // ロード時ストライプアニメーション
          animation_stripe();
          break;
        default:
          // 通常テキストアニメーション
          animation_call_non_capital();
          animation_call_capital();
          animation_attribute();
          animation_name();
          break;
        }
        animation_context.frame_index++;
        animation_context.adjust_count++;
        $('#effective_fps').text(calculateFps().toString());
        // GIFエンコーディング
        if (animation_context.gif_encoder) {
          animation_context.gif_encoder.addFrame(animation_context.rendering_canvas_context);
        }
      }
      window.requestNextAnimationFrame(animate);
    } else if (animation_context.sequence_queue.length > 0) {
      // まだ次シーケンスが存在する場合は次のシーケンスへ
      animation_context.now_playing = undefined;
      window.requestNextAnimationFrame(animate);
    } else if (animation_context.gif_encoder) {
      // 全シーケンス終了の場合、GIFエンコーディング処理中であればエンコーディング終了してダウンロード
      animation_context.gif_encoder.finish();
      animation_context.gif_encoder.download(animation_definition.gif_filename);
      animation_context.gif_encoder = null;
    }
  }

  /**
   * 指定されたテキストが実際に描画される高さ（ピクセル数）を計測
   * 参考：http://www.yoheim.net/blog.php?q=20130603
   * @param {string} font CSS指定形式フォント定義 
   * @param {number} text_width_ratio 文字列幅のフォント標準に対する比率
   * @param {string} text 計測対象文字列
   * @return {number} 高さピクセル数
   */
  function measure_text_height(font, text_width_ratio, text) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (text === undefined) {
      text = 'Sg';
    }
    // 計測用canvas準備
    var canvas = animation_context.measure_canvas;
    var canvas_context = animation_context.measure_canvas_context;
    canvas_context.clearRect(0, 0, canvas[0].width, canvas[0].height);
    // 計測用canvasに描画
    canvas_context.textBaseline = 'top';
    canvas_context.font = font;
    var max_width = canvas_context.measureText(text).width * text_width_ratio;
    canvas_context.fillText(text, 0, 0, max_width);
    // 描画内容を画像として採取
    var canvas_width = parseInt(canvas[0].width);
    var canvas_height = parseInt(canvas[0].height);
    var canvas_image = canvas_context.getImageData(0, 0, canvas_width, canvas_height);
    var image_data = canvas_image.data;
    var image_data_length = image_data.length;
    // 画像を走査して透明でないピクセル（文字色）を対象に高さを計測
    // （参考サイトの方法から一部変更）
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

  /**
   * 指定されたテキストが実際に描画される幅（ピクセル数）を計測
   * Google Chrome以外のブラウザでも有効となる方式で実施
   * @param {string} font CSS指定形式フォント定義
   * @param {number} text_width_ratio 文字列幅のフォント標準に対する比率
   * @param {string} letter_spacing 文字間隔（CSS letter-spacing）
   * @param {string} text 計測対象文字列
   * @return {number} 幅ピクセル数
   */
  function measure_text_width(font, text_width_ratio, letter_spacing, text) {
    // 計測用canvas準備
    var canvas = animation_context.measure_canvas;
    var canvas_context = animation_context.measure_canvas_context;
    canvas_context.clearRect(0, 0, canvas[0].width, canvas[0].height);
    // 計測用canvasに描画・幅取得
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

  /**
   * アニメーション各要素テキスト描画イズ（ピクセル数）計測
   */
  function measure_text() {
    measure_values.text_height = {};
    measure_values.text_width = {};
    // 「コール」先頭文字高さ
    measure_values.text_height.call_capital = measure_text_height(
      animation_definition.font.call_capital,
      animation_definition.text_width_ratio.call_capital,
      animation_config.text.call_capital
    );
    // 「コール」先頭文字幅
    measure_values.text_width.call_capital = measure_text_width(
      animation_definition.font.call_capital,
      animation_definition.text_width_ratio.call_capital,
      animation_definition.text_letter_spacing.call_capital,
      animation_config.text.call_capital
    );
    // 「コール」先頭文字幅個別補正
    measure_values.text_width.call_capital +=
      animation_definition.special.call_capital.correction_width;
    // 「コール」先頭以外文字列高さ
    measure_values.text_height.call_non_capital = measure_text_height(
      animation_definition.font.call_non_capital,
      animation_definition.text_width_ratio.call_non_capital,
      animation_config.text.call_non_capital
    );
    // 「コール」先頭以外文字列幅
    measure_values.text_width.call_non_capital = measure_text_width(
      animation_definition.font.call_non_capital,
      animation_definition.text_width_ratio.call_non_capital,
      animation_definition.text_letter_spacing.call_non_capital,
      animation_config.text.call_non_capital
    );
    // 「コール」先頭以外文字列幅個別補正
    measure_values.text_width.call
      = measure_values.text_width.call_capital + measure_values.text_width.call_non_capital;
    // 「属性」高さ
    measure_values.text_height.attribute = measure_text_height(
      animation_definition.font.attribute,
      animation_definition.text_width_ratio.attribute
    );
    // 「属性」幅
    measure_values.text_width.attribute = measure_text_width(
      animation_definition.font.attribute,
      animation_definition.text_width_ratio.attribute,
      animation_definition.text_letter_spacing.attribute,
      animation_config.text.attribute
    );
    // 「名前」高さ
    measure_values.text_height.name = measure_text_height(
      animation_definition.font.name,
      animation_definition.text_width_ratio.name
    );
    // 「名前」幅
    measure_values.text_width.name = measure_text_width(
      animation_definition.font.name,
      animation_definition.text_width_ratio.name,
      animation_definition.text_letter_spacing.name,
      animation_config.text.name
    );
  }

  /**
   * 揃え方向に応じた各種座標設定
   */
  function screen_align() {
    var screen_width = animation_context.rendering_canvas_width;
    var screen_height = animation_context.rendering_canvas_height;
    // 右寄せX座標：右寄せ時の描画左端
    // 描画canvas幅 - 「コール」全体幅 - 左に流れる動きのための左マージン
    var offset_right_x = screen_width
      - measure_values.text_width.call
      - animation_definition.adjust_margin;
    // 下寄せY座標：下寄せ時の描画上端
    // 描画canvas高さ - 「コール」先頭文字高さ - 下寄せでの下マージン
    var offset_bottom_y = screen_height
      - measure_values.text_height.call_capital
      - animation_definition.bottom_margin;
    // 左寄せY座標：上下中央で描画対象高さを考慮した描画上端
    // (描画canvas高さ - 「コール」先頭文字高さ - 「属性」左寄せ時の位置補正 - 「属性」高さ
    //  - 「名前」左寄せ時の位置補正 - 「名前」高さ) / 2 
    var offset_left_y = (
      screen_height
      - measure_values.text_height.call_capital
      - animation_definition.special.attribute.correction_y_left
      - measure_values.text_height.attribute
      - animation_definition.special.name.correction_y_left
      - measure_values.text_height.name
    ) / 2;
    // 右寄せY座標：上下中央で描画対象高さを考慮した描画上端
    // (描画canvas高さ - 「コール」先頭文字高さ - 「属性」右寄せ時の位置補正 - 「属性」高さ
    //  - 「名前」右寄せ時の位置補正 - 「名前」高さ) / 2
    var offset_right_y = (
      screen_height
      - measure_values.text_height.call_capital
      - animation_definition.special.attribute.correction_y_right
      - measure_values.text_height.attribute
      - animation_definition.special.name.correction_y_right
      - measure_values.text_height.name
    ) / 2;
    // 揃え方向指定に応じて上記で算出した描画始点座標を設定
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

  /**
   * 指定したRGB各値に対応するRGB16進文字列(#FFFFFF)を取得
   * @param {number} r RGB値のR
   * @param {number} g RGB値のG
   * @param {number} b RGB値のB
   * @return {string} '#FFFFFF'形式のRGB値表現文字列
   */
  function getHexRGB(r, g, b) {
    return '#'
      + ('0' + r.toString(16).toUpperCase()).slice(-2)
      + ('0' + g.toString(16).toUpperCase()).slice(-2)
      + ('0' + b.toString(16).toUpperCase()).slice(-2);
  }

  /**
   * アニメーション状態管理初期化：シーケンス起動時
   */
  function initialize_animation_context_sequence_start() {
    animation_context.total_frames = animation_definition.total_frames;
    // アニメーション定義のステップ配列インデックス
    animation_context.frame_index = 0;
    // 左に流れる動きのカウンタ
    animation_context.adjust_count = 0;
  }

  /**
   * アニメーション状態管理初期化：全体初回
   * @param {string} target_canvas 描画対象canvas要素ID
   */
  function initialize_animation_context(target_canvas) {
    if (!target_canvas) {
      target_canvas = '#rendering_canvas';
    }
    // アニメーション描画canvas
    // jQuery要素オブジェクト
    animation_context.rendering_canvas = $(target_canvas);
    // canvas 2Dコンテキスト
    animation_context.rendering_canvas_context = animation_context.rendering_canvas[0].getContext('2d');

    // 描画サイズ計測用canvas
    // jQuery要素オブジェクト
    animation_context.measure_canvas = $('#measure_canvas');
    // canvas 2Dコンテキスト
    animation_context.measure_canvas_context = animation_context.measure_canvas[0].getContext('2d');

    // アニメーション描画canvasのサイズをCSS指定から取得
    var rendering_canvas_width = parseInt(animation_context.rendering_canvas.css('width'));
    var rendering_canvas_height = parseInt(animation_context.rendering_canvas.css('height'));
    // スケーリング1:1
    animation_context.rendering_canvas.attr('width', rendering_canvas_width);
    animation_context.rendering_canvas.attr('height', rendering_canvas_height);
    animation_context.rendering_canvas_width = rendering_canvas_width;
    animation_context.rendering_canvas_height = rendering_canvas_height;
    
    // 画面サイズが小さい場合にフォントを小さくする（暫定対応）
    if (rendering_canvas_width < animation_definition.font_small.threshold) {
      animation_definition.font = animation_definition.font_small;
    }

    // シーケンス関連状態管理初期化
    initialize_animation_context_sequence_start();

    // アニメーション処理メソッド前回処理時刻
    animation_context.previous_animate_time = 0;
    // 前回フレーム描画の時刻
    animation_context.previous_frame_time = 0;
    // 目標フレーム間隔時間(msec)
    animation_context.frame_interval = 1000 / animation_definition.rendering_fps;
  }

  /**
   * 表示設定を画面から取得して初期化
   * @param {string} sequence 初期化対象シーケンス
   */
  function initialize_animation_config(sequence) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (sequence === undefined) {
      sequence = '1';
    }
    target = sequence;
    animation_config.text = {};

    // 各要素文字列
    // 「コール」を先頭文字と先頭以外文字列で分割設定
    var text = $('#config_call_' + target).val();
    animation_config.text.call_capital = text.charAt(0);
    animation_config.text.call_non_capital = text.substring(1);
    // 「属性」
    animation_config.text.attribute = $('#config_attribute_' + target).val();
    // 「名前」
    animation_config.text.name = $('#config_name_' + target).val();

    // 背景色
    var value = $('input[name="config_bgcolor_' + target + '"]:checked').val();
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
    case 'variable':
      bg_style = $('#config_bgcolor_variable_' + target).val();
      break;
    }
    animation_context.bg_style = bg_style;

    // 揃え方向
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

    // 文字色（前景色）
    animation_config.fg_color = animation_definition.fg_color;
  }

  /**
   * アニメーション処理初期化
   * @param {string} sequence 初期化対象シーケンス
   * @param {string} target_canvas 描画対象canvas要素ID
   */
  function animate_initialize(sequence, target_canvas) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (sequence === undefined) {
      sequence = '1';
    }
    // アニメーション状態管理初期化
    initialize_animation_context(target_canvas);
    // 目標FPS（非表示）
    $('#target_fps').text(animation_definition.rendering_fps.toString());
    // 画面表示設定初期化
    initialize_animation_config(sequence);
    // アニメーション各要素テキスト描画サイズ計測
    measure_text();
    // 揃え方向に応じた各種座標設定
    screen_align();
  }

  /**
   * シーケンス実行キュー初期化
   */
  function sequence_queue_initialize() {
    animation_context.sequence_queue = [];
    // 画面でチェックされているシーケンスをキューに登録
    for (var i = 1 ; i <= 6 ; i++) {
      if ($('[id=sequence_enable_' + i.toString() + ']:checked').val()) {
        animation_context.sequence_queue.push(i.toString());
      }
    }
  }

  /**
   * アニメーション処理起動
   */
  function animate_ignite() {
    // アニメーション中止フラグクリア
    animation_stop = false;
    // シーケンス実行キュー初期化
    sequence_queue_initialize();
    // 現在実行状態をクリア
    animation_context.now_playing = undefined;
    // アニメーションフレーム描画処理起動
    window.requestNextAnimationFrame(animate);
  }

  /**
   * ロード時アニメーション処理起動
   * ストライプ表示の後にテキストアニメーションを実施
   */
  function onload_ignite() {
    // アニメーション中止フラグクリア
    animation_stop = false;
    // シーケンス実行キュー初期化
    // この後に先行処理定義するストライプの後のテキストアニメーション分
    sequence_queue_initialize();
    // アニメーション状態管理初期化
    initialize_animation_context();
    // ストライプアニメーション用定義で初回実行アニメーション処理を注入
    animation_context.total_frames = animation_definition.stripe.total_frames;
    animation_context.now_playing = animation_definition.stripe.sequence_number;
    animation_context.bg_style = animation_definition.stripe.bg_style;
    window.requestNextAnimationFrame(animate);
  }

  /**
   * 「アニメーション」ボタンクリックハンドラ
   */
  $('#operation_animate').on('click', function() {
    // GIFエンコーディングOFF
    animation_context.gif_encoder = undefined;
    // アニメーション処理起動
    animate_ignite();
  });

  /**
   * 「アニメーションGIF録画＆ダウンロード」ボタンクリックハンドラ
   */
  $('#operation_download').on('click', function() {
    animation_context.gif_encoder = new GIFEncoder();
    // Firefox/IEでdownload()メソッドが動作しないため代替
    animation_context.gif_encoder.download = download_alternative_FileSaver;
    // 負数は無視されるが繰り返し無しを明確化のため指定
    animation_context.gif_encoder.setRepeat(-1);
    // 描画速度(FPS)を指定
    animation_context.gif_encoder.setDelay(1000 / animation_definition.gif_rendering_fps);
    // 数値以外を指定すると誤動作するので注意（単位のpxなど）
    animation_context.gif_encoder.setSize(parseInt(animation_context.rendering_canvas.css('width')), parseInt(animation_context.rendering_canvas.css('height')));
    animation_context.gif_encoder.start();
    // アニメーション処理起動
    animate_ignite();
  });

  /**
   * Color pickerに対応するラジオボタンを選択
   * @param {Object} color_picker_element Color Picker要素
   */
  function selectColorPickerRadio(color_picker_element) {
    // color picker要素に対応するラジオボタンnameをdata-radio属性から取得
    // （prop()だと取得できない環境があるためattr()で実施）
    var radio = $(color_picker_element).attr('data-radio')
    // 指定したnameのラジオボタン群のcolor picker項目を選択
    $('input[name=' + radio + ']').val(['variable']);
  }

  /**
   * Color pickerクリックハンドラ（HTML5ネイティブ）
   */
  $('.config_bgcolor_variable').on('click', function() {
    // color pickerに対応するラジオボタンを選択
    selectColorPickerRadio(this);
  });

  /**
   * Color pickerクリックハンドラ（spectrumによる置き換え要素）
   */
  $('.config_bgcolor_variable').on('beforeShow.spectrum', function(e, tinycolor) {
    // color pickerに対応するラジオボタンを選択
    selectColorPickerRadio(this);
  });

  /**
   * Color picker変更ハンドラ（spectrumによる置き換え要素）
   * 対象シーケンス設定によるプレビュー表示を実施
   */
  $('.config_bgcolor_variable').on('change', function() {
    // color picker要素に対応するラジオボタンnameをdata-radio属性から取得
    // （prop()だと取得できない環境があるためattr()で実施）
    var radio = $(this).attr('data-radio')
    preview_sequence(radio.split('_').pop());
  });

  /**
   * 指定のシーケンスの設定でプレビュー表示（アニメーション最終フレーム）
   * @param {string} sequence プレビュー対象シーケンス
   */
  function preview_sequence(sequence) {
    // アニメーション表示を中止
    animation_stop = true;
    // 対象シーケンスの設定をもとにアニメーション最終フレームを描画
    animate_initialize(sequence, '#preview_in_sequence_' + sequence);
    // 対象シーケンスの背景色を強調して他のシーケンスは初期色に設定
    // シーケンス単位のプレビュー表示
    for(var i = 1 ; i <= animation_definition.default_config.sequence_number ; i++) {
      $('.sequence:nth-child(' + i + ')').css('background-color',
        i.toString() ==  sequence ? animation_definition.sequence_select_bg_style : 'initial');
      $('.sequence:nth-child(' + i + ') .preview_in_sequence').css('display',
        i.toString() == sequence ? 'initial' : 'none');
    }
    animation_context.frame_index = animation_context.total_frames - 1;
    animation_context.adjust_count  = animation_context.total_frames - 1;
    animation_frame_clear();
    animation_call_non_capital();
    animation_call_capital();
    animation_attribute();
    animation_name();
    // 設定変更の度にcookie保存
    store_cookie();
  }

  /**
   * シーケンス領域イベントハンドラ（クリック）
   * 対象シーケンス設定によるプレビュー表示を実施
   */
  $('.sequence').on('click', function() {
    preview_sequence(this.id.split('_').pop());
  })

  /**
   * シーケンス領域のチェックボックスイベントハンドラ（変更、フォーカス）
   * 対象シーケンス設定によるプレビュー表示を実施
   */
  $('.sequence input[type="checkbox"]').on('change focus', function() {
    preview_sequence(this.id.split('_').pop());
  })

  /**
   * シーケンス領域のテキストボックスイベントハンドラ（入力、フォーカス）
   * 対象シーケンス設定によるプレビュー表示を実施
   */
  $('.sequence input[type="text"]').on('input focus', function() {
    preview_sequence(this.id.split('_').pop());
  })

  /**
   * シーケンス領域のラジオボタンイベントハンドラ（変更、フォーカス）
   * 対象シーケンス設定によるプレビュー表示を実施
   */
  $('.sequence input[type="radio"]').on('change focus', function() {
    // 対象シーケンス抽出のためname属性を利用
    preview_sequence(this.name.split('_').pop());
  })

  /**
   * 「設定リセット」ボタンクリックハンドラ
   */
  $('#config_reset').on('click', function() {
    var config = animation_definition.default_config;
    // 選択タグ
    //config.select_tab
    // 時間優先
    $('#animation_priority_time').prop('checked', config.animation_priority_time);
    // シーケンス毎の設定
    for (var i = 1 ; i <= animation_definition.default_config.sequence_number ; i++) {
      // n番目（有効／無効チェック）
      $('#sequence_enable_' + i).prop('checked', config.animation_priority_time);
      // コール
      $('#config_call_' + i).val(config.sequence[i - 1].call);
      // 属性
      $('#config_attribute_' + i).val(config.sequence[i - 1].attribute);
      // 名前
      $('#config_name_' + i).val(config.sequence[i - 1].name);
      // 背景色
      $('input[name="config_bgcolor_' + i + '"]').val([config.sequence[i - 1].bgcolor]);
      // 背景色（color picker）
      // HTML5/spectrumで共通
      var bg_style_separate = animation_definition.bg_style_separate[config.sequence[i - 1].bgcolor_variable];
      var rgb = getHexRGB(bg_style_separate.r, bg_style_separate.g, bg_style_separate.b);
      $('#config_bgcolor_variable_' + i).val(rgb);
      // 揃え方向
      $('input[name="config_align_' + i + '"]').val([config.sequence[i - 1].align]);
      // 文字色
      //config.sequence[i].fgcolor;
    }
    // cookie保存の設定もリセット
    store_cookie();
    // 画面最上部へスクロール
    // TODO: ブラウザに応じてスクロール処理を切り分け
    window.scroll(0, 0);
    $(window).scrollTop();
    // ロード時のデモンストレーションを実行
    onload_ignite();
  });

  /**
   * Color picker（任意色選択）初期化
   * 実装時点ではIEおよびiOS SafariがHTML5 color pickerに対応していないため
   * spectrumライブラリを併用
   * できるだけHTML5ネイティブを利用する
   */
  function initializeColorPicker() {
    // 背景色のRGB値分離定義への参照ショートカット
    var config = animation_definition.bg_style_separate;
    // WebブラウザがHTML5ネイティブのcolor pickerに対応しているか否か
    var is_native = $('#config_bgcolor_variable_1').spectrum.inputTypeColorSupport();
    for (var i = 1 ; i <= animation_definition.default_config.sequence_number ; i++) {
      if (is_native) {
        // HTML5ネイティブのcolor picker設定
        $('#config_bgcolor_variable_' + i).val(
          getHexRGB(config['preset_' + i].r, config['preset_' + i].g, config['preset_' + i].b
        ));
      } else {
        // spectrumライブラリのcolor picker設定
        $('#config_bgcolor_variable_' + i).spectrum({
          color: animation_definition.bg_style['preset_' + i],
          showInput: true,
          chooseText: 'OK',
          cancelText: 'キャンセル',
          beforeShow: function(tinycolor){},
          preferredFormat: 'rgb'
        });
      }
    }
  }

  /**
   * SNSシェア関連初期化
   */
  function initializeShare() {
    var text, url, href;
    text = document.title;
    url = document.URL.replace(/\/[^/]*$/, '/');

    // Open Graph Protocol (OGP)
      // Twitter Cardは後からメタ情報をJavascriptで生成してもNG
    
    // Twitter
      // NOP

    // Facebook
      // NOP

    // Google+
      // NOP

    // はてなブックマーク
      // NOP

    // LINE
    $('.shareln').data("url", encodeURI(url));
    if (typeof(LineIt) !== "undefined") {
      // 「LINEで送る」ボタン有効化
      LineIt.loadButton();
    }
  }

  // 画面ロード時初回実行
  // Color picker（任意色指定）初期化
  initializeColorPicker();
  // SNSシェア関連初期化
  initializeShare();
  // 前回セション設定をcookieから取得
  load_cookie();
  // アニメーション起動（デモンストレーション）
  animate_initialize(); // 初回実行時にフォントサイズ計測に失敗する環境対策アドホック
  onload_ignite();
});
