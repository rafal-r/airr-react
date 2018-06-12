const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType, defaultConfig) => {
    // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Return the altered config

    defaultConfig.resolve.symlinks = false;
    defaultConfig.module.rules.push({
        test: /\.mkd$/,
        use: "raw-loader"
    });

    return defaultConfig;
};
