// Harus selalu ada
require(process.cwd() + '/tests_explorer/base')

// Initialize variable driver
let driver


// Initialize page that we using
const initial = require(process.cwd() + '/tests_explorer/features/initial') 
  , loginPage = require(process.cwd() + '/tests_explorer/pages/pos_configurator/login.page')
  , discountPage = require(process.cwd() + '/tests_explorer/pages/pos_configurator/discount.page')

// Tests suites
describe('Discount', function () {
  beforeEach(async function () {
    driver = await initial.load('chrome', process.env.URL_YOSHI)
    const LoginPage = new loginPage(driver)
    await LoginPage.login(process.env.name, process.env.password)
  })

  // Tests cases
  it('See Discount List', async function () {
    const DiscountPage = new discountPage(driver)
    await DiscountPage.discountList(driver)

  })

  // Close driver
  afterEach(async function () {
    await driver.close();
    await driver.quit();
  })

})
