import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Map from './Map';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './inputs.css';

var sub = new XMLHttpRequest();
var prob = new XMLHttpRequest();

function zeroPadding(num, len) {
  return ('00000' + num).slice(-len);
}

function getDate(millisec) {
  const date = new Date(millisec);
  return date.getFullYear() + "-" + zeroPadding(Number(date.getMonth()) + 1, 2) + "-" + zeroPadding(date.getDate(), 2);
}

var subs = {};
var dailyCount = {};

function addCount(d) {
  if(isNaN(dailyCount[d])){
    dailyCount[d] = 1;
  }else{
    dailyCount[d]++;
  }
}

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
  });

export default class Inputs extends Component {
  load() {
    if (sub.readyState === 4 && prob.readyState === 4){
      if (sub.status === 200 && prob.status === 200){

        const problem = JSON.parse(prob.responseText);
        var prob_dic = {}

        for (const e in problem) {
          prob_dic[problem[e]['contest_id'] + problem[e]['id']] = problem[e]['title'];
        }


        const atcoder = JSON.parse(sub.responseText);

        for (const e in atcoder) {
          const data = atcoder[e];
          if (data['result'] === 'AC'){
            const subtime = data['epoch_second'] * 1000;

            const tmp = {
              'site' : 'atcoder',
              'subtime' : subtime,
              'contestId' : data['contest_id'].toUpperCase(),
              'title' : prob_dic[data['contest_id'] + data['problem_id']],
              'point' : data['point']
            }
            subs[subtime] = tmp;

            addCount(getDate(subtime));
          }
        }
        const calendar = Object.keys(dailyCount).map((key) => (
          {
            'date': key,
            'count': dailyCount[key],
          }
        ))
        ReactDOM.render(<div>loading</div>, document.getElementById('status'));
        ReactDOM.render(<App data ={subs} />, document.getElementById('app'));
        ReactDOM.render(<Map data = {calendar} />, document.getElementById('map'));

      }else{
        ReactDOM.render(<div className='fail'>Fail</div>, document.getElementById('status'));
      }
    }else{
      ReactDOM.render(<div CircularProgress className={styles.progress}></div>, document.getElementById('status'));
    }
  }

  send() {
    const user = document.getElementById('id').value;

    sub.onreadystatechange = this.load;
    prob.onreadystatechange = this.load;

     var url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + user;
     sub.open('Get', url, true);
     sub.send(null);
     
     var prob_url = "https://kenkoooo.com/atcoder/resources/problems.json";
     prob.open('Get', prob_url,true);
     prob.send(null);
  }

  render() {
    return (
      <Paper className = 'inputbar'>
        <TextField
          id="id"
          label="AtCoder ID"
          className={styles.textField}
          margin="normal"
        />
        <div></div>
        <br></br>
        <div id = 'status'>
          <Button variant="outlined" color="primary" className={styles.button} onClick = {() => this.send()} > Search </Button>
        </div>
      </Paper>
    )
  }
}
