import React, { Component } from 'react';
import axios from 'axios';

import AddButton from './addButton.component';

export default class Transactions extends Component {

  constructor(props) {
    super(props);
    this.state = { transactions: []};
  }
  componentDidMount(){
    axios.get('http://localhost:4000/transaction')
      .then(response => {
        this.setState({ transactions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3 align="center">Transacoes</h3>
          { this.state.transactions.map(function(object, i){
            return <div>{object.amount}</div>
            }) }
        <AddButton></AddButton>
      </div>
    )
  }
}