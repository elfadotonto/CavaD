var React = require('react');
var Home = require('./home.js');

var App = React.createClass({
    render: function() {
        return <div className="reactAppContainer">
            <Home />
            </div>
        ;
    }
});

module.exports = App;