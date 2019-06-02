import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/home.component';
import NewTransaction from './components/newTransaction.component';
import Transactions from './components/transactions.component';

//import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';

import Container from '@material-ui/core/Container';

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();

  return (
    <Router>
     
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ekki
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

      <Container maxWidth="sm">
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/nova-transacao' component={ NewTransaction } />
          <Route exact path='/transacoes' component={ Transactions } />
        </Switch>
      </Container>

    </Router>
  );
}

export default App;
