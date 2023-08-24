const {webdriver, Builder, By, Key, until, WebElement} = require('selenium-webdriver')
const util = require('util')
const generate = require(`${process.cwd()}/tests_explorer/utils/generate_data`)
const { exec } = require("child_process");

async function takeScreenshot(driver, fileName){
  let image = await driver.takeScreenshot()
  await fsp.writeFile('tests_explorer/screenshot/' + fileName + '.jpg', image, 'base64')
}

async function waitForLocated(driver, locator){
  try {
    await driver.wait(until.elementLocated(locator), parseInt(process.env.TIMEOUT, 10))
    return 
  } catch (err) {
    throw new Error(`Still not able to locate element ${locator.toString()} after maximum retries, Error message: ${err.message.toString()}`)
  }
}

async function waitForVisible(driver, locator){
  try {
    const element = await driver.findElement(locator)
    await driver.wait(until.elementIsVisible(element), parseInt(process.env.TIMEOUT, 10))
    return
  } catch (err) {
    throw new Error(`Element ${locator.toString()} still not visible after maximum retries, Error message: ${err.message.toString()}`)
  }
}

class basePage {
  constructor(webdriver) {
    this.driver = webdriver
  }

  async visit(url){
    try {
      await this.driver.get(url)
    } catch (err) {
      throw new Error(`Unable to open ${url}, error : ${err.message}`)
    }
  }

  async quit(){
    try {
      return await this.driver.quit()
    } catch (err) {
      throw new Error(`Unable to quit browser, error : ${err.message}`)
    }
  }

  async goToFrame(locator){
    try {
      await this.driver.switchTo().frame(this.driver.findElement(locator))
    } catch (err) {
      throw new Error(`Still not able to switch to frame element ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }

  async waitForDisplayed(locator){
    try {
      await waitForLocated(this.driver, locator)
      await waitForVisible(this.driver, locator)
      return this.driver.findElement(locator)      
    } catch (err) {
      throw new Error(`Unable to locate ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }

  async uploadFile(path) {
    try {
      const auto_upload = process.cwd() + "\\auto_upload.exe";
      // console.log(`${auto_upload} ${path}`);
      exec(`"${auto_upload}" "${path}"`);
    } catch (err) {
      throw new Error(`Unable to upload, error : ${err.message}`)
    }
  }

  async scroll(locator) {
    try {
      const element = await this.driver.findElement(locator)
      this.driver.executeScript("arguments[0].scrollIntoView()", element);
      return
    } catch (err) {
      throw new Error(`Unable to scroll to ${locator.toString()}, error : ${err.message}`)
    }
  }

  async scroll2(locator) {
    try {
      const element = await this.driver.findElement(locator)
      await this.driver.actions()
        .scroll(0, 0, 0, 0, element)
        .perform()

      return
    } catch (err) {
      throw new Error(`Unable to scroll to ${locator.toString()}, error : ${err.message}`)
    }
  }
  
  async removeContents(locator) {
    try {
      const element = await this.driver.findElement(locator)
      let del = Key.chord(Key.CONTROL, "a") + Key.DELETE;
      await element.sendKeys(del)
      return
    } catch (err) {
      throw new Error(`Unable to send keys to ${locator.toString()}, error : ${err.message}`)
    }
  }

  async sendKeys(locator, keys) {
    try {
      const element = await this.driver.findElement(locator)
      // await element.click()
      await element.sendKeys(keys)
      return
    } catch (err) {
      throw new Error(`Unable to send keys to ${locator.toString()}, error : ${err.message}`)
    }
  }

  async selectDropdown(locator, keys) {
    try {
      const element = await this.driver.findElement(locator)
      await element.click()
      await element.sendKeys(keys)
      await element.click()
      return
    } catch (err) {
      throw new Error(`Unable to select dropdown to ${locator.toString()}, error : ${err.message}`)
    }
  }

  async selectSearchableDropdown(dropdown, searchfield, keys) {
    try {
      const element = await this.driver.findElement(dropdown)
      await element.click()
      const field = await this.driver.findElement(searchfield)
      await field.click()
      await field.sendKeys(keys)
      await field.click()
      return
    } catch (err) {
      throw new Error(`Unable to select dropdown to ${locator.toString()}, error : ${err.message}`)
    }
  }

  async getTitle() {
    try {
      const title = await this.driver.getTitle()
      return title
    } catch (err) {
      throw new Error(`Unable to get title, error : ${err.message}`)
    }
  }

  async getText(locator) {
    try {
      const element = await this.driver.findElement(locator)
      const text = await element.getText()
      return text
    } catch (err) {
      throw new Error(`Unable to get ${locator.toString()} text, error : ${err.message}`)
    }
  }

  async getAttribute(locator, attribute) {
    try {
      const element = await this.driver.findElement(locator)
      const text = await element.getAttribute(attribute)
      return text
    } catch (err) {
      throw new Error(`Unable to get ${locator.toString()} attribute, error : ${err.message}`)
    }
  }

  async click(locator) {
    try {
      const element = await this.driver.findElement(locator)
      await element.click()
      return
    } catch (err) {
      throw new Error(`Still not able to click ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }

  async doubleClick(locator) {
    try {
      const element = await this.driver.findElement(locator)
      const actions = await this.driver.actions({ async: true });
      await actions.doubleClick(element).perform();
      return
    } catch (err) {
      throw new Error(`Still not able to double click ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }

  async moveCursor(locator) {
    try {
      const element = await this.driver.findElement(locator)
      const actions = await this.driver.actions({ async: true });
      await actions.move({ origin: element }).perform();
      return
    } catch (err) {
      throw new Error(`Still not able to move cursor ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }

  async dragAndDrop(drag, drop) {
    try {
      const dragelement = await this.driver.findElement(drag)
      const dropelement = await this.driver.findElement(drop)
      const actions = await this.driver.actions({ async: true });
      await actions.dragAndDrop(dragelement, dropelement).perform();
      return
    } catch (err) {
      throw new Error(`Still not able to move cursor ${locator.toString()}, Error message: ${err.message.toString()}`)
    }
  }
}

module.exports = basePage