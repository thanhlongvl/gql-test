import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getCustomerQuery,addPostMutation,getPostsQuery} from '../queries/queries'


class AddPost extends Component {
    constructor(pros) {
        super(pros);
        this.state = {
            title: '',
            content: '',
            customerID: 0
        };
    }
    displayCustomers(){
        var data = this.props.getCustomerQuery;
        if (data.loading){
            return(<option disabled>Loading Customer...</option>);
        } else {
            return data.people.map(person => {
                return( <option key={ person.id } value={person.id}>{ person.name }</option> );
            });
        }
    }
    submitForm(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.addPostMutation({
            variables: {
                title: this.state.title,
                content: this.state.content,
                customerID: parseInt(this.state.customerID, 10 )
            },
            refetchQueries: [{ query: getPostsQuery }]
        });
    }
  render() {
    return (
        <form id="add-post" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Title:</label>
                    <input type="text" onChange={(e) => this.setState({title: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Content:</label>
                    <input type="text" onChange={(e) => this.setState({content: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Customer:</label>
                    <select onChange={(e) => this.setState({customerID: e.target.value})}>
                        <option>Select Customer</option>
                        {this.displayCustomers()};
                    </select>
                </div>
                <button>+</button>
        </form>
    );
  }
}

export default compose(
    graphql(getCustomerQuery, { name: "getCustomerQuery" }),
    graphql(addPostMutation, { name: "addPostMutation" })
)(AddPost);