var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "long123456",
  database: "qlbh"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customer", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

var schema = buildSchema(`
    type Customer {
        id: Int
        name: String
        address: String
    }
    type Query {
        course(id: Int!): Customer
    }
`);

var getCustomer = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}


var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    graphiql:true,
}));

app.listen(4000, () => console.log('GraphQL API server running at localhost'));