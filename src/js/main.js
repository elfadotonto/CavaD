var App = require('./components/app');
var React = require('react');

var mountNode = document.getElementById('main');
var mountComponent = <App />;
React.render(mountComponent, mountNode);
