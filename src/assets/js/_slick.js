module.exports = function () {
  //-----------------------------------------
  //  slick.js
  //-----------------------------------------
  // スライダー呼出し
  function checkBreakPoint() {
    w = $(window).width();
    if (w <= 736) {
      // スマホ向け（736px以下のとき）
      $('.p-slider-item').not('.slick-initialized').slick({
        //スライドさせる
        arrows: false,
        dots: true,
        fade: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2.5,
        centerMode: false,
        variableWidth: true
      });
    } else {
      // PC向け
      $('.p-slider-item.slick-initialized').slick('unslick');
    }
  }
  // ウインドウがリサイズする度にチェック
  $(window).on("resize", function(){
    checkBreakPoint();
  });
  // 初回チェック
  checkBreakPoint();

  // 商品詳細のメイン画像とサムネイル画像のスライダー
  function initializeSlider() {
    const $mainSlider = $('.p-slider-gallery');
    const $thumbSlider = $('.p-slider-thumnail');
    let currentIndex;
    let index;
    let isSelect = true;
    
    $mainSlider.slick({
      arrows: false,
      dots: false,
      fade: true,
      waitForAnimate: false,
      asNavFor: '.p-slider-thumnail',
      speed: 180,
    });
    $thumbSlider.slick({
      asNavFor: '.p-slider-gallery',
      arrows: false,
      dots: false,
      focusOnSelect: true,
      variableWidth: true,
      infinite: false
    });
    // サムネイルホーバー時にメインスライダーを一時的に変更
    let debounceTimer;
    $thumbSlider.find('.slick-slide').on('mouseenter', function() {
      // 即時処理だと高速切り替えで不具合が出たためデバウンス処理を追加
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if(isSelect){ //選択状態がtrueの時だけcurrentIndexを保持（初期時とクリックの選択時にtrue状態になる）
          currentIndex = $mainSlider.slick('slickCurrentSlide');
          isSelect = false;
        }
        index = $(this).index();
        $mainSlider.slick('slickGoTo', index);
        $thumbSlider.find('.slick-slide').removeClass('slick-active').eq(currentIndex).addClass('slick-active');
        // console.log("スライドへマウスオーバー", currentIndex, index)
      }, 180); // デバウンス処理時間
    });
    // サムネイルエリアをマウスアウト時に元のスライド（選択状態のスライド）に戻す
    $thumbSlider.on('mouseleave', function() {
      $mainSlider.slick('slickGoTo', currentIndex);
      // console.log("マウスアウト", currentIndex, index)
    });
    // サムネイルクリックで決定
    $thumbSlider.find('.slick-slide').on('click', function() {
      currentIndex = $mainSlider.slick('slickCurrentSlide');
      index = $(this).index();
      isSelect = true;
    });
  }

  initializeSlider();

};