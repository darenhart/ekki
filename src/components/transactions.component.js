import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

import AddButton from './addButton.component';
import LoadingPage from './loadingPage.component';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  red: {
    color: 'red',
    whiteSpace: 'nowrap'
  },
  green: {
    color: 'green',
    whiteSpace: 'nowrap'
  },
};

class Transactions extends Component {

  constructor(props) {
    super(props);
    this.state = { transactions: []};
  }
  componentDidMount(){
    axios.get('http://localhost:4000/user/'+this.props.user._id+'/transactions')
      .then(response => {
        let transactions = response.data.map((t) => {
          t.isDebit = (t.user.id === this.props.user._id);
          return t;
        });
        this.setState({ transactions: transactions });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3 align="center">Extrato</h3>

          {(this.state.transactions.length) ?
            (
             <Paper>
              <Table size="small">
                <TableBody>
                { this.state.transactions.map((object, i) => (
                    <TableRow key={object._id}>
                      <TableCell>
                        {object.isDebit ? "Para " : "De " }
                        <br/>
                        {object.isDebit ? object.user_favoured.name : object.user.name }
                      </TableCell>
                      <TableCell align="right" className={object.isDebit ? this.props.classes.red : this.props.classes.green}>
                        {object.isDebit ? '-' : '+' } R$ {object.amount}
                      </TableCell>
                    </TableRow>
                  )) }
                  </TableBody>
              </Table>
            </Paper>
            )
            :
            (<LoadingPage></LoadingPage>)
          }
        <AddButton></AddButton>
      </div>
    )
  }
}
export default withStyles(styles)(Transactions);