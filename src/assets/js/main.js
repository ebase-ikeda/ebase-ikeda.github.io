// npm プラグイン
import $ from 'jquery';
import Parsley from 'parsleyjs';
import 'parsleyjs/src/i18n/ja';
import 'jquery-ui/ui/widgets/sortable';
import 'slick-carousel';
import 'lity';
// import litybox from 'lity'
import lightbox from 'lightbox2'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';

/* モジュール */
var slick               = require('./_slick');
// var lity                = require('./_lity');
// var sortable            = require('./_sortable');
var tabSearch           = require('./_tabSearch');
var modalSearch         = require('./_modalSearch');
// var matchHeight         = require('./_matchHeight');
// var formValidate        = require('./_formValidate');
var mod                 = require('./_mod');

$(function() {
  ////////////////////////////////////////////////////
  slick();
  // lity();
  // sortable();
  tabSearch();
  modalSearch();
  // matchHeight();
  // formValidate();
  mod();

  lightbox.option({
    'albumLabel': "",
    'disableScrolling': false,
    'positionFromTop': 20
  });
});