const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most likes', () => {
  test('author with most likes when list has no blogs', () => {
    const result = listHelper.mostLikes([])
    const expected = null
    assert.deepStrictEqual(result, expected)
  })

  test('author with most likes when list has only one blog', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('author with most likes when list has multiple blogs', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    assert.deepStrictEqual(result, expected)
  })
})
