module.exports = function override(config, env) {
  //do stuff with the webpack config...
  let loaders = config.resolve
    loaders.fallback = {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    }
  return config;
}