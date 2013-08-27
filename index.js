
var through = require('through')
  , mkdirp = require('mkdirp')
  , path = require('path')

module.exports = function(source, destination) {
  var stream = through(write)

  return stream

  function write(filename){
    var to = filename.replace(source, destination)
      , dirname = path.dirname(to)

    mkdirp(dirname, function(err){
      if (err) return stream.emit('error', err)
      stream.queue(filename)
    })

  }
}
