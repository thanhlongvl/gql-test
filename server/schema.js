const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull } = require('graphql');
  
  const Db = require('./db');
  
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
        posts: {
          type: new GraphQLList(Post),
          resolve (customer) {
            return customer.getPosts();
          }
        }
      };
    }
  });

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
        person: {
          type: Customer,
          resolve (post) {
            return post.getCustomer();
          }
        }
      };
    }
  });
  
  const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
      return {
        people: {
          type: new GraphQLList(Customer),
          args: {
            id: {
              type: GraphQLInt
            },
            name: {
              type: GraphQLString
            }
          },
          resolve (root, args) {
            return Db.models.customers.findAll({ where: args });
          }
        },
        posts: {
          type: new GraphQLList(Post),
          args: { 
            id: { 
              type: GraphQLInt
            } 
          },
          resolve(root, args) {
            return Db.models.posts.findAll({where : args });
          }
        },
        post: {
          type: Post,
          args: { 
            id: { 
              type: GraphQLInt
            } 
          },
          resolve(root, args) {
            return Db.models.posts.findById(args.id);
          }
        },
      };
    }
  });

  const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
      return {
        addCustomer: {
          type: Customer,
          args: {
            name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve (source, args) {
            return Db.models.customers.create({
              name: args.name,
              address: args.address
            });
          }
        },
        updateCustomer: {
          type: Customer,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            name: {
              type: GraphQLString
            },
            address: {
              type: GraphQLString
            }
          },
          resolve (source, args) {
            return Db.models.customers.update({
              name: args.name,
              address: args.address
            }, {
              where: {
                  id: args.id
              }
            }).thenReturn(Db.model.customers);
          } 
        },
        deleteCustomer: {
          type: Customer,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLInt)
            }
          },
          resolve (source, args) {
            return Db.models.customers.destroy({
              where: {
                id: args.id
              }
            });
          } 
        },
        addPost: {
          type: Post,
          args: {
            customerID: {
              type: GraphQLNonNull(GraphQLInt)
            },
            title: {
              type: GraphQLNonNull(GraphQLString)
            },
            content: {
              type: GraphQLNonNull(GraphQLString)
            }
          },
          resolve(source, args) {
            return Db.models.customers.findById(args.customerID).then(customer => {
              return customer.createPost({
                title: args.title,
                content: args.content
              });
            });
          }
        }
      };
    }
  });
  
  module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });
  