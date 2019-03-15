import React, { Component,Fragment } from 'react';
import { graphql, Query } from 'react-apollo';
import {getPostQuery} from '../queries/queries'



class PostDetail extends Component {
  render() {
    let { post_id } = this.props.match.params;
    post_id = parseInt(post_id);
    console.log(post_id);
    return (
      <Fragment>
          <Query query={getPostQuery} variables={{ id:post_id }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) console.log(error);
              console.log(data);
              const {post} = data;
              return (
                <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.person.name}</p>
                <p>All posts by this person: </p>
                <ul className="other-posts">
                  { post.person.posts.map(item => {
                    return <li key={item.id}>{item.title}</li>
                 })}
                </ul>
              </div>
              ); 
          }} 
          </Query>
        </Fragment>
    );
  }
}

export default PostDetail;