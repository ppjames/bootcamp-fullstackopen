const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog de ejemplo',
    author: 'james fullstack',
    url: 'http://algo',
    likes: 1000,
  },
  {
    title: 'el camino del exceso conduce al palacio de la sabiduria',
    author: 'w. blake',
    url: 'http://algo',
    likes: 1000,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map((r) => r.title)
  expect(contents).toContain('blog de ejemplo')
})

afterAll(() => {
  mongoose.connection.close()
})
