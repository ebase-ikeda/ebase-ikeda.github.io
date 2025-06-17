const { src, dest, watch, series, parallel } = require("gulp");
// ファイルシステムモジュール
const fs = require('fs');
const path = require('path');
const del = require('del');
// 直列処理(順番に処理):series(), 並列処理（順番を問わない）:parallel()
const ejs = require("gulp-ejs");
const htmlbeautify = require("gulp-html-beautify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const sass = require('gulp-sass')(require('sass'));
// const sass = require('sass-embedded');
// const dartSass = require('gulp-dart-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const sassGlob = require('gulp-sass-glob'); // @importを纏めて指定
const tailwindcss = require('tailwindcss');
const browserSync = require('browser-sync');
const connectSSI = require('connect-ssi');
const gcmq = require('gulp-group-css-media-queries'); // media queryを纏める
const mode = require('gulp-mode')({
  modes: ['production', 'development'], // 本番実装時は 'gulp --production'
  default: 'development',
  verbose: false,
})
const webpack = require("webpack");
const webpackStream = require("webpack-stream"); // gulpでwebpackを使うために必要なプラグイン

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// CSSコンパイル
const compileSass = () => {
  const postcssPlugins = [
    tailwindcss,
    autoprefixer({ cascade: false, }),
    cssdeclsort({ order: 'alphabetical' })
  ];

  return src("./src/assets/scss/**/*.scss", { sourcemaps: false })
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(mode.production(gcmq()))
    .pipe(dest("./dist/assets/css", { sourcemaps: './sourcemaps' }));
};

// HTMLコンパイル
const compileEjs = () => {
  return src(["./src/pages/**/*.ejs", "!" + "./src/pages/**/_*.ejs"])
    .pipe(ejs().on('error', errorHandler))
    .pipe(rename({ extname: ".html" }))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
    .pipe(htmlbeautify({
      "indent_size": 2,
      "indent_char": "\t",
      "indent_with_tabs": true,
      "max_preserve_newlines": 1,
      "preserve_newlines": false,
      "extra_liners": [],
    }))
    .pipe(dest("./dist/"));
};
function errorHandler(err) {
  console.error('Error:', err.toString()); // エラー詳細をログに出力
  this.emit('end'); // ストリームを強制終了しない
}

// 画像コンパイル
const compressionImg = () => {
  return src("./src/assets/img/**")
    .pipe(changed("./dist/assets/img/"))
    .pipe(imageMin([
        pngquant({ quality: [0.6, 0.7], speed: 1 }),
        mozjpeg({ quality: 65 }),
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
    ]))
    .pipe(dest("./dist/assets/img/"));
};

// copyフォルダのファイルをdist直下にコピーするタスク
const copySharedFiles = () => {
  return src('./src/shares/**/*') // sharesフォルダ内の全ファイルとサブフォルダを選択
    .pipe(dest('./dist')); // distディレクトリにコピー
};

// 起動時のパス
var startPath = '/index.html';

// ローカルサーバ起動
const buildServer = done => {
  browserSync.init({
    port: 3000,
    notify: false,
    // 静的サイト
    server: {
      baseDir: './dist/',
    },
    startPath: startPath,
    middleware: [
      connectSSI({
        baseDir: './dist',
        ext: '.html'
      })
    ],
    // proxy: 'localhost:3000',
    open: false // ブラウザ自動オープンの制御
    // 動的サイト
    // files: ['./**/*.php'],
    // proxy: 'http://localsite.wp/',
  })
  done()
}

// const buildServer = done => {
//   browserSync.init({
//     proxy: 'localhost:3000',
//     open: false // ブラウザ自動オープンの制御
//   })
//   done()
// }

// ブラウザ自動リロード
const browserReload = done => {
  browserSync.reload()
  done()
}

// webpack
const bundleJs = () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function (err) {
      console.error(err.message);
      this.emit('end'); // エラーがあった場合でもGulpを継続させます。
    })
    .pipe(dest("./dist/assets/js"));
};

// ファイル監視
const watchFiles = () => {
  watch('./dist/**/*.html', { usePolling: true })
  watch('./src/pages/**/*.ejs', { usePolling: true }, series(compileEjs, browserReload))
  watch('./src/assets/scss/**/*.{scss,sass}', { usePolling: true }, series(compileSass, browserReload))
  watch('./src/assets/js/**/*.js', { usePolling: true }, series(bundleJs, browserReload))
  watch('./src/assets/img/**/*.{png,jpg,svg}', series(compressionImg, browserReload))
}

// ファイル出力
const distBuild = parallel(compileSass, compileEjs, compressionImg);

// shouldSkipDistCheck変数がtrueで起動時に毎回出力。falseでdistファイルが無い時だけ出力。
let shouldSkipDistCheck = true;

// distフォルダの存在及び空でないことを確認し、なければdistBuildタスクを実行する関数
const checkDistFolder = (cb) => {
  if (shouldSkipDistCheck) {
    console.log('distフォルダの存在チェックをスキップ機能が有効です。ファイル出力します。');
    return series(distBuild)(cb);
  }else{
    const checkDist = path.resolve('./dist');
    // distフォルダが存在しない、または空の場合にtrue
    let shouldRunDistBuild = false;
    if (!fs.existsSync(checkDist)) {
      console.log('distフォルダが見つかりません。distBuildタスクを実行します。');
      shouldRunDistBuild = true;
    } else {
      // distフォルダが存在しても、中身が空の場合はdistBuildタスクを実行
      const files = fs.readdirSync(checkDist);
      if (files.length === 0) {
        console.log('distフォルダが空です。distBuildタスクを実行します。');
        shouldRunDistBuild = true;
      }
    }
    if (shouldRunDistBuild) {
      return series(distBuild)(cb);
    }
    cb(); // 条件に一致しない場合、単にコールバックを呼び出す
  }
}

// distフォルダを削除するタスク
const cleanDist = () => {
  return del(['./dist/**', '!./dist']);
};

// distフォルダを削除してから再出力するタスク
const rebuildDist = series(cleanDist, distBuild);

exports.sass = compileSass;
exports.ejs = compileEjs;
exports.img = compressionImg;
exports.build = distBuild;
exports.clean = cleanDist;
exports.rebuild = rebuildDist;
exports.copy = copySharedFiles;
exports.default = series(checkDistFolder, buildServer, copySharedFiles, watchFiles);
