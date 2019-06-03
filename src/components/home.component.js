import React, { Component } from 'react';
import config from '../config.js';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';

import AddButton from './addButton.component';

const styles = {
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: '28vh'
  },
  credits: {
    color: 'grey',
    fontSize: '12px',
    position: 'fixed',
    bottom: '1rem',
    left: '1rem',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { balance: '...' };
  }
  componentDidMount() {
    axios.get(config.api + '/user/'+this.props.user._id+'/balance')
      .then(response => {
        this.setState({ balance: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2 className={this.props.classes.title}>
          Olá {this.props.user.name},<br/>seu saldo é R${ this.state.balance }
        </h2>
        <div className={this.props.classes.credits}>
          Front:&nbsp;
          <Link href="https://github.com/darenhart/ekki" target="_blank">
            github.com/darenhart/ekki
          </Link>
          <br/>
          Back:&nbsp;
          <Link href="https://github.com/darenhart/ekki" target="_blank">
            github.com/darenhart/ekki-api
          </Link>
        </div>
        <AddButton href="/nova-transacao"></AddButton>
      </div>
    )
  }
}
export default withStyles(styles)(Home);