module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint", "react", "prettier"],
    rules: {
		"@typescript-eslint/explicit-member-accessibility": 0,
        "no-console": 0,
        "@typescript-eslint/no-unused-vars": ["error", { args: "none" }]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
