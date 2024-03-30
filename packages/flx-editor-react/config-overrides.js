module.exports = function override(config, env) {
    // 添加一个新的规则，处理 monorepo 中其他项目的 TypeScript 文件
    config.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['react-app'],
            },
        },
    });

    return config;
};
