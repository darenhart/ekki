import React, { Component } from 'react';
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
    axios.get('http://localhost:4000/user/5cf1f03220bb573d643abd1b/balance')
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
          Olá João,<br/>seu saldo é R${ this.state.balance }
        </h2>
        <AddButton></AddButton>
      </div>
    )
  }
}
export default withStyles(styles)(Home);