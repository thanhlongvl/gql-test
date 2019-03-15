import { gql } from 'apollo-boost';

const getCustomerQuery = gql`
    {
        people {
            name
            id
        }
    }
`;

const getPostsQuery = gql`
    {
        posts{
            id
            title
            content
        }
    }
`;

const getPostQuery = gql`
    query GetPost($id: Int!) {
        post(id: $id) {
        id
        title
        content
        person {
            id
            name
            address
            posts {
            id
            title
            content
            }
        }
        }
    }
`;

const addPostMutation = gql`
    mutation AddPost($customerID: Int!, $title: String!, $content: String!){
        addPost(customerID: $customerID, title: $title, content: $content){
            title
        }
    }
`;

export {getCustomerQuery,addPostMutation,getPostsQuery,getPostQuery};

