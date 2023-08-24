/**
   * Untuk read/write Excel, perlu create File Excel secara manual terlebih dahulu
   * 
   * Keterangan function:
   * 1. writeSingleCell(filePath, column, row, value)
   *    untuk write/replace/overwrite sebuah cell dengan sebuah value
   * 
   * 2. readSingleCell(filePath, column, row)
   *    untuk read value dari sebuah cell
   *    
   * 2. getRowNumbers(filePath)
   *    untuk mendapatkan jumlah baris dari sebuah file (header tidak dihitung)
   *    biasa dipakai untuk mendapatkan jumlah looping
   * 
   * 
   * Keterangan parameter:
   * 1. filePath: file path Excel yang akan dipakai
   *      ex. './tests_explorer/data/Auth.xls'
   * 
   * 2. column: kolom dari cell
   *      ex. '1' untuk A
   *      ex. '2' untuk B
   *      ex. '27' untuk AA
   * 
   * 3. row: baris dari cell
   *      ex. '1' untuk baris 1
   *    
   * 4. value: sebuah variable yang akan diwrite ke sebuah cell
   */

const XLSX = require('xlsx')

function numberToCol(n) {
  let ordA = 'A'.charCodeAt(0);
  let ordZ = 'Z'.charCodeAt(0);
  let len = ordZ - ordA + 1;

  let s = "";
  while (n >= 0) {
    s = String.fromCharCode(n % len + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s;
}

function writeSingleCell(filePath, column, row, value) {
  // read from a XLS file
  let workbook = XLSX.readFile(filePath);

  // get first sheet
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];

  let col = numberToCol(column - 1);
  let sel = col + row

  // modify value if A1 is undefined / does not exists
  XLSX.utils.sheet_add_aoa(worksheet, [[value]], { origin: sel });

  // modify value in A1
  worksheet[sel].v = value;

  // write to new file
  XLSX.writeFile(workbook, filePath);
}

function readSingleCell(filePath, column, row) {
  // read from a XLS file
  let workbook = XLSX.readFile(filePath);

  // get first sheet
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];

  let col = numberToCol(column - 1);
  let sel = col + row

  // read value in A1
  let cell = worksheet[sel].v;

  return cell;
}

function getRowNumbers(filePath) {
  // read from a XLS file
  let workbook = XLSX.readFile(filePath);

  // get first sheet
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];

  let arr = XLSX.utils.sheet_to_row_object_array(worksheet,{blankrows : false, defval: ''});
  let totalRows = arr.length;

  return totalRows;
}


module.exports = {
  numberToCol,
  writeSingleCell,
  readSingleCell,
  getRowNumbers
}