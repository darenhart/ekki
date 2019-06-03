import React, { Component } from 'react';
import config from '../config.js';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { withSnackbar } from 'notistack';

import AddButton from './addButton.component';
import LoadingPage from './loadingPage.component';

import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// TODO move dialog to a component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
};

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dialogOpen: false,
      deletingUser: {},
      loading: true
    };
    this.delete = this.delete.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  componentDidMount(){
    this.reload();
  }

  reload() {
    this.setState({ users: [], loading: true });
    axios.get(config.api + '/user/')
      .then(response => {
        this.setState({ 
          users: response.data,
          loading: false
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  delete() {
    let userId = this.state.deletingUser._id;
    axios.put(config.api + '/user/' + userId, {status: 'removed'})
      .then(response => {
        this.setState({
          users: this.state.users.filter((u) => {
            return u._id !== userId;
          })
        });
        this.props.enqueueSnackbar(
          'Contato removido com sucesso!',
          { variant: 'success' }
        );
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  
  handleClickOpen(user) {
    this.setState({
      dialogOpen: true,
      deletingUser: user
    });
  }

  handleClose() {
    this.setState({dialogOpen: false});
  }

  handleConfirm() {
    this.delete();
    this.setState({
      dialogOpen: false,
      deletingUser: {}
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Contatos</h3>

          {(!this.state.loading) ?
            (
             <Paper>
              <Table size="small">
                <TableBody>
                { this.state.users.map((user, i) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton  aria-label="Editar contato"  component={CollisionLink} to={"/user-form/"+ user._id} >
                        <EditIcon />
                      </IconButton>
                      <IconButton  aria-label="Excluir contato" onClick={() => this.handleClickOpen(user)}>
                        <DeleteIcon />
                      </IconButton>
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

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Deseja deletar?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>

        <AddButton href="/user-form"></AddButton>
      </div>
    )
  }
}
export default withSnackbar(withStyles(styles)(UserList));
