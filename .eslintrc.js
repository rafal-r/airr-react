module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true
	},
	parser: "babel-eslint",
	extends: ["eslint:recommended", "plugin:react/recommended", "prettier", "prettier/react"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "prettier"],
	rules: {
		"no-console": 0,
		"no-unused-vars": ["error", { args: "none" }],
		"prettier/prettier": [
			"error",
			{
				printWidth: 100,
				useTabs: true,
				semi: true,
				tabWidth: 4
			}
		]
	},
	settings: {
		react: {
			version: "16.7.0"
		}
	}
};
