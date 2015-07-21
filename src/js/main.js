var App = require('./components/app');
var common = require('./components/common.js');
var React = require('react');

//var app = {
//    initialize: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },

//    onDeviceReady: function() {
//        console.log("Device ready, will try to render React component!");


//        console.log("React should now be loaded");
//    }
//};

//app.initialize();

var headerNode = document.getElementById('header');
var headerComponent = <common.Header />;
React.render(headerComponent, headerNode);

var mountNode = document.getElementById('main');
var mountComponent = <App />;
React.render(mountComponent, mountNode);

var footerNode = document.getElementById('footer');
var footerComponent = <common.Footer />;
React.render(footerComponent, footerNode);