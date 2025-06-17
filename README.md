# プロジェクト名

PILOT案件のサイト制作ファイル。

## 説明

eBASEカスタマイズのひな型web制作のためのファイル。
開発へ連携して環境に実装してもらう。

## 機能説明

- 特に先方提供ファイルは無し。一からこちらでコーディングしている案件。
- 制作ファイルはsrc内に配置。「assets」が画像やスタイル、jsなどの各種ファイル。「pages」がHTMLとなるページファイル。「shares」がコピーファイルを格納。
　これらをgulpでコンパイルし、dist内に出力。

## ディレクトリ構成
```
project名/
├── node_modules/               // プロジェクトの依存関係
├── src/                        // WEB制作ファイル
│   ├── assets/                 // 静的リソース（画像、スタイル、フォントなど）
│   │   ├── js/                 // JavaScript（JSとしてコンパイル）
│   │   ├── scss/               // SCSS(CSSとしてコンパイル)
│   │   └── img/                // 画像
│   │   └── images/             // colorboxのコントロールUI画像格納
│   │   └── video/              // 動画
│   ├── pages/                  // アプリケーションの各ページ(HTMLとしてコンパイル)
│   │   └── ***.ejs             // EJS
│   └── shares                  // コピーファイル（dist直下にそのまま出力）
│       └── favicon.ico         // ファビコン
├── dist/                       // srcからビルドされた成果物（gulpが生成）
│   ├── assets/                 // 静的リソース（画像、スタイル、フォントなど）
│   │   ├── js/                 // jsファイル
│   │   ├── css/                // cssファイル
│   │   └── img/                // 画像ファイル
│   ├── favicon.ico             // ファビコン
│   └── ***.html                // htmlファイル
├── .gitattributes              // Git属性を定義するファイル。改行スタイルの正規化やバイナリファイルの扱いなどを指定。
├── .gitignore                  // Gitバージョン管理から除外したいファイルやディレクトリのパターンを記述するファイル。
├── babel.config.json           // Babelの設定ファイル。JavaScriptコードをトランスパイルする際の設定をJSON形式で記述。
├── docker-compose.yml          // Docker Compose設定ファイル。マルチコンテナDockerアプリケーションのサービス、ネットワーク、ボリュームなどを定義。
├── Dockerfile                  // Dockerイメージのビルド時に実行される命令を記述したファイル。アプリケーションの環境構築手順を定義。
├── webpack.config.js           // Webpackの設定ファイル。モジュールバンドルの作成方法、ローダー、プラグインなどの設定をJavaScript形式で記述。
└── README.md                   // プロジェクトの説明書。プロジェクトの概要、セットアップ方法、使用方法などをマークダウン形式で記述。
```

## sass構成
```
scss/
│
├ global/
│  ├ _config.scss  // 変数、mixin、関数定義。ファイル先頭に @useも@forwardも記述しない。
│  └ _index.scss  // ファイル先頭に @forward "config";
│
├ foundation/
│  ├ _reset.scss  // ファイル先頭に @use "../global" as g;
│  ├ _type.scss  // ファイル先頭に @use "../global" as g;
│  └ _index.scss  // ファイル先頭に @forward "reset"; @forward "type";
│
├ layout/
│  ├ _header.scss  // ファイル先頭に @use "../global" as g;
│  ├ _footer.scss  // ファイル先頭に @use "../global" as g;
│  └ _index.scss  // ファイル先頭に @forward "header"; @forward "footer";
│
├ component/
│  ├ _btn.scss  // ファイル先頭に @use "../global" as g;
│  ├ _card.scss  // ファイル先頭に @use "../global" as g;
│  └ _index.scss  // ファイル先頭に @forward "btn"; @forward "card";
│
├ project/
│  ├ _article.scss  // ファイル先頭に @use "../global" as g;
│  ├ _form.scss  // ファイル先頭に @use "../global" as g;
│  └ _index.scss  // ファイル先頭に @forward "article"; @forward "form";
│
├ utility/
│  ├ _border.scss  // ファイル先頭に @use "../global" as g;
│  ├ _color.scss  // ファイル先頭に @use "../global" as g;
│  └ _index.scss  // ファイル先頭に @forward "border"; @forward "color";
│
└ style.scss
```

## 制作画面

### 商品検索関連画面 (S) Searchの頭文字から：検索結果や詳細画面など検索条件やDB値を元に内容が変化する画面
- S-1.トップページ: product-top.html
- S-2.検索結果（フル品番）: product-result1.html
- S-2.検索結果（フル品番）-2: product-result1-2.html
- S-3.検索結果（ハーフ品番）: product-result2.html
- S-4.商品詳細画面: product-detail.html
- S-5.検索結果（0件）: product-result-nothing.html

### ページ画面 (P) pageの頭文字から：固定ページ系の画面
無し

## 制作ノート
Dart Sass 1.79.0 以降でレガシーJS APIの警告が出るようになり、現状プラグインアップデートなどで改善しないため、問題解決までは1.78のバージョンを使用する（^をつけない）

[Breaking Change: Legacy JS API](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/)

## デザインルール
- コンテンツ最大幅は1280px（1344px - 4rem）
- 左右余白は基本2rem

## 始め方
ローカル環境の差異に左右されないように、Docker上でnode環境を構築しgulpを動かして制作します。
まだの方はDocker Desktopをインストールしておいてください。

### 前提条件

このプロジェクトを使用する前に必要なツール、ライブラリ、フレームワーク、またはその他の依存関係に関する情報をここに記載します。

Node.js (v20以上)
npm (v6.9.0以上)


### インストール
■Docker Desktop<br>

■githubから「pilot」リポジトリをclone


### 使用方法

■Docker Desktopを起動する<br>

■VScodeでプロジェクトを開く

■Docker起動コマンドをターミナルに入力<br>
docker-compose up --build

■終了する時はDocker停止をターミナルに入力<br>
docker-compose down


## Font Awesome
[Font Awesomeの導入](https://qiita.com/riversun/items/4faa56ac40071f638313)

## Git-flow
[Git-flowの説明](https://qiita.com/KosukeSone/items/514dd24828b485c69a05)

