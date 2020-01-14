import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceBooker from './serviceBooker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceBooker.unregister();