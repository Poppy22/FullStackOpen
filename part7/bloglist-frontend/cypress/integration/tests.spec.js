const user = {
  name: 'Carmen',
  username: 'Poppy22',
  password: '12345',
}

const otherUser = {
  name: 'Carmen2',
  username: 'Poppy23',
  password: '12345',
}

const newPost = {
  title: 'De ce e Carmen asa superba',
  author: 'Carmen',
  url: 'carmen/e/superba/ofc',
}

const newPost2 = {
  title: 'De ce e Carmen asa superba 2',
  author: 'Carmen 2',
  url: 'carmen/e/superba/ofc/2',
}

const newPost3 = {
  title: 'De ce e Carmen asa superba 3',
  author: 'Carmen 3',
  url: 'carmen/e/superba/ofc/3',
}

const sortedBlogs = [newPost3, newPost2, newPost]

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs to read')
    cy.contains('Login')
    cy.contains('Current blogposts')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.contains('Login').click()

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-btn').click()

      cy.contains(`Hello ${user.username}`)
      cy.contains('LOGOUT')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.contains('Login').click()

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()

      cy.get('.notification-error').contains(`Wrong username or password`)
      cy.get('.notification-error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification-error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.contains('Login').click()

      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function () {
      // the user is logged in
      cy.contains('Add new blog').click()

      cy.get('#title').type(newPost.title)
      cy.get('#author').type(newPost.author)
      cy.get('#url').type(newPost.url)
      cy.get('#new-post-btn').click()

      // check success notification
      cy.get('.notification-success').contains(`New blogpost ${newPost.title} by ${newPost.author} added`)
      cy.get('.notification-success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notification-success').should('have.css', 'border-style', 'solid')

      // check the new post appears in the list of posts
      cy.contains(newPost.title)
      cy.contains(newPost.author)
    })

    it('Liking a blog', function () {
      // the user is logged in
      cy.contains('Add new blog').click()

      // add a mock blogpost
      cy.get('#title').type(newPost.title)
      cy.get('#author').type(newPost.author)
      cy.get('#url').type(newPost.url)
      cy.get('#new-post-btn').click()

      cy.contains('View').click()
      cy.contains('Number of likes: 0')

      cy.contains('Like').click()
      cy.contains('Number of likes: 1')
    })

    it('Only blogpost creator can delete it', function () {
      // the user is logged in
      cy.contains('Add new blog').click()

      // add a mock blogpost
      cy.get('#title').type(newPost.title)
      cy.get('#author').type(newPost.author)
      cy.get('#url').type(newPost.url)
      cy.get('#new-post-btn').click()

      cy.contains('View').click()
      cy.contains('Delete')

      cy.contains('LOGOUT').click()

      // not logged in user cannot delete the blogpost
      cy.get('html').should('not.contain', 'Delete')

      // login as another user
      cy.contains('Login').click()
      cy.get('#username').type(otherUser.username)
      cy.get('#password').type(otherUser.password)
      cy.get('#login-btn').click()

      cy.get('html').should('not.contain', 'Delete')
    })

    it.only('Blogposts are sorted', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type(newPost.title)
      cy.get('#author').type(newPost.author)
      cy.get('#url').type(newPost.url)
      cy.get('#new-post-btn').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type(newPost2.title)
      cy.get('#author').type(newPost2.author)
      cy.get('#url').type(newPost2.url)
      cy.get('#new-post-btn').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type(newPost3.title)
      cy.get('#author').type(newPost3.author)
      cy.get('#url').type(newPost3.url)
      cy.get('#new-post-btn').click()

      // like the first post once, the second two times and the third three times
      cy.contains(new RegExp('^' + newPost.title))
        .parent()
        .contains('View')
        .click()
      cy.contains(new RegExp('^' + newPost.title))
        .parent()
        .contains('Like')
        .click()

      cy.contains(new RegExp('^' + newPost2.title))
        .parent()
        .contains('View')
        .click()
      cy.contains(new RegExp('^' + newPost2.title))
        .parent()
        .contains('Like')
        .click()
      cy.contains(new RegExp('^' + newPost2.title))
        .parent()
        .contains('Like')
        .click()

      cy.contains(new RegExp('^' + newPost3.title))
        .parent()
        .contains('View')
        .click()
      cy.contains(new RegExp('^' + newPost3.title))
        .parent()
        .contains('Like')
        .click()
      cy.contains(new RegExp('^' + newPost3.title))
        .parent()
        .contains('Like')
        .click()
      cy.contains(new RegExp('^' + newPost3.title))
        .parent()
        .contains('Like')
        .click()

      cy.wait(500)
      cy.contains(new RegExp('^' + newPost3.title))
        .parent()
        .parent()
        .children()
        .then(($elem) => {
          const children = $elem.map((i, e) => e.textContent.split(' by ')[0])

          sortedBlogs.forEach((blog, i) => {
            expect(blog.title).equal(children[i])
          })
        })
    })
  })
})
