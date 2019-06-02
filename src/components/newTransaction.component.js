import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import AutocompleteUser from './autocompleteUser.component';

const styles = {
  margin: {
    margin: '1.5rem 0 .5rem 0',
  },
};

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);


    this.state = {
      amount: ''
    }
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      "user":"5cf1f03220bb573d643abd1b",
      "user_favoured": this.state.user_favoured,
      "amount": this.state.amount
    };
    axios.post('http://localhost:4000/transaction', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      amount: '',
      user_favoured: ''
    });
  }

  onUserSelect(userSelected) {
    let user_favoured = userSelected ? userSelected._id : null;
    this.setState({
      user_favoured: user_favoured
    });
  }
 
  render() {
    return (
      <div>
        <h3 align="center">Nova transação</h3>
        <form onSubmit={this.onSubmit}>

          <AutocompleteUser onSelect={this.onUserSelect} ></AutocompleteUser>

          <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="transaction-amount">Valor</InputLabel>
            {/* TODO: mask amount */}
            <Input
              id="transaction-amount"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            />
          </FormControl>
          <div>
            <Button variant="contained" type="submit" color="primary" className={this.props.classes.margin}>
              Transferir
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
export default withStyles(styles)(NewTransaction);