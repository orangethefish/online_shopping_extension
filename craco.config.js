const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            const isEnvDevelopment = env === 'development';
            const isEnvProduction = env === 'production';
            return {
                ...webpackConfig,
                plugins: [
                    new HtmlWebpackPlugin(
                        Object.assign(
                            {},
                            {
                                inject: true,
                                template: paths.appHtml,
                                excludeChunks: ['content', 'background'],
                            },
                            isEnvProduction
                                ? {
                                      minify: {
                                          removeComments: true,
                                          collapseWhitespace: false,
                                          removeRedundantAttributes: true,
                                          useShortDoctype: true,
                                          removeEmptyAttributes: true,
                                          removeStyleLinkTypeAttributes: true,
                                          keepClosingSlash: true,
                                          minifyJS: true,
                                          minifyCSS: true,
                                          minifyURLs: true,
                                      },
                                  }
                                : undefined
                        )
                    ),
                    ...webpackConfig.plugins.slice(1),
                ],
                entry: {
                    main: [
                        isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    content: './src/chromeServices/update_cart.ts',
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
            }
        },
    }
 }