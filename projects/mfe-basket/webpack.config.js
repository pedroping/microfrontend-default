const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    uniqueName: "mfeBasket",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@shared": path.resolve(__dirname, "./projects/shared/src/public-api.ts"),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },
      name: "mfeBasket",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./projects/mfe-basket/src/app/basket/basket.module.ts",
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: true,
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
        },
        "@shared": {
          singleton: true,
          import: "./projects/shared/src/public-api.ts",
          requiredVersion: "auto",
        },
      },
    }),
  ],
};
