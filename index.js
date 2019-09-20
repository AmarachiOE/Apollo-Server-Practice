const { ApolloServer, gql } = require('apollo-server');

// Define schema

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Book {
    "Title of the book"
    title: String
    "Person who wrote the book"
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
  }

  # Mutation Type:

  type Mutation {
      addBook(title: String, author: String): Book
  }
`;

// Define your dataset 
// Can come from a database, a REST API, hard-coded, a static object storage service, or even another GraphQL server

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];



// Define resolver
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
    Query: {
      books: () => books,
    },
  };


// Create instance of Apollo Server
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Amarachi! Server ready at ${url}`);
});

// run $ node index.js