import pupeeteer from 'puppeteer'
import axios from 'axios'

const appUrlBase = 'http://localhost:3000'
const apiUrlBase = 'http://localhost:8080'

let browser
let page

beforeAll(async () => {
  browser = await pupeeteer.launch({})
  page = await browser.newPage()
})

beforeEach(() => {
  const books = [
    { name: 'Refactoring', id: 1 },
    { name: 'Domain-driven design', id: 2 }
  ]

  return books.map((item) =>
    axios.post(`${apiUrlBase}/books?_sort=id`, item, {
      headers: { 'Content-Type': 'application/json' }
    })
  )
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

afterEach(async () => {
  const { data: books } = await axios.get(`${apiUrlBase}/books`)
  Promise.all(
    books.map(
      async (item) => await axios.delete(`${apiUrlBase}/books/${item.id}`)
    )
  )

  return axios.delete(`${apiUrlBase}/books?_cleanup=true`).catch((err) => err)
})

afterAll(() => {
  browser.close()
})
