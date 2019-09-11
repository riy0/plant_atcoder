import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Map from './Map';

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

export default class Inputs extends Component {
  load() {
    if (sub.readyState === 4 && prob.readyState === 4){
      if (sub.status === 200 && prob.status === 200){

        const atcoder = JSON.parse(sub.responseText);

        for (const e in atcoder) {
          const data = atcoder[e];
          if (data['result'] === 'AC'){
            const subtime = data['epoch_second'] * 1000;

            const tmp = {
              'site' : 'atcoder',
              'subtime' : subtime,
              'contestId' : data['contest_id'],
              'title' : data['id'],
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
        ReactDOM.render(<div>failed. please reload</div>, document.getElementById('status'));
      }
    }else{
      ReactDOM.render(<div>loading</div>, document.getElementById('status'));
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
      <div>
        <div> id </div>
        <div>atcoder id</div>
        <input type = "text" id = "id" value = "tourist"></input>
        <button type = "button" onClick = {() => this.send()}>getData</button>
      </div>
    )
  }
}
