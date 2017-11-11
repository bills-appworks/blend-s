﻿/**
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
      "rendering_fps": 30,

      "//gif_rendering_fps": "GIFアニメーションFPS",
      "gif_rendering_fps": 24,

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
          [ 0,  1,  3,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
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

      "//fg_color": "文字列デフォルト表示色",
      "fg_color": "rgb(255, 255, 255)",

      "//gif_filename": "アニメーションGIFダウンロードファイルデフォルト名",
      "gif_filename": "blend-s_logo_animation.gif"
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
    // .frame_index: アニメーション定義のステップ配列インデックス
    // .adjust_count: 左に流れる動きのカウンタ
    // .previous_frame_time: 前回フレーム描画の時刻
    // .previous_animate_time: アニメーション処理メソッドの前回処理時刻
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
   * アニメーション描画処理：canvas全体を背景色で初期化
   */
  function animation_frame_clear() {
    var canvas_context = animation_context.rendering_canvas_context;
    canvas_context.clearRect(0, 0, animation_context.rendering_canvas_width, animation_context.rendering_canvas_height);
    canvas_context.fillStyle = animation_context.bg_style;
    canvas_context.beginPath(); // TODO: 初期実装の残留か要確認
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
   * jsgif download()がFirefoxでは動作しないので下記を参考に回避
   * https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
   * ダウンロード用ダミーa要素をdocumentに紐づけ
   * @param {string} filename 利用者に提示するファイル名
   */
  function download_altanative(filename) {
    // エンコーディングされたGIF chunkを参照
    var out = animation_context.gif_encoder.stream();
    // オリジナルメソッドのエラー処理は省略
    var templink = document.createElement("a");
    document.body.appendChild(templink); // オリジナルに追加
    templink.setAttribute("type", "hidden"); // オリジナルに追加
    templink.download=filename;
    templink.href= URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {type : "image/gif" } ));
    templink.click();
    document.body.removeChild(templink); // オリジナルに追加
  }

  /**
   * アニメーション処理主制御
   * @param {number} time 呼び出し時刻
   */
  function animate(time) {
    // シーケンス処理中でなければ次のシーケンスで初期化処理
    if (!animation_context.now_playing) {
      if (animation_context.now_playing = animation_context.sequence_queue.shift()) {
        animate_initialize(animation_context.now_playing);
      }
    }

    // 以下の条件を満たす場合にアニメーション描画処理実施
    // ・全アニメーションフレームが終了していない
    // ・目標FPSとなる前フレーム処理からの時間経過
    if (animation_context.frame_index < animation_definition.total_frames) {
      if (time - animation_context.previous_animate_time > 1000 / animation_definition.rendering_fps) {
        animation_context.previous_animate_time = time;
        // 背景色でクリアし、各要素を描画
        animation_frame_clear();
        animation_call_non_capital();
        animation_call_capital();
        animation_attribute();
        animation_name();
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
   * アニメーション状態管理初期化：シーケンス起動時
   */
  function initialize_animation_context_sequence_start() {
    // アニメーション定義のステップ配列インデックス
    animation_context.frame_index = 0;
    // 左に流れる動きのカウンタ
    animation_context.adjust_count = 0;
  }

  /**
   * アニメーション状態管理初期化：全体初回
   */
  function initialize_animation_context() {
    // アニメーション描画canvas
    // jQuery要素オブジェクト
    animation_context.rendering_canvas = $('#rendering_canvas');
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

    // シーケンス関連状態管理初期化
    initialize_animation_context_sequence_start();

    // アニメーション処理メソッド前回処理時刻
    animation_context.previous_animate_time = 0;
    // 前回フレーム描画の時刻
    animation_context.previous_frame_time = 0;
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
   */
  function animate_initialize(sequence) {
    // IE11でデフォルトパラメタがサポートされていないので代替
    if (sequence === undefined) {
      sequence = '1';
    }
    // アニメーション状態管理初期化
    initialize_animation_context();
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
    // シーケンス実行キュー初期化
    sequence_queue_initialize();
    // 現在実行状態をクリア
    animation_context.now_playing = undefined;
    // アニメーションフレーム描画処理起動
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
    // Firefoxでdownload()メソッドが動作しないため代替
    animation_context.gif_encoder.download = download_altanative;
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

  // 画面ロード時にアニメーション起動（デモンストレーション）
  animate_ignite();
});
