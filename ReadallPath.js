const fs = require('fs');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    const name = `${dir}/${file}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      files.push(name)
    }
  }
  return files
}

// https://github.com/VinayKumarBM/playwright-sample-project/tree/master
console.log(getFiles('./reports')); 