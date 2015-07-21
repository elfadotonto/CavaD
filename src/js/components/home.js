var React = require('react');
var AppActions = require('../actions/appActions.js');

var Home = React.createClass({    
    handleClick: function() {
        AppActions.move('person');
    }, 
    render: function() {
        return <div className="reactComponentContainer">
            <div> Home page </div>
            <div>
                <button className="btn" onClick={this.handleClick}> Start </button>
            </div>
        </div>
        ;
    }
});

module.exports = Home;