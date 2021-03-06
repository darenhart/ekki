import React, { Component } from 'react';
import config from '../config.js';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';

import AutocompleteUser from './autocompleteUser.component';

const styles = {
  margin: {
    margin: '1.5rem 0 .5rem 0',
  },
};

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class NewTransaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);

    this.state = {
      loading: false,
      amount: '',
      user_favoured: null
    }
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let t = this;
    let props = this.props;
    if (this.state.user_favoured && this.state.amount) {
      this.setState({loading: true});
      const obj = {
        "user": {
          "id": this.props.user._id,
          "name": this.props.user.name
        },
        "user_favoured": {
          "id": this.state.user_favoured._id,
          "name": this.state.user_favoured.name,
        },
        "amount": this.state.amount
      };
      axios.post(config.api + '/transaction', obj)
        .then(res => {
          this.setState({
            loading: false,
            amount: '',
            user_favoured: null
          });
          props.enqueueSnackbar(
            'Transação efetuada com sucesso!',
            { variant: 'success' }
          );
          if (res.data.balance < 0) {
            props.enqueueSnackbar(
              'Atenção, você está utilizando seu limite!',
              { variant: 'warning' }
            );
          }
          props.history.push('/transacoes')
        })
        .catch(function (error) {
          t.setState({loading: false});
          error = error.response ? error.response.data : error.toString();
          props.enqueueSnackbar(error, { variant: 'error' });
        });
    }
  }

  onUserSelect(userSelected) {
    this.setState({
      'user_favoured': userSelected
    });
  }
 
  render() {
    return (
      <div>
        <h3 align="center">Nova transação</h3>
        <form onSubmit={this.onSubmit}>

          <Grid container spacing={3}>

          <Grid item xs={9}>
            <AutocompleteUser onSelect={this.onUserSelect} ></AutocompleteUser>
          </Grid>
          <Grid item xs={3}>
            {/* TODO: back to new transaction */}
            <IconButton  aria-label="Adicionar contato"  component={CollisionLink} to={"/user-form-trans/"} >
              <AddIcon />
            </IconButton>
          </Grid>
          </Grid>


          <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="transaction-amount">Valor</InputLabel>
            {/* TODO: mask amount */}
            <Input
              id="transaction-amount"
              value={this.state.amount}
              type="number"
              onChange={this.onChangeAmount}
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            />
          </FormControl>
          <div>
            <Button variant="contained" 
              disabled={this.state.loading}
              type="submit" color="primary" 
              className={this.props.classes.margin}>
              Transferir
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(withSnackbar(withStyles(styles)(NewTransaction)));
