import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/nova-transacao" {...props} />
));

const styles = {
  root: {
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
  },
};

class AddButton extends Component {

  render() {
    
    return (
      <Fab component={CollisionLink} color="primary" aria-label="Add" className={this.props.classes.root} >
        <AddIcon />
      </Fab>
    )
  }
}

export default withStyles(styles)(AddButton);