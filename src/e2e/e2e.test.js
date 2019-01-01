import pupeeteer from 'puppeteer'
import axios from 'axios'

import BookListPage from './pages/BookListPage'
import DetailPage from './pages/DetailPage'

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
    const detailPage = new DetailPage(browser, 1)
    await detailPage.initialize()

    const desc = await detailPage.getDescription()
    expect(desc).toEqual('Refactoring')
  })

  test('Show books which name contains keyword', async () => {
    await page.goto(`${appUrlBase}/`)
    const listPage = new BookListPage(page)
    const books = await listPage.getBooksByTitle('refact')

    expect(books.length).toEqual(1)
    expect(books[0]).toEqual('Refactoring')
  })

  test('Write a review for a book', async () => {
    const detailPage = new DetailPage(browser, 1)
    await detailPage.initialize()

    const review = {
      name: 'Ble',
      content: 'Good book'
    }

    await detailPage.addReview(review)

    const result = await detailPage.getReview(0)
    expect(result).toEqual('Good book')
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
