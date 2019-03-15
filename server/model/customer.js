const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList} = require('graphql');

const Post = require('./post');
  
  const Customer = new GraphQLObjectType({
    name: 'Customer',
    description: 'This represents a Customer',
    fields: () => {
      return {
        id: {
          type: GraphQLInt,
          resolve (customer) {
            return customer.id;
          }
        },
        name: {
          type: GraphQLString,
          resolve (customer) {
            return customer.name;
          }
        },
        address: {
          type: GraphQLString,
          resolve (customer) {
            return customer.address;
          }
        },
        //posts: {
        //  type: new GraphQLList(Post),
         // resolve (customer) {
        //    return customer.getPosts();
        //  }
        //}
      };
    }
  });

module.exports = Customer;