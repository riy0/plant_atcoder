import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './appbar.css';
import Pop from './Pop.js';

export default class Bar extends React.Component {
  render(){
    return(
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <h3 className = 'logo'>Logger</h3>
            <Pop id = 'about' title = 'About' ></Pop>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
