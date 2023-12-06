const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = async (_, { mode = "development" }) => {
	return {
		entry: path.join(__dirname, "src", "index.ts"),
		target: "web",
		mode,
		output: {
			path: path.join(__dirname, "build"),
			publicPath: "auto",
			chunkFilename: "js/[id].[contenthash].js",
			filename: "js/[name].[contenthash].js",
			clean: true,
		},
		devServer: {
			hot: true,
			open: ["/remote"],
			historyApiFallback: true,
			compress: true,
			port: 3001,
		},
		devtool: "inline-source-map",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|tsx|ts)$/,
					loader: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.module\.s[ac]ss$/i,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								modules: true,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.s[ac]ss$/i,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "public", "index.html"),
			}),

			new ModuleFederationPlugin({
				name: "RemoteApp",
				filename: "js/remote-app-entry.js",
				exposes: {
					"./RemoteApp": "./src/App",
				},
				shared: [
					{
						react: {
							requiredVersion: "^18.2.0",
							singleton: true,
							eager: true,
						},
						"react-dom": {
							requiredVersion: "^18.2.0",
							singleton: true,
							eager: true,
						},
						"react-router-dom": {
							requiredVersion: "^6.3.0",
							singleton: true,
							eager: true,
						},
					},
				],
			}),
		],
	};
};
