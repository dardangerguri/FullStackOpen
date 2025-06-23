const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blog', () => {
  test('favorite blog when list of blogs is empty', () => {
    const result = listHelper.favoriteBlog([])
    const expected = null
    assert.deepStrictEqual(result, expected)
  })

  test('favorite blog when just one blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    assert.deepStrictEqual(result, expected)
  })

  test('favorite blog with the most likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    assert.deepStrictEqual(result, expected)
  })
})
