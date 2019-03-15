import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PostDetail from './components/PostDetail'
import CustomerList from './components/CustomerList'
//import AddPost from './components/AddPost'
import PostList from './components/PostList'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="main">
            <h1>Testing</h1>
            <Route exact path="/" component={PostList} />
            <Route exact path="/post/:post_id" component={PostDetail} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;