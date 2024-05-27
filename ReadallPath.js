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

// async function getFileNames(dirPath)  {
//   return new Promise((resolve, reject) => {
//       fs.readdir(dirPath, (err, files) => {
//           if (err) {
//               reject(`Error reading directory: ${err}`);
//           } 
//           else if(fs.statSync(dirPath).isDirectory()) {
//               getFileNames(dirPath)
//             }
//           else {
//               const filePaths = files.map(file => path.join(dirPath, file));
//               resolve(filePaths);
//           }
//       });
//   });
// }

// https://github.com/VinayKumarBM/playwright-sample-project/tree/master
console.log(getFiles('./src')); 