// Harus selalu ada
const basePage = require(process.cwd() + '/tests_explorer/pages/basePage')
const { vehicle } = require('faker/lib/locales/ar');
const {webdriver, Builder, By, Key, until} = require('selenium-webdriver')

//faker
const faker = require('faker');
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const companyName = faker.company.companyName();
function generateSixDigitNumber() {
  return faker.random.number({ min: 100000, max: 999999 });
}
const sixDigitNumber = generateSixDigitNumber();


// Page Locators
const discountMenu = By.xpath('//button[@id="dropdown-autoclose-true" and @class="dropdown-toggle btn btn-primary" and contains(text(),"Discount")]')
const discountHref = By.xpath('//a[@href="/discount"]')
const discountCode = By.xpath('//th[contains(text(),"Discount Code")]')
const discountName = By.xpath('//th[contains(text(),"Discount Name")]')

// Page Actions
class discountPage extends basePage {

  async discountList() {
    await this.waitForDisplayed(discountMenu)
    await this.click(discountMenu)
    await this.waitForDisplayed(discountHref)
    await this.click(discountHref)
    await this.waitForDisplayed(discountCode)
    await this.waitForDisplayed(discountName)
    const discountCodeElement = await this.driver.findElement(discountCode);
    const discountCodeText = await discountCodeElement.getText();
    console.log(discountCodeText);
    const discountNameElement = await this.driver.findElement(discountName);
    const discountNameText = await discountNameElement.getText();
    console.log(discountNameText);
  }
}

module.exports = discountPage;