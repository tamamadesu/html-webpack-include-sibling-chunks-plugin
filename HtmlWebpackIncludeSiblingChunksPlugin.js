class HtmlWebpackIncludeSiblingChunksPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('HtmlWebpackIncludeSiblingChunksPlugin', compilation => {
      const chunkOnlyConfig = {
        assets: false,
        cached: false,
        children: false,
        chunks: true,
        chunkModules: false,
        chunkOrigins: false,
        errorDetails: false,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        timings: false,
        version: false
      }

      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks

      compilation.hooks.htmlWebpackPluginAlterChunks.tap('HtmlWebpackIncludeSiblingChunksPlugin', chunks => {
        const ids = [].concat(...chunks.map(chunk => [...chunk.siblings,chunk.id]))
        return allChunks.filter(chunk => ids.includes(chunk.id)).sort((a,b)=> ids.join('').indexOf(a.id + b.id) !== -1 ? -1 : 1)
      })
    })
  }
}

module.exports = HtmlWebpackIncludeSiblingChunksPlugin
