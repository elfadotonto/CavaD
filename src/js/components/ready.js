var React = require('react');
var AppActions = require('../actions/appActions.js');
var PersonStore = require('../stores/personStore.js');

var Ready = React.createClass({  
    handleCancel: function() {
        AppActions.move('person');
    },
    handleSubmit: function() {
        AppActions.move('next');
    },
    getInitialState: function() {
        return { data: PersonStore.getPerson() };
    },
    render: function() {
        return <div className="reactComponentContainer">
            <div> Personal data overview</div>
        <dl>
        <dt>Age</dt><dd>{this.state.data.age}</dd></dl>
            <div>
                <button className="btn" onClick={this.handleCancel}> Back </button>
                <button className="btn" onClick={this.handleSubmit}> Start </button>
            </div>
        </div>
        ;
    }
});

module.exports = Ready;