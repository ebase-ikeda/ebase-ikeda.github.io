webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	mode: "production",
	target: ['web', 'es5'],

	// ローカル開発用環境を立ち上げる
	// 実行時にブラウザが自動的に localhost を開く
	devServer: {
		contentBase: "dist",
		open: true // 自動的にブラウザが立ち上がる
	},

	performance: {
				maxEntrypointSize: 5120000,
				maxAssetSize: 5120000
	 },

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],

	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: `./src/assets/js/main.js`,

		optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},

	// babel
	module: {
		rules: [{
				// 拡張子 .js の場合
				test: /\.js$/,
				use: [{
					// Babel を利用する
					loader: 'babel-loader',
					// Babel のオプションを指定する
					options: {
						presets: [
							// プリセットを指定することで、ES2020 を ES5 に変換
							'@babel/preset-env',
						]
					}
				}],
				// exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
			},
			// {
			//   // node_module内のcss
			//   test: /node_modules\/(.+)\.css$/,
			//   use: [{
			//       loader: 'style-loader',
			//     },
			//     {
			//       loader: 'css-loader',
			//       options: {
			//          url: false
			//       },
			//     },
			//   ],
			//   sideEffects: true, // production modeでもswiper-bundle.cssが使えるように
			// },
		]
	},
	// ファイルの出力設定
	output: {
		// 出力ファイル名
		filename: "bundle-peoject.js"
	},


};