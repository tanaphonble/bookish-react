import pupeeteer from 'puppeteer'
import axios from 'axios'

import BookListPage from './pages/BookListPage'
import BookDetailPage from './pages/BookDetailPage'
import { resolve } from 'dns'

const appUrlBase = 'http://localhost:3000'

let browser
let page

describe('Bookish', () => {
  beforeAll(async () => {
    browser = await pupeeteer.launch({})
    page = await browser.newPage()
  })

  beforeEach(async () => {
    const books = [
      { name: 'Refactoring', id: 1 },
      { name: 'Domain-driven design', id: 2 }
    ]

    return books.map((item) =>
      axios.post('http://localhost:8080/books', item, {
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  test('Heading', async () => {
    await page.goto(`${appUrlBase}/`)
    const listPage = new BookListPage(page)
    const heading = await listPage.getHeading()
    expect(heading).toEqual('Bookish')
  })

  test('Book List', async () => {
    await page.goto(`${appUrlBase}/`)
    const listPage = new BookListPage(page)
    const books = await listPage.getBooks()

    expect(books.length).toEqual(2)
    expect(books[0]).toEqual('Refactoring')
    expect(books[1]).toEqual('Domain-driven design')
  })

  test('Goto book detail page', async () => {
    await page.goto(`${appUrlBase}/`)
    const listPage = new BookListPage(page)
    const links = await listPage.getBookDetailLinks()

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.goto(`${appUrlBase}${links[0]}`)
    ])

    const url = await page.evaluate('location.href')
    expect(url).toEqual(`${appUrlBase}/books/1`)

    const detailPage = new BookDetailPage(page)
    const description = await detailPage.getDescription()
    expect(description).toEqual('Refactoring')
  })

  test('Show books which name contains keyword', async () => {
    await page.goto(`${appUrlBase}/`)
    const listPage = new BookListPage(page)
    const books = await listPage.getBooksByTitle('refact')

    expect(books.length).toEqual(1)
    expect(books[0]).toEqual('Refactoring')
  })

  test('Write a review for a book', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('a.view-detail')

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map((el) =>
        el.getAttribute('href')
      )
    })

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.goto(`${appUrlBase}${links[0]}`)
    ])

    const url = await page.evaluate('location.href')
    expect(url).toEqual(`${appUrlBase}/books/1`)

    await page.waitForSelector('.description')
    const result = await page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    expect(result).toEqual('Refactoring')

    await page.waitForSelector('input[name="name"]')
    await page.type('input[name="name"]', 'Ble')

    await page.waitForSelector('textarea[name="content"]')
    await page.type('textarea[name="content"]', 'Good book')

    await page.waitForSelector('button[name="submit"]')
    await page.click('button[name="submit"]')
    await page.waitForResponse(
      (response) =>
        response.url() === 'http://localhost:8080/books/1' &&
        response.request().method() === 'GET' &&
        response.status() === 200
    )

    await page.waitForSelector('.reviews-container')
    const reviews = await page.evaluate(() => {
      return [...document.querySelectorAll('.review')].map((el) => {
        return el.innerText
      })
    })

    expect(reviews.length).toEqual(1)
    expect(reviews[0]).toEqual('Good book')
  })

  afterEach(() => {
    return axios
      .delete('http://localhost:8080/books?_cleanup=true')
      .catch((err) => err)
  })

  afterAll(async () => {
    browser.close()
  })
})
