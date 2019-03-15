const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList} = require('graphql');

const Customer = require('./customer');
  
  const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'Blog post',
    fields () {
      return {
        id: {
          type: GraphQLInt,
          resolve (post) {
            return post.id;
          }
        },
        title: {
          type: GraphQLString,
          resolve (post) {
            return post.title;
          }
        },
        content: {
          type: GraphQLString,
          resolve (post) {
            return post.content;
          }
        },
        //person: {
        //  type: Customer,
        //  resolve (post) {
        //    return post.getCustomer();
        //  }
       // }
      };
    }
  });

module.exports = Post;