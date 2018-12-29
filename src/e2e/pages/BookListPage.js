export default class BookListPage {
  constructor(page) {
    this.page = page
  }

  async getHeading() {
    await this.page.waitForSelector('h1')
    const result = await this.page.evaluate(() => {
      return document.querySelector('h1').innerText
    })
    return result
  }

  async getBooks() {
    await this.page.waitForSelector('.books')
    const books = await this.page.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(
        (el) => el.innerText
      )
    })
    return books
  }

  async getBooksByTitle(title) {
    await this.page.waitForSelector('input.search')
    await this.page.type('input.search', title)
    await this.page.screenshot({ path: 'search-for-design.png' })
    await this.page.waitForSelector('.book .title')
    const books = await this.page.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(
        (el) => el.innerText
      )
    })
    return books
  }

  async getBookDetailLinks() {
    await this.page.waitForSelector('a.view-detail')
    const links = await this.page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map((el) =>
        el.getAttribute('href')
      )
    })
    return links
  }
}
