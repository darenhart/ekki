import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

// autocomplete
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
}
function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion._id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

function getSuggestions(suggestions, value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = {
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '.5rem 0',
    left: 0,
    right: 0,
  },
};

class AutocompleteUser extends Component {
  constructor(props) {
    super(props);

    //this.selectUser = this.selectUser.bind(this);

    // TODO: create a loading or disable the input
    this.state = { users: [{ name: 'Carregando...' }] };

    this.onChangeSelect = this.onChangeSelect.bind(this);

  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/user/')
      .then(response => {
        let users = response.data.map((u) => {
          u.name = u.name + ' - ' + u.cpf;
          return u;
        });
        this.setState({ users: users });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeSelect(selection) {
    let userSelected;
    // TODO refactor this
    this.state.users.forEach((u) => {
      if (u.name === selection) {
        userSelected = u;
      }
    });
    this.props.onSelect(userSelected);
  }

  render() {
    return (
      <div>
        <Downshift id="downshift-options"
          onChange={selection => this.onChangeSelect(selection)}
        >
          {({
            clearSelection,
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            openMenu,
            selectedItem,
          }) => (
            <div className={this.props.classes.container}>
              {renderInput({
                fullWidth: true,
                InputProps: getInputProps({
                  onFocus: () => openMenu(),
                  onChange: event => {

                    if (event.target.value === '') {
                      clearSelection();
                    }
                  },
                  placeholder: 'Favorecido',
                }),
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={this.props.classes.paper} square>
                    {getSuggestions(this.state.users, inputValue, { showEmpty: true }).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}
export default withStyles(styles)(AutocompleteUser);