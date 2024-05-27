const fs = require('fs');
const path = require('path');

function getfiles(directoryPath){
  const fileList = fs.readdirSync(dir)
  
    // Filter only files
    const fileNames = files.filter(file => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile();
    });
  
    console.log('Files in the directory:');
    fileNames.forEach(fileName => {
      console.log(fileName);
    });
  });
}


  console.log(getfiles("./src"))