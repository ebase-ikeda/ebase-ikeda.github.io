module.exports = function () {
  //-----------------------------------------
  //  フォーム入力チェック
  //-----------------------------------------
  // Parsleyの自動フォーカスを無効にする
  var $forms = $('.js-form-validate');

  // formのclass要素がある場合に処理
  // formが無いページでエラーが出て他のJSが動かなくなっていたため
  if ($forms.length > 0) {
    var form = $forms.parsley({ focus: 'none' });

    // エラーメッセージのカスタマイズ
    $forms.find('[required]').each(function(){
      var name = $(this).data('name');
      var element = "を入力してください。";
      if ($(this).is('input[type="radio"]')) {
        element = "を選択してください。"
      } else if ($(this).is('input[type="email"]')) {
        element = "を入力してください。"
      } else if ($(this).is('select')) {
        element = "を選択してください。"
      }
      if(name) {
        var nameError = name + element;
        $(this).attr('data-parsley-required-message', nameError);
      }
    })

    // 指定した入力フィールドの required 属性とエラーメッセージを設定する関数
    function toggleRequired(input, isChecked, errorMsg) {
      input.prop('required', isChecked);
      if (isChecked && errorMsg) {
          // エラーメッセージが提供されていれば設定
          input.attr('data-parsley-required-message', errorMsg);
          // バリデーション状態をリセット（コメント解除するときは Parsley を使用していることを確認）
          // input.parsley().reset();
      } else {
          // required が false の場合、エラーメッセージ属性を削除
          input.removeAttr('data-parsley-required-message');
      }
    }

    // 職種「その他」の制御
    $('#EU_TJOB99').on('change', function() {
      const $mainInput = $('#eu-tjob-sonota');
      toggleRequired($mainInput, this.checked, '職種「その他」を入力してください。');
    });
    // 用途「その他」の制御
    $('#EU_USE99').on('change', function() {
      const $mainInput = $('#eu-use-sonota');
      toggleRequired($mainInput, this.checked, '用途「その他」を入力してください。');
    });
    // 対象「その他」の制御
    $('#EU_OBJECT99').on('change', function() {
      const $mainInput = $('#eu-object-sonota');
      toggleRequired($mainInput, this.checked, '対象「その他」を入力してください。');
    });
    // お仕事「その他」の制御
    $('#kij11').on('change', function() {
      const $mainInput = $('#kijbm');
      toggleRequired($mainInput, this.checked, 'お仕事「その他」を入力してください。');
    });

    // 新規登録「法人」の制御
    $("input[name=kiku1]").on('change', function() {
      const isChecked = $('#kiku1').prop('checked');
      const isChecked2 = $('#kiku2').prop('checked');
      $('#kika1, #kika2, #kika3, #kika4').prop('required', isChecked);
      // 法人チェック時：エラーメッセージを設定
      if (isChecked) {
        $('#kika1').attr('data-parsley-required-message', '法人・個人区分が法人の場合、法人名を入力してください。');
        $('#kika2').attr('data-parsley-required-message', '法人・個人区分が法人の場合、法人名(カナ)を入力してください。');
        $('#kika3').attr('data-parsley-required-message', '法人・個人区分が法人の場合、部署名を入力してください。');
        $('#kika4').attr('data-parsley-required-message', '法人・個人区分が法人の場合、部署名(カナ)を入力してください。');
      }
      // 個人チェック時：法人項目のinputクリア
      if (isChecked2) {
        $('#kika1, #kika2, #kika3, #kika4').val('');
      }
    });

    // バリデーション失敗時の処理
    form.on('form:validated', function(formInstance) {
      var errorList = $('.c-error-massage');
      errorList.html(''); // エラーリストをクリア

      // フォーム全体のエラーを取得してリストに追加
      formInstance.fields.forEach(function(field) {
        field.getErrorsMessages().forEach(function(errorMsg) {
          errorList.append($('<li>').text(errorMsg)); // 各エラーメッセージをリストアイテムとして追加
        });
      });

      // エラーリストの表示・非表示制御
      if (formInstance.validationResult) {
        $('.c-error-container').hide();
      } else {
        $('.c-error-container').show();
        $('html, body').animate({
            scrollTop: $('#form-error-summary').offset().top - 80
        }, 500); // 500ミリ秒でスクロール
      }
    });
  }

  // ----------------------------
  // numberの整数入力制限
  $('input.c-type-integer').on('change', function() {
    const $input = $(this);
    const value = $input.val();

    // 正の整数のみをチェックする正規表現
    const isValid = /^\d+$/.test(value);
    if (isValid) {
      console.log('yes')
    } else {
      console.log('no')
      $input.val('0');  // 不正な値をクリア
    }
  });

};
