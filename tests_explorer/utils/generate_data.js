/**
   * Untuk generate data random, bisa pakai faker
   * Link: https://www.npmjs.com/package/faker
   * 
   * Untuk generate date, bisa pakai datejs
   * Link: https://github.com/datejs/Datejs
   */
 
require(`${process.cwd()}/tests_explorer/base`)
 
/* Generate random string dengan parameternya yaitu panjang karakter */
function randomString(length) {
  let result = [];
  let characters = 'abcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

/* Generate random number dengan parameternya yaitu panjang karakter */
function randomNumber(length) {
  let result = [];
  let characters = '1234567890';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

/* Generate plat nomor dengan parameter kode kota, misalnya B untuk Jakarta */
function platNo(kodeKota) {
  let result = kodeKota + randomNumber(4) + randomString(3);
  return result;
}

/* Generate nomor telepon dengan prefix 08 */
function phoneNumber08(){
  let result = '08' + randomNumber(10);
  return result;
}

/* Generate nomor telepon dengan prefix +628 */
function phoneNumber62(){
  let result = '+628' + randomNumber(10);
  return result;
}

/* Dibuat unique, dengan kode 32 ditambah get time sepanjang 14 digit */
function noKTP() {
  return '32' + Date.today().setTimeToNow().toString('yyyyMMddHHmmss');
}

/* Contoh format => dd/MM/yyyy HH:mm:ss */
function birthDate(umur, format) {
  return Date.today().setTimeToNow().addYears(-umur).toString(format);
}

/* Generate random string by range dengan parameternya yaitu min dan max */
function randomNumberByRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = '';

  for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars.charAt(randomIndex);
  }

  return code;
}

function generateCityAndCode() {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Seattle", "San Francisco", "Boston", "Atlanta", "Dallas"];
  const randomCityIndex = Math.floor(Math.random() * cities.length);
  const randomCity = cities[randomCityIndex];

  const code = generateUniqueCode();

  return {
      city: randomCity,
      code: code
  };
}

function generateRandomLocation() {
  const streets = ["Main Street", "Oak Avenue", "Maple Lane", "Cedar Drive", "Elm Street"];
  const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami"];
  const zips = ["10001", "90001", "60601", "94101", "33101"];
  
  const randomStreetIndex = Math.floor(Math.random() * streets.length);
  const randomCityIndex = Math.floor(Math.random() * cities.length);
  const randomZipIndex = Math.floor(Math.random() * zips.length);
  
  const street = streets[randomStreetIndex];
  const city = cities[randomCityIndex];
  const zip = zips[randomZipIndex];
  
  return { street, city, zip };
}

function generateRandomCountryCode() {
  const countryCodes = ["US", "CA", "UK", "AU", "FR", "DE", "JP", "IT", "ES", "BR"];
  const randomIndex = Math.floor(Math.random() * countryCodes.length);
  return countryCodes[randomIndex];
}

module.exports = {
  randomString,
  randomNumber,
  platNo,
  phoneNumber08,
  phoneNumber62,
  noKTP,
  birthDate,
  randomNumberByRange,
  generateCityAndCode,
  generateRandomLocation,
  generateRandomCountryCode
}
