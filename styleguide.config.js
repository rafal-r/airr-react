module.exports = {
    propsParser: require("react-docgen-typescript").withCustomConfig("./tsconfig.json", []).parse,
    components: "lib/**/*.tsx"
    // webpackConfig: {
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.tsx$/,
    //                 exclude: /node_modules/,
    //                 loader: "babel-loader"
    //             }
    //         ]
    //     }
    // }
};
