const path = require("path");
const fs = require("fs");
// const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
	path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve("dist"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	devServer: {
		// Serve index.html as the base
		static: {
			directory: path.join(__dirname, "public"),
		},

		// Enable compression
		compress: true,

		// Enable hot reloading
		hot: true,

		// Open browser
		open: true,

		host,

		port: 3000,
	},
	plugins: [
		// Re-generate index.html with injected script tag.
		// The injected script tag contains a src value of the
		// filename output defined above.
		new HtmlWebpackPlugin({
			inject: true,
			template: resolveAppPath("public/index.html"),
		}),
	],
};
