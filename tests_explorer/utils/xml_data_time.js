const fs = require("fs");
const xml2js = require('xml2js');

const directoryPath = `${process.cwd()}/Reports/QC`;

let modifyLastXmlFile = fs.readdir(directoryPath, function (err, files) {
  // handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  // get the last xml files
  let listFiles = String(files).split(',');
  let countFiles = String(files).split(',').length;

  let listXmlFile = [];
  for (let i = 0; i < countFiles; i++) {
    let fileExt = listFiles[i].substring(listFiles[i].length - 4, listFiles[i].length)
    if (fileExt != ".xml") {
      continue;
    }

    let xmlFileName = listFiles[i];
    listXmlFile.push(xmlFileName);
  }

  let lastXmlFileIndex = listXmlFile.length - 1;
  let lastXmlFile = listXmlFile[lastXmlFileIndex];

  let fileName = lastXmlFile;

  // get timestamp from file name
  let getFileYear = fileName.substring(3, 7);
  let getFileMonth = fileName.substring(7, 9);
  let getFileDay = fileName.substring(9, 11);
  let getFileHour = fileName.substring(12, 14);
  let getFileMinute = fileName.substring(14, 16);
  let getFileSecond = fileName.substring(16, 18);

  // set the timestamp
  const xmlTimestamp = `${getFileYear}-${getFileMonth}-${getFileDay}T${getFileHour}:${getFileMinute}:${getFileSecond}`;

  // set the path to file
  let filePath = `${directoryPath}/${fileName}`;

  // read XML file
  fs.readFile(`${filePath}`, "utf-8", (err, data) => {
    if (err) {
      return console.log('Unable to read the file: ' + err);
    }

    // convert XML data to JSON object
    xml2js.parseString(data, (err, result) => {
      if (err) {
        return console.log('Unable to convert from xml to json object: ' + err);
      }

      // get JSON object
      let xmlData = result;

      let countTestSuite = xmlData.testsuites.testsuite.length;

      // modify the timestamp
      for (let i = 0; i < countTestSuite; i++) {
        xmlData.testsuites.testsuite[i].$.timestamp = xmlTimestamp;
      }

      // convert JSON object back to xml
      var builder = new xml2js.Builder();
      var modifiedXml = builder.buildObject(xmlData);

      // save the modified xml
      fs.writeFile(`${filePath}`, modifiedXml, function (err, data) {
        if (err) console.log(err);

        console.log("----", fileName,"successfully updated xml timestamp ---");
      });

    }); // xml file updated

  }); // finished reading xml file

}); // DONE