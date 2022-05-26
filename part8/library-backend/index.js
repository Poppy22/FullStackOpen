import { ApolloServer, UserInputError, gql, AuthenticationError } from 'apollo-server'
import { Author, Book, User } from './src/models/index.js'
import './src/database/init.js'
import jwt from 'jsonwebtoken'

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) {
        query.author = (await Author.findOne({ name: args.author }))._id
      }
      if (args.genre) {
        query.genres = args.genre
      }

      return await Book.find(query).populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => await Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('User unauthenticated')
      }

      const { title, author, published, genres } = args
      let savedAuthor = await Author.findOne({ name: author })

      try {
        if (!savedAuthor) {
          const newAuthor = new Author({ name: author })
          savedAuthor = await newAuthor.save()
        }

        const entry = new Book({ title, published, genres, author: savedAuthor._id })
        const savedEntry = await entry.save()

        return await Book.findById(savedEntry._id).populate('author', { name: 1, born: 1 })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('User unauthenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { runValidators: true })
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save().catch((error) => {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== process.env.EASY_PASSWORD) {
        throw new UserInputError('wrong credentials')
      }

      return {
        value: jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.SECRET,
        ),
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
