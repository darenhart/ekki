import React, { Component } from 'react';
import config from '../config.js';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

import AddButton from './addButton.component';

const styles = {
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: '28vh'
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
        <AddButton></AddButton>
      </div>
    )
  }
}
export default withStyles(styles)(Home);