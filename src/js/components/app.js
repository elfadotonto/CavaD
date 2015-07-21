var React = require('react');
var Home = require('./home.js');
var Common = require('./common.js');

var App = React.createClass({
    render: function() {
        return <div className="reactAppContainer">
                    <Common.Header />
                    <Home />
                    <Common.Footer />
                </div>
            ;
        }
});

module.exports = App;