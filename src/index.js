import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inputs from './Inputs';
import Bar from './Appbar';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Bar />, document.getElementById('appbar'));
ReactDOM.render(<Inputs/>, document.getElementById('input'));

serviceWorker.unregister();
