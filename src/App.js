import React, { Component } from 'react';
import config from './config.js';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home.component';
import NewTransaction from './components/newTransaction.component';
import Transactions from './components/transactions.component';
import LoadingPage from './components/loadingPage.component';
import UserForm from './components/userForm.component';
import UserList from './components/userList.component';

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import { SnackbarProvider } from 'notistack';

import Container from '@material-ui/core/Container';

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const styles = {
  title: {
    flexGrow: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  center: {
    margin: '28vh',
  },
  appbar: {
    backgroundColor: 'darkslategrey'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    axios.get(config.api + '/user/current')
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
      return (
        <SnackbarProvider maxSnack={3}>

        <Router>
          <AppBar position="static" className={this.props.classes.appbar}>
            <Toolbar>
              <Typography variant="h6" className={this.props.classes.title}>
                Banco Ekki
              </Typography>
              <IconButton component={CollisionLink} to="/" color="inherit" title="Home" aria-label="Home">
                <HomeIcon />
              </IconButton>
              <IconButton component={CollisionLink} to="/transacoes" color="inherit" aria-label="Transações" title="Transações">
                <ListIcon />
              </IconButton>
              <IconButton component={CollisionLink} to="/contatos" color="inherit" title="Contatos" aria-label="Contatos">
                <ContactsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {(this.state.user) ?
            (
            <Container maxWidth="sm">
              <Switch>
                <Route exact path='/' render={(props) => <Home {...props} user={this.state.user} />} />
                <Route exact path='/nova-transacao' render={(props) => <NewTransaction {...props} user={this.state.user} />} />
                <Route exact path='/transacoes' render={(props) => <Transactions {...props} user={this.state.user} />} />
                <Route exact path='/contatos' render={(props) => <UserList {...props} user={this.state.user} />} />
                <Route exact path='/user-form' render={(props) => <UserForm {...props} user={this.state.user} />} />
                <Route exact path='/user-form-trans' render={(props) => <UserForm fromTrans="true" {...props} user={this.state.user} />} />
                <Route exact path='/user-form/:id' render={(props) => <UserForm {...props} user={this.state.user} />} />
              </Switch>
            </Container>
            )
            :
            (
              <LoadingPage></LoadingPage>  
            )}
        </Router>
        </SnackbarProvider>
      );
  }
}

export default withStyles(styles)(App);