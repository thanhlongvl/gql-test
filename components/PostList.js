import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getPostsQuery} from '../queries/queries'
import { Link } from 'react-router-dom';

import PostDetail from './PostDetail'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
    displayPosts(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading posts...</div> );
        } else {
            return data.posts.map(post => {
                return(
                  <Link to={`/post/${post.id}`}>
                      <li key={post.id} onClick={(e) => this.setState({selected : post.id }) }>{ post.title }</li>
                  </Link>
                );
            })
        }
    }
  render() {
    return (
      <div>
        <ul id='post-list'>
                {this.displayPosts()}
        </ul>
      </div>
    );
  }
}

export default graphql(getPostsQuery)(Post);