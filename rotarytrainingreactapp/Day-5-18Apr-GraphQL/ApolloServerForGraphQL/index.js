var express = require('express');
var { ApolloServer, gql } = require('apollo-server-express');
var dbProduct = require('./db').products;
const typeDefs = gql`
#rootQuery
type Query {
    hello: String,
    products: [Product]!,
    product(id:ID): Product
} 
type Product {
    id: ID!,
    title:String!,
    imageUrl:String,
    likes:Int!,
     price:Int!,
     rating:Int
}
type Mutation {
    createProduct(id:ID!,title:String!,imageUrl:String,likes:Int!, price:Int!,rating:Int):Product
}
`;

// ID! not null 
const resolvers = {
    Query: {
        hello: () => "Graph QL",
        products: (parent, args, context, info) => {
            return dbProduct
        },
        product: (parent, { id }, context, info) => {
            return dbProduct.find(p => p.id === parseInt(id))
        }
    },
    Mutation: {
        createProduct: (parent, { id, title, imageUrl, likes, price, rating }, context, info) => {
            const insertProduct = { id, title, imageUrl, likes, price, rating } // id:id,title:title
            dbProduct.push(insertProduct);
            return insertProduct;
        }
    }
}
var server = new ApolloServer({ typeDefs, resolvers });
var app = express(); // repesent our app
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
    console.log('Apollo client is running on 4000');
});