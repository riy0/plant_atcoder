import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inputs from './Inputs';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Inputs/>, document.getElementById('input'));

serviceWorker.unregister();
