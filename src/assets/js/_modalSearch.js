module.exports = function () {
  //-----------------------------------------
  //  検索のモーダル表示
  //-----------------------------------------
  // モーダル要素を取得
  var modal = {
    bg    : '.modal-wrapper',
    body    : '.p-detail-search-wrap',
    btn: '.modal-search-btn',
    close     : '.modal-search-close',
    flag     : false
  };

  // モーダル検索要素の存在確認
  modal.flag = $(modal.body).length > 0;

  // モーダルの処理を管理する関数
  function manageModal(enable) {
    if (enable) {
      $(modal.bg).hide();
      // ボタンがクリックされたらモーダルを表示
      $(modal.btn).on('click', function(event) {
        event.preventDefault(); // デフォルトのイベント動作をキャンセル
        $(modal.bg).fadeIn();
      });
      // <span>（x）がクリックされたらモーダルを閉じる
      $(modal.close + ' button').on('click', function(event) {
        event.preventDefault(); // デフォルトのイベント動作をキャンセル
        $(modal.bg).fadeOut();
      });
      // ユーザーがモーダル外をクリックした場合にモーダルを閉じる
      window.onclick = function(e) {
        if ($(e.target).is(modal.bg)) {
          $(modal.bg).fadeOut();
        }
      }
    } else {
      // タブリセット
      $(modal.btn).off('click'); // イベントハンドラを削除
      $(modal.close).off('click'); // イベントハンドラを削除
      $(modal.bg).show();
    }
  }

  // 初期ロードとリサイズ時の両方で処理を実行
  function checkAndApplyTabBehavior() {
    var windowWidth = $(window).width();
    if (windowWidth > 735) {
      manageModal(false); // PCの場合はモーダルを無効に
    } else {
      manageModal(true); // スマホの場合はモーダルを有効に
    }
  }

  // 詳細画面の検索モーダルの場合の処理
  if (modal.flag) {
    // モーダル検索要素をオーバーレイ要素で包括
    $(modal.body).wrap('<div class="modal-wrapper"></div>');
    $(modal.body).append('<div class="modal-search-close"><button type="button" class="c-button c-button-close">閉じる</button></div>');

    // モーダルとタブのUI切り替え処理(ページ読み込み&ウィンドウサイズ変更時に実行)
    $(window).on('load resize', checkAndApplyTabBehavior);

  }

};
