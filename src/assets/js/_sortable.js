module.exports = function () {
  //-----------------------------------------
  //  jQuery UI の Sortable 
  //-----------------------------------------
  const $table =  $('.js-sort-table');
  $table.sortable({
    "items": "tbody > tr",
    update: function(event, ui) {
      updateRowNumbers();
    }
  });
  addRowTable();
  deleteRowTable();

  // グローバル関数の定義
  window.refreshSortable = function() {
    const $table =  $('.js-sort-table');
    $table.sortable({
      "items": "tbody > tr",
      update: function(event, ui) {
        updateRowNumbers();
      }
    });
    if ($table.data('ui-sortable')) {  // sortable が初期化されているか確認
      $table.sortable("refresh");
    }
  }
  window.destroySortable = function() {
    const $table =  $('.js-sort-table');
    if ($table.data('ui-sortable')) {  // sortable が初期化されているか確認
      $table.sortable("destroy");
    }
  }

  // 並び替え時、連番を更新
  function updateRowNumbers(){
    $('.js-sort-table tbody > tr').each(function(index) {
      $(this).find('td:first').text(index + 1);
    });
  }
  // 行の追加
  function addRowTable(){
    $('.js-sort-add').on('click', function() {

      var rowCount = $('.js-sort-table tbody > tr').length; // 現在の行数を取得
      if (rowCount < 50) { // 行数が50未満の場合のみ新しい行を追加
        var newItemRow = $('.js-sort-table tbody > tr:last').clone();

        // `input` 要素以外の内容を削除
        newItemRow.find('td').each(function() {
          var savedElement = "";
          if($(this).children('a.c-link-text-delete').length) {
            savedElement = $(this).children('a.c-link-text-delete').detach();
          }
          if($(this).children('img').length) {
            savedElement = $(this).children('img').detach();
          }
          if(!$(this).children('input').length) {
            $(this).text("");
          }
          $(this).children().not('input').remove();
          $(this).append(savedElement);
        });
      
        // `input` 要素の値をクリア
        newItemRow.find('input').val('');
      
        // `input[type=checkbox]`のチェックを解除
        newItemRow.find('input[type=checkbox]').prop('checked', false);
  
        $('.js-sort-table tbody').append(newItemRow);
        $table.sortable('refresh');
        updateRowNumbers();
      }else{
        alert("これ以上行を追加することはできません。"); // 行数が50に達したことをユーザーに通知
      }
    });
  }
  // 行の削除
  function deleteRowTable(){
    $(document).on('click','.js-sort-delete', function(event) {
      event.preventDefault(); // デフォルトのイベント動作をキャンセル
      $(this).closest('tr').remove();
      $table.sortable('refresh');
      updateRowNumbers();
    });
  }
};
