const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  //Nos permite decir cual es el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  //Output: Hacia donde vamos a enviar lo que va a preparas webpack, dist
  output: {
    /* Nos permite saber donde se encuentra nuestro proyecto (directorio) y poderlo utilizar
    Nos ayuda a no tener problemas con el nombre de la carpeta donde estoy posicionado. 
    Cuando se envia a un servidor en la nube va utilizar el directorio donde se ubica el proyecto*/
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        /* Nos permite saber que tipo de extensiones vamos a usar.
      Expresión regular: Utiliza cualquier extensión que sea .mjs o js */
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        /* $ Cierra la instrucción */
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      /* Regla para mover nuestros archivos de imágenes hacia la carpeta dist, 
      Realiza un import de las imágenes y las llama como una variable*/
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      /* Realiza la inserción de los elementos  */
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    /* Historia de lo que sucede en el navegador */
    historyApiFallback: true,
    port: 3006
  }
};
