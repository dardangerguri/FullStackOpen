const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most blogs', () => {
  test('author with most blogs when list has no blogs', () => {
    const result = listHelper.mostBlogs([])
    const expected = null
    assert.deepStrictEqual(result, expected)
  })

  test('author with most blogs when list has only one blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }
    assert.deepStrictEqual(result, expected)
  })

  test('author with most blogs when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    assert.deepStrictEqual(result, expected)
  })
})
