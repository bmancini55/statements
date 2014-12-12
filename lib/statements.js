var util = require('util')
  , fs   = require('fs')
  , Q    = require('q')  


  , statementIndicator = '-- '
  , newLineStyle       = '\n'
  ;


function read() {
  var args = arguments;
  if(args.length === 2) {
    return readAsync.apply(this, args);
  } else {
    return readSync.apply(this, args);
  }
}


function readSync(file) {
  if(!file) {
    throw new Error('readSync requires a file path');
  }

  var contents = fs.readFileSync(file, 'utf8');
  return parseContents(contents);  
}


function readAsync(file, next) {
  return Q.promise(function(resolve, reject) {
    if(!file) {
      throw new Error('readAsync requires a file path');
    }

    fs.readFile(file, 'utf8', function(err, result) {
      if(err) { 
        reject(err);
      }
      else {
        var parsed = parseContents(result.toString());
        resolve(parsed);
      }
      });
  })
  .nodeify(next);
}


function readDirectorySync(dir) {
  var dirs = fs.readdirsync(dir);
  console.log(dirs);
}


function normalizeLineFeeds(contents) { 
  return String.prototype.replace.call(contents, /\r?\n/g, newLineStyle);
}


function parseContents(contents) {
  var name
    , buffer = []
    , lines
    , result = { }
    , flushBuffer
    , processLine
    ;

  flushBuffer = function() {
    if(buffer.length > 0) {
      var buffervalue = buffer.join(newLineStyle);      
      result[name] = buffervalue.trim();      
    }
    buffer = [];
  };

  processLine = function(line) {
    if(line.indexOf(statementIndicator) === 0) {      
      flushBuffer();  
      name = line.substring(3);
      name = name.trim();          
    }  
    else {
      buffer.push(line);
    }
  };

  lines = normalizeLineFeeds(contents);
  lines = lines.split('\n');
  lines.forEach(processLine);
  flushBuffer();

  return result;
}


module.exports = {
  read: read,
  readAsync: readAsync,
  readSync: readSync
};