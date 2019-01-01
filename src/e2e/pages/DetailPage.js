import { APP_BASE_URL, API_BASE_URL } from '../constants'

export default class DetailPage {
  constructor(browser, id) {
    this.browser = browser
    this.id = id
  }

  async initialize() {
    this.page = await this.browser.newPage()
    await this.page.goto(`${APP_BASE_URL}/books/${this.id}`)
  }

  async getDescription() {
    await this.page.waitForSelector('.description')
    return await this.page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
  }

  async addReview(review) {
    await this.page.waitForSelector('input[name="name"]')
    await this.page.type('input[name="name"]', review.name)

    await this.page.waitForSelector('textarea[name="content"]')
    await this.page.type('textarea[name="content"]', review.content)

    await this.page.waitForSelector('button[name="submit"]')
    await this.page.click('button[name="submit"]')

    await this.page.waitForResponse(
      (response) =>
        response.url() === `${API_BASE_URL}/books/1` &&
        response.request().method() === 'GET' &&
        response.status() === 200
    )
  }

  async getReview(index) {
    await this.page.waitForSelector('.reviews-container')
    const reviews = await this.page.evaluate(() => {
      return [...document.querySelectorAll('.review p')].map((el) => {
        return el.innerText
      })
    })

    return reviews[index]
  }
}
