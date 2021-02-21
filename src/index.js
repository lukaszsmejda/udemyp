import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

require("babel-core/register");
require("babel-polyfill");



const rootElement = document.getElementById('root')

if (rootElement) {

    ReactDOM.render(<App />, rootElement)
}