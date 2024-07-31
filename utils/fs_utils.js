

const fs = require('fs')
const path = require('path');
const mlog = require('mocha-logger');
const { formatRequestLogs2 } = require('./formatRequestLogs.js');


function writeFile(filePath, buffer) {

try {
fs.writeFile(filePath, buffer, (err) => {
    if (err) {
        return console.error(`Error writing file: ${err}`);
    }
    console.log(`Buffer saved to ${filePath}`);
})
} catch (e) {
  mlog.error(e);
}
}


async function createDirectory(relativePath, folderName) {
    const relativePaths = relativePath.split('/')
    relativePaths.push(folderName);

  const pathRelative = "/" + relativePaths.join("/");
  const __rootDir =  process.cwd();
  console.log(pathRelative)
  
  const dirPath = path.join(__rootDir, relativePaths.join("/"));
    


    try {
      await fs.mkdir(dirPath, { recursive: true }, (err) => {

        if (err) throw err});
      console.log(`Directory created: ${dirPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
    }
  }


  
  const fsProm  = require('fs').promises;

async function prependToFile(newString, relativePath) {
   
    const path = relativePath + "logs.txt";

    try {
        // Read the existing content of the file
        let data = '';
        try {
            data = await fsProm.readFile(path, 'utf8');
        } catch (err) {
            if (err.code !== 'ENOENT') {
              //Ignore errors: meaning that even the file is not present make the write 
            }
        }

        // Create the new content by prepending the new string
        const updatedContent = `${newString}\n${data}`;

        // Write the updated content back to the file
        await fsProm.writeFile(path, updatedContent, 'utf8');
        console.log('File updated successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}


const requests = [
  {
    "url": "https://dev-pago.payclip.com/api/oneClick/clipDetectCustomer",
    "headers": "{\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"127\\\", \\\"Not)A;Brand\\\";v=\\\"99\\\"\",\"content-type\":\"text/plain;charset=UTF-8\",\"referer\":\"https://dev-pago.payclip.com/9131e884-faf2-4416-ad26-4e29a8a8a0fd\",\"accept-language\":\"en-US\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/127.0.0.0 Safari/537.36\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"accept\":\"*/*\",\"cookie\":\"ajs_user_id=64733935-7d05-4512-8a12-a0c26113d21d; ajs_anonymous_id=41481250-493a-4e2e-8c37-9ec6a992d0d6; _dd_s=rum=2&id=e4e10263-f389-4b42-9728-28610e5478a9&created=1722395096768&expire=1722395998658&logs=1\",\"origin\":\"https://dev-pago.payclip.com\"}",
    "payload": "{\"email\":\"for_guest_tests_m9q2rrgg@example.com\",\"paymentRequestId\":\"9131e884-faf2-4416-ad26-4e29a8a8a0fd\"}",
    "statusCode": 200,
    "response": "Failed to get customer",
    "timestamp": "2024-07-31T03:04:59.747Z"
  }
];

const test_run_id = "1722401511524"
const test_case_id = "test_case_0"
const path_logs = `completed_tests/test_runs/${test_run_id}/${test_case_id.toString()}/`
const baseDir = process.cwd();
writeFile(baseDir + "/" + path_logs + "logs.txt", formatRequestLogs2(requests));

module.exports = {writeFile, createDirectory, prependToFile};