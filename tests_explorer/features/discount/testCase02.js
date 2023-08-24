// Harus selalu ada
require(process.cwd() + '/tests_explorer/base')

// Initialize variable driver
let driver


// Initialize page that we using
const initial = require(process.cwd() + '/tests_explorer/features/initial') 
  , payEverPage = require(process.cwd() + '/tests_explorer/pages/payever/payEver.page')

// Tests suites
describe('Automation QA Task', function () {
  beforeEach(async function () {
    let value = 'santander'
    //1. Visit https://commerceos.staging.devpayever.com/registration/{value}
    driver = await initial.load('chrome', process.env.URL_PAYEVER+value)
  })

  // Tests cases
  it('Test Case 02', async function () {
    const PayEverPage = new payEverPage(driver)

    //2. Fill out the user information
    await driver.sleep(1000);
    await PayEverPage.fillOutTheUserInformation(process.env.password)

    //3. Click ‘next’
    await driver.sleep(1000)
    await PayEverPage.clickNext(driver)

    //4. Fill out the business information
    await driver.sleep(1000)
    await PayEverPage.fillOutTheBusinessInformationSantander(process.env.value)
    //5. Register
    await driver.sleep(1000);
    await PayEverPage.register(driver)

    //6. Get Started then, 7. view Dashboard
    await driver.sleep(2000)
    await PayEverPage.getStartedField(driver)
    
    //validate the following apps to be present on the dashboard: - Transactions, Checkout, Connect, Products, Shop, Message, settings
    await driver.sleep(7000)
    await PayEverPage.validateTC02(driver)
  })

  // Screenshot of failed test
  afterEach(async function () {
    if (this.currentTest.state == 'failed') {
      let fileName = generate.uniqueByDate('yyyyMMddHHmmss')
      let image = await driver.takeScreenshot()
      await fsp.writeFile('Reports/screenshots/' + fileName + '.jpg', image, 'base64')
      let imageFileName = fileName + '.jpg';
      
      addContext(this, 'Screenshot of failed test')
      addContext(this, '../screenshots/' + imageFileName)
    }
  })

  // Close driver
  afterEach(async function () {
    await driver.close();
    await driver.quit();
  })
})
