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
const firstNameInput = By.id('exampleForm.ControlInput1')
const passwordInput = By.id('exampleForm.ControlInput2')
const loginBtn = By.xpath('//button[@class="btn btn-primary"]')
const POS_ConfiguratorDashboard = By.xpath('//p[@class="Home_navbarText__rGDH3"]')

// Page Actions
class loginPage extends basePage {

  async login(name, password) {
    await this.waitForDisplayed(firstNameInput)
    await this.waitForDisplayed(passwordInput)
    await this.click(firstNameInput)
    await this.sendKeys(firstNameInput, name)
    await this.click(passwordInput)
    await this.sendKeys(passwordInput, password)
    await this.click(loginBtn)
    await this.waitForDisplayed(POS_ConfiguratorDashboard)
  }
}

module.exports = loginPage;