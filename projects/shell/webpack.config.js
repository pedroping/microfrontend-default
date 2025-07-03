const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  output: {
    uniqueName: "shell",
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
      remotes: {
        mfeBasket: "http://localhost:4201/remoteEntry.js",
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
