const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClearWebPackPlugin =require('clean-webpack-plugin');
const bundleOutputDir = '/dist';

module.exports = (env) => {
    // const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: { 
            main: './src/app.tsx'
        },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js'
        },
        devtool:'source-map',
        // tell dev server where to watch
        devServer: {
          proxy: [{
              context:['/contacts','/contactDetails'],
              target:'http://localhost:4000/'
          }],
          contentBase:'/dist',
          hot: true
        },
        optimization: {
            splitChunks: {
                cacheGroups:{
                    vendor:{
                        test: /[\\/]node_modules[\\/](bootstrap\/dist\/bootstrap.js|event-source-polyfill|isomorphic-fetch|react|react-dom|react-router-dom|jquery|@fortawesome\/react-fontawesome|@fortawesome\/fontawesome-common-types|@fortawesome\/fontawesome-free|@fortawesome\/fontawesome-svg-core|)[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                    vender_css: {
                        test:/bootstrap\/dist\/css\/bootstrap.css/,
                        name:'vendor_css'
                    }
                }
            }
        },
        // externals: {
        //     "react": "React",
        //     "react-dom": "ReactDOM"
        // },
        module: {
            rules: [
                { 
                    test: /\.(j|t)sx?$/, 
                    include: /src/,
                    exclude: /node_modules/,
                    use: 
                    {
                    loader: "babel-loader",
                    options: {
                      cacheDirectory: true,
                      babelrc: false,
                      presets: [
                        [
                          "@babel/preset-env",
                          { targets: { browsers: "last 2 versions" } } // or whatever your project requires
                        ],
                        "@babel/preset-typescript",
                        "@babel/preset-react"
                      ],
                      plugins: [
                        // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        ["@babel/plugin-proposal-class-properties", { loose: true }],
                        "react-hot-loader/babel"
                      ]
                    }
                  }
                },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                // { test: /\.css(\?|$)/, use: extractCSS.extract([ isDevBuild ? 'css-loader' : 'css-loader?minimize' ]) },
            ]
        },
        plugins: [
            ClearWebPackPlugin,
            // extractCSS,
            // new webpack.NamedModulesPlugin(),//NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
            // new webpack.HotModuleReplacementPlugin(),
            new CheckerPlugin(),
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            // new webpack.ProvidePlugin({React:'react',ReactDOM:'react-dom'}),
            // new webpack.DllPlugin({
            //     path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            //     name: '[name]_[hash]'
            // }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
            }),
            new HtmlWebpackPlugin({
                template: "./index.html",  // Specify the HTML template to use
                filename:"./index.html"
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css'),
            new HtmlWebpackPlugin({
                template: "./src/index.html"  // Specify the HTML template to use
            })
        ])
    }];
};