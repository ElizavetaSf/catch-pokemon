const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (env, argv) => {
   const devMode = argv.mode !== 'production';

   return {
			entry: './src/index.js',
			mode: 'development',
			output: {
				filename: 'main.js',
				path: path.resolve(__dirname, 'dist'),
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: path.join(__dirname, 'public', 'index.html'),
				}),
				new MiniCssExtractPlugin(),
			],
			devServer: {
				open: true,
				host: 'localhost',
				watchFiles: ['src/public/*.html'],
				hot: true,
				port: 5555,
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [
									['@babel/preset-env', { targets: 'defaults' }],
									['@babel/preset-react', { runtime: 'automatic' }],
								],
							},
						},
					},
					{
						test: /\.css$/i,
						use: [
							devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
							// 'css-loader',
							{
								loader: 'css-loader',
								options: {
									modules: {
										namedExport: false,
										exportLocalsConvention: 'as-is',
									},
								}
							}
						],
					},
					{
						test: /\.(png|jpe?g|svg)$/i,
						type: 'asset/resource',
					},
				],
			},
		}
}
