import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/styles';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';

const styles = {
  margin: {
    margin: '.5rem 0 .5rem 0',
  },
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: null,
      name: '',
      cpf: '',
      phone:''
    };

    if (this.props.match.params.id) {
      axios.get(config.api + '/user/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            _id: response.data._id,
            name: response.data.name,
            cpf: response.data.cpf,
            phone: response.data.phone
          });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    })  
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let t = this;
    let props = this.props;
    if (this.state.cpf && this.state.name) {
      this.setState({loading: true});
      let onSuccess = res => {
          props.enqueueSnackbar(
            'Contato salvo com sucesso!',
            { variant: 'success' }
          );
          props.history.push(this.props.fromTrans ? '/nova-transacao' : '/contatos')
        };
      let onError = error => {
          t.setState({loading: false});
          error = error.response ? error.response.data : error.toString();
          props.enqueueSnackbar(error, { variant: 'error' });
        }
      if (this.state._id) {
        axios.put(config.api + '/user/' + this.state._id, this.state)
          .then(onSuccess)
          .catch(onError);
      } else {
        axios.post(config.api + '/user', this.state)
          .then(onSuccess)
          .catch(onError);
      }
    }
  }
 
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Novo contato</h3>
        <form onSubmit={this.onSubmit}>
          <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="user-name">Nome</InputLabel>
            {/* TODO: mask amount */}
            <Input
              id="user-name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </FormControl>

          <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="user-cpf">CPF</InputLabel>
            {/* TODO: mask CPF */}
            <Input
              id="user-cpf"
              value={this.state.cpf}
              type="number"
              onChange={this.onChangeCpf}
            />
          </FormControl>
          <FormControl className={this.props.classes.margin}>
            <InputLabel htmlFor="user-phone">Telefone</InputLabel>
            {/* TODO: mask phone */}
            <Input
              id="user-phone"
              value={this.state.phone}
              type="number"
              onChange={this.onChangePhone}
            />
          </FormControl>

          <div>
            <Button variant="contained" 
              disabled={this.state.loading}
              type="submit" color="primary" 
              className={this.props.classes.margin}>
              Salvar
            </Button>
          </div>

        </form>
      </div>
    )
  }
}

export default withRouter(withSnackbar(withStyles(styles)(UserForm)));
