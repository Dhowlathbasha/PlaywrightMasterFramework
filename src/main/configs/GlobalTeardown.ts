import path from 'path';
import AdmZip from 'adm-zip';

const reportPath = path.join('../../reports', 'html-report');
const outputFilePath = '../../reports/html-report'
const reportfileName : string = './report.zip'

async function globalTeardown(){
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath, reportPath);
    await zip.writeZipPromise(reportfileName);
    console.log(`Report Zip File Created : ${outputFilePath}`);
}

export default globalTeardown;