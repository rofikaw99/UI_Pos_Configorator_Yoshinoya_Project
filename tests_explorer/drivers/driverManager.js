const webdriver = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require("selenium-webdriver/chrome");

/** Builds WebDriver object for tests */
let chromeOptions = new chrome.Options();
chromeOptions.addArguments("--disable-notifications");
chromeOptions.excludeSwitches("enable-automation");

let buildDriver = function(browser) {
    return new webdriver.Builder()
    .forBrowser(browser)
    .setChromeOptions(chromeOptions)
    .build()
};  

module.exports.buildDriver = buildDriver;

