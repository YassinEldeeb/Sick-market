//requiring path and fs modules
const path = require('path')
const fs = require('fs')
const replaceExt = require('replace-ext')

const readFiles = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    //listing all files using forEach
    files.forEach((file) => {
      // Do whatever you want to do with the file
      if (file.endsWith('.js')) {
        const oldFile = path.join(__dirname, `/backend/${file}`)

        const newFile = replaceExt(oldFile, '.ts')
        console.log(newFile)

        fs.renameSync(oldFile, newFile)
      } else {
        readFiles(`${directoryPath}/${file}`)
      }
    })
  })
}

readFiles(path.join(__dirname, 'backend'))
