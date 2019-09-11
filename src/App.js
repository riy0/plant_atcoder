import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

function zeroPadding(num, len) {
  return ('00000' + num).slice(-len);
}

function getDate(millisec) {
  const date = new Date(millisec);
  return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);

}

export default class App extends Component {
  render() {
    var keys = Object.keys(this.props.data);
    keys.sort();
    keys.reverse();
    return (
      <Paper className = 'log'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission Date</TableCell>
              <TableCell align="center">Judge</TableCell>
              <TableCell align="center">Contest Name</TableCell>
              <TableCell align="center">Problem Name</TableCell>
              <TableCell align="center">Point</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {keys.map((key) => (
              <TableRow key = {key}>
                <TableCell align="left">{getDate(this.props.data[key]['subtime'])}</TableCell>
                <TableCell align="center">{this.props.data[key]['site']}</TableCell>
                <TableCell align="center">{this.props.data[key]['contestId']}</TableCell>
                <TableCell align="center">{this.props.data[key]['title']}</TableCell>
                <TableCell align="center">{this.props.data[key]['point']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
