var React = require('react');
var AppActions = require('../actions/appActions.js');
var RiskActions = require('../actions/riskActions.js');
var PersonStore = require('../stores/personStore.js');
var RiskStore = require('../stores/riskStore.js');

var Risk = React.createClass({  
    handleCancel: function() {
        AppActions.move('ready');
    },
    handleSubmit: function() {
        AppActions.move('summary');
    },
    render: function() {
        var risk = RiskStore.getRisk(PersonStore.getPerson());
        return <div className="reactComponentContainer">
            <h3>Risk</h3>
            <div className="container">
                <div>{risk}</div>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn" onClick={this.handleCancel}> Back </button>
                        <button className="btn" onClick={this.handleSubmit}> Start </button>
                    </div>
                </div>
            </div>
        </div>
        ;
    }
});

module.exports = Risk;