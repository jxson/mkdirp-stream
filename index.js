
var map = require('map-stream')
  , mkdirp = require('mkdirp')
  , path = require('path')

module.exports = function(source, destination) {
  var directories = []
    , isCopying = !!(source && destination)
    , stream = map(write)

  if (source instanceof Array) directories = source

  directories.forEach(function(dir){
    stream.write(dir)
  })

  return stream

  function write(data, callback){
    var resolved = path.resolve(process.cwd(), data)
      , dirname = path.extname(resolved) ? path.dirname(resolved) : resolved

    if (isCopying) dirname = path.dirname(data.replace(source, destination))

    mkdirp(dirname, function(err){
      if (err) return stream.emit('error', err)
      callback(null, data)
    })
  }
}
