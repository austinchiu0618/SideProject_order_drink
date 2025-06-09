module.exports = {
	lintOnSave: false,
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/styles/_variables.scss";`,
			},
		},
	},
	publicPath: "./",
	configureWebpack: {
		devServer: {
			historyApiFallback: true,
		},
        // 因為加了ElementUI後報錯，所以加上去
        resolve: {
			// .mjs needed for https://github.com/graphql/graphql-js/issues/1272
			extensions: ["*", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"],
		},
        // 因為加了ElementUI後報錯，所以加上去
		module: {
			rules: [
				// fixes https://github.com/graphql/graphql-js/issues/1272
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: "javascript/auto",
				},
			],
		},
	},
};
