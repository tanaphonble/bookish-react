export default class BookDetailPage {
  constructor(page){
    this.page = page
  }

  async getDescription() {
    await this.page.waitForSelector('.description')
    const description = await this.page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
  
    return description
  }
}