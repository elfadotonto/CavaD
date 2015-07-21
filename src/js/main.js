var React = require('react');
var App = require('./components/app.js');
var Common = require('./components/common.js');

var mountNode = document.getElementById('main');
var mountComponent = <div className="reactAppContainer">
                    <Common.Header />
                    <App />
                    <Common.Footer />
                </div>
                ;
React.render(mountComponent, mountNode);
