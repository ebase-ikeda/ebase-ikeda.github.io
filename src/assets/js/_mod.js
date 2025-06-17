module.exports = function () {
  //-----------------------------------------
  // ユーザーエージェント判定
  //-----------------------------------------
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    // スマートフォン用コード
    $("body").addClass("mobile");
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    // タブレット用コード
    $("body").addClass("tablet");
  }
  if (ua.indexOf('Android') > 0) {
    // Android用コード
    $("body").addClass("android");
  }

  //-----------------------------------------
  // サイド開閉
  //-----------------------------------------
  $(".js-side-toggle").on("click", function(e){
    e.preventDefault();
    $("body").toggleClass("l-side-open");
    $(this).toggleClass('is-open', $('body').hasClass('l-side-open'));
  })

  //-----------------------------------------
  // カテゴリ開閉
  //-----------------------------------------
  $(".js-category-tree").each(function(){
    $(this).find('li:has(ul)').addClass('js-tree-item').children('a').on('click', function(e){
      e.preventDefault();
      $(this).closest('li').toggleClass('js-tree-open');
      $(this).next('ul').slideToggle();
    });
  })

  //-----------------------------------------
  // ラインナップの表示数を制御
  //-----------------------------------------
  function LineupAllMore() {
    $('.p-detail-item-lineup').each(function() {
      const $container = $(this);
      const $items = $container.find('.p-detail-item-list-child');
      const $more = $container.find('.p-detail-item-list-more');

      // ラインナップが6つ以上の場合のみ「もっと見る」を表示
      if ($items.length > 5) {
        $container.addClass('is-visible-more');
        // 既存のクリックイベントを解除
        $more.children('a').off('click');
        // ボタンのクリックイベント
        $more.children('a').on('click', function(event) {
          event.preventDefault();
          $container.toggleClass('is-visible-all');
        });
      }
    });
  }

  // 初回に1回実行
  LineupAllMore();

  //-----------------------------------------
  // ビデオ再生の制御
  //-----------------------------------------
  function videoPlayTop() {
    const videoContainer = document.querySelector('.l-video-container');
    if (videoContainer) {
      // 要素が存在する場合の処理
      const video = videoContainer.querySelector('video');

      // ビデオの読み込みが完了したときのイベントリスナーを追加
      video.addEventListener('loadeddata', () => {
          // console.log("Video data loaded"); // ビデオデータが読み込まれたことを確認
          videoContainer.classList.add('is-visible');
          setTimeout(() => {
            video.play().then(() => {
              // console.log("Video is playing"); // ビデオ再生開始時の確認
            }).catch((error) => {
              console.error("Error playing video:", error); // 再生エラー
            });
          }, 2000); // 2秒の遅延
      });

      // エラーハンドリング
      video.addEventListener('error', (e) => {
        console.error("Video error:", e); // エラー内容を出力
      });
    }
  }

  // 初回に1回実行
  // videoPlayTop();

  // MediaQueryListオブジェクトを生成する
  const mql = window.matchMedia('(max-width: 735px)');
  // 動画のロード状態を確認するフラグ
  let isVideoLoaded = false;

  // 動画再生を制御するメソッド
  function setVideoSrc() {
    if (isVideoLoaded) {
      // すでにロードされている場合は何もしない
      return;
    }
    // video要素を取得する
    const mediaContainer = document.querySelector('.l-top-image');

    if (!mediaContainer) return; // 対象セレクタが無い場合は処理を停止
    const videoElement = mediaContainer.querySelector('video');
    const videoSource = mediaContainer.querySelector('video > source');

    if (!mql.matches) {
      // カスタムデータ属性の値をsrc属性に設定する
      videoSource.src = videoSource.dataset.src;
      // video要素をリセットして、動画ファイルの読み込みを開始する
      videoElement.load();
      isVideoLoaded = true;
    }
  }
  
  // 画面読み込み時に初期実行
  setVideoSrc();
  
  // MediaQueryListオブジェクトのchangeイベントにリスナーを設定する
  mql.addEventListener('change', setVideoSrc);

  //-----------------------------------------
  // 商品特長画像のサイズ判定
  //-----------------------------------------
  function ImgPointSize() {
    const images = document.querySelectorAll('.p-detail-point-content img');
    if(images){
      images.forEach(image => {
        if (image.naturalWidth >= 1280) {
          image.parentNode.classList.add('is-full');
        }
      });
    }
  }

  // 初回に1回実行
  ImgPointSize();

};
