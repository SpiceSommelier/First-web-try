const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // Входной файл
  entry: './src/js/index.js',

  // Выходной файл
  output: {
    filename: './js/bundle.js'
  },

  // Source maps для удобства отладки
  devtool: 'source-map',

  module: {
    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },

      // Компилируем SCSS в CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },

      // Подключаем шрифты из css
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   use: [
      //     {
      //       loader: 'file-loader?name=./fonts/[name].[ext]',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/',
      //         publicPath: 'fonts/'
      //       }
      //     }
      //   ]
      // },

      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        dependency: { not: ['url'] }
      }

      // Подключаем картинки из css
      // {
      //   test: /\.(svg|png|jpg|jpeg|webp)$/,
      //   use: [
      //     {
      //       loader: 'file-loader?name=./static/[name].[ext]'
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false
      }
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/repair-brand-section.pug',
    //   filename: 'repair-brand-section.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: false
    //   }
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/menu.html',
    //   filename: 'menu.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: false
    //   }
    // }),

    // Кладем стили в отдельный файлик
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),

    // Копируем картинки
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/img',
          to: 'img'
        }
      ]
    })
  ]
}
