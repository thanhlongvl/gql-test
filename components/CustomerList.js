import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getCustomerQuery} from '../queries/queries'




class Customer extends Component {
    displayCustomers(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading customers...</div> );
        } else {
            return data.people.map(person => {
                return(
                    <li key={person.id}>{ person.name }</li>
                );
            })
        }
    }
  render() {
    return (
      <div>
        <ul id='customer-list'>
                {this.displayCustomers()}
        </ul>
      </div>
    );
  }
}

export default graphql(getCustomerQuery)(Customer);