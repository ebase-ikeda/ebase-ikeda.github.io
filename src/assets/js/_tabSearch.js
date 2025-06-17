module.exports = function () {
  //-----------------------------------------
  //  検索のタブ表示
  //-----------------------------------------
  // タブ要素を取得
  var tab = {
    nav    : '.c-tabs li',
    body    : '.c-tab-panel',
    selectClass: 'is-active'
  };
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

  // タブの処理を管理する関数
  function manageTabs(enable) {
    if (enable) {
      // タブ初期化
      $(tab.nav).each(function() {
        var tabIndex = $(this).index();
        $(this).attr('data-tab', tabIndex);
        if (tabIndex === 0) {
          $(this).addClass(tab.selectClass);
          $(this).closest('.c-tab-wrap').children(tab.body).eq(tabIndex).addClass(tab.selectClass);
        }
      });
      // タブクリック時のイベント
      $(tab.nav).on('click', function(event) {
        event.preventDefault();
        $(this).closest('ul').find('li').removeClass(tab.selectClass);
        $(this).addClass(tab.selectClass);
        var tabIndexData = $(this).data('tab');
        $(this).closest('.c-tab-wrap').children(tab.body).removeClass(tab.selectClass).eq(tabIndexData).addClass(tab.selectClass);
      });
    } else {
      // タブリセット
      $(tab.nav).off('click'); // イベントハンドラを削除
      $('.c-tabs li, .c-tab-panel').removeClass(tab.selectClass);
    }
  }

  // タブ処理実行
  manageTabs(true);

};
