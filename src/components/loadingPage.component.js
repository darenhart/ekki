import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  textCenter: {
    textAlign: 'center',
  },
  center: {
    margin: '28vh',
  },
};

class LoadingPage extends Component {

  render() {
    
    return (
      <div className={this.props.classes.textCenter}>
        <CircularProgress className={this.props.classes.center} />
      </div>  
    )
  }
}

export default withStyles(styles)(LoadingPage);