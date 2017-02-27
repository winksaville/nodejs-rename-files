var fs = require('fs');
 
function write(str) {
  process.stdout.write(str);
}

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
process.argv.forEach((arg, index) => {
  console.log('arg[%d]=%s', index, arg);
});

let path = process.argv[2];
console.log('path=%s', path);
 
fs.readdir(path, function(err, files) {
  console.log('files.length=%d', files.length);
  files.forEach((fileName) => {
    // Split fileName:
    // result[0] == fileName
    // result[1] == base
    // result[2] == extension
    // or result == null if no period
    // extension is empty if nothing follows the last period
    let result = fileName.match(/(.*)\.(.*)/);

    if (result) {
      if (result[2]) {
        let ext = result[2].match(/T(.*)/)
        if (ext) {
          let newName = result[1] + ext[1];
          fs.renameSync(fileName, newName);
          console.log('rename %s -> %s', fileName, newName);
        } else {
          //console.log('no extension with T: %s', fileName);
        }
      } else {
        //console.log('no extension: %s', fileName);
      }
    } else {
      //console.log('no period: %s', fileName);
    }
  });
});
