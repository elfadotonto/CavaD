var React = require('react');

var AppActions = require('../actions/appActions.js');
var RiskActions = require('../actions/riskActions.js');

var Current = require('../components/risk/current.js');
var LifeStyle = require('../components/risk/lifestyle.js');
var Medicinal = require('../components/risk/medication.js');
var BloodPressure = require('../components/risk/bloodPressure.js');
var Cholesterol = require('../components/risk/cholesterol.js');

var Risk = React.createClass({  
    handleCancel: function() {
        AppActions.move('ready');
    },
    handleSubmit: function() {
        AppActions.move('summary');
    },
    render: function() {
        return <div className="reactComponentContainer">
            <h3>Risk</h3>
            <div className="container">
                <div className="row">
                    <LifeStyle />
                    <Cholesterol />
                </div>
                <div className="row">
                    <Medicinal />
                    <BloodPressure />
                </div>
                <div className="row">
                    <Current />
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn" onClick={this.handleCancel}> Back </button>
                        <button className="btn" onClick={this.handleSubmit}> Finish </button>
                    </div>
                </div>
            </div>
        </div>
        ;
    }
});

module.exports = Risk;