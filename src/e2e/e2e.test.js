import pupeeteer from 'puppeteer'
import axios from 'axios'

import BookListPage from './pages/BookListPage'

const appUrlBase = 'http://localhost:3000'
const apiUrlBase = process.env.REACT_APP_API_URL_BASE

let browser
let page

beforeAll(async () => {
  browser = await pupeeteer.launch({})
  page = await browser.newPage()

  const books = [
    { name: 'Refactoring', description: 'Refactoring', id: 1 },
    {
      name: 'Domain-driven design',
      description: 'Domain-driven design',
      id: 2
    }
  ]

  await Promise.all(
    books.map(
      async (item) =>
        await axios.post(`${apiUrlBase}/books`, item, {
          headers: { 'Content-Type': 'application/json' }
        })
    )
  )
})

describe('Bookish', () => {
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
    await page.waitForSelector('a.view-detail')

    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map((el) =>
        el.getAttribute('href')
      )
    })

    await Promise.all([
      page.waitForNavigation({ waituntil: 'networkidle2' }),
      page.goto(`${appUrlBase}${links[0]}`)
    ])

    const url = await page.evaluate('location.href')
    expect(url).toEqual(`${appUrlBase}/books/1`)

    await page.waitForSelector('.description')
    const result = await page.evaluate(() => {
      return document.querySelector('.description').innerText
    })
    expect(result).toEqual('Refactoring')
  })

  test('Show books which name contains keyword', async () => {
    await page.goto(`${appUrlBase}/`)
    await page.waitForSelector('input')
    await page.type('input.search', 'domain')
    await page.screenshot({ path: 'search-for-design.png' })
    await page.waitForSelector('.book .title')
    const books = await page.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(
        (el) => el.innerText
      )
    })

    expect(books.length).toEqual(1)
    expect(books[0]).toEqual('Domain-driven design')
  })
})

afterAll(async () => {
  const { data: books } = await axios.get(`${apiUrlBase}/books?_sort=id`)
  await Promise.all(
    books.map(
      async (item) => await axios.delete(`${apiUrlBase}/books/${item.id}`)
    )
  )
  browser.close()
})
