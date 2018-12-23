import pupeeteer from 'puppeteer'

const appUrlBase = 'http://localhost:3000'

let browser
let page

beforeAll(async () => {
  browser = await pupeeteer.launch({})
  page = await browser.newPage()
})

describe('Bookish', () => {
  test('Heading', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('h1')
    const result = await page.evaluate(() => {
      return document.querySelector('h1').innerText
    })

    expect(result).toEqual('Bookish')
  })

  test('Book List', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('.books')
    const books = await page.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(
        (el) => el.innerText
      )
    })

    expect(books.length).toEqual(2)
    expect(books[0]).toEqual('Refactoring')
    expect(books[1]).toEqual('Domain-driven design')
  })
})

afterAll(() => {
  browser.close()
})
