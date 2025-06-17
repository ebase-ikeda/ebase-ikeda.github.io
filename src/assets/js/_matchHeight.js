module.exports = function () {
  //-----------------------------------------
  //  要素の高さ揃え
  //-----------------------------------------
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        func.apply(context, args);
      }, wait);
    };
  }

  // 高さを揃える関数
  function matchHeight() {
    var maxHeight = 0;
    $('.js-match-height').height('auto'); // 高さをリセット
    $('.js-match-height').each(function() {
      var thisHeight = $(this).height();
      if (thisHeight > maxHeight) { maxHeight = thisHeight; }
    });
    $('.js-match-height').height(maxHeight);
  }

  matchHeight();

  // ウィンドウのサイズ変更時にデバウンスを適用
  $(window).resize(debounce(matchHeight, 100));
};
