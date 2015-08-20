var React = require('react');

var PersonStore = require('../../stores/personStore.js');
var RiskActions = require('../../actions/riskActions.js');

var getMedication = function(){
    return {
        meds: PersonStore.getMedication()
    };
};

var Medication = React.createClass({
    getInitialState: function(){
        return getMedication()
    },
    handleCholMeds: function() {
        RiskActions.toggleCholMeds(!this.state.cholMeds);
    },
    handleBpMeds: function() {
        RiskActions.toggleBpMeds(!this.state.bpMeds);
    },
    render: function() {
        return <div className="col-sm-6">
                    <h4>Medicinal changes</h4>
                    <div>
                        <span>Cholesterol medicine</span>
                        <button className="btn" onClick={this.handleCholMeds}> Take meds</button>
                    </div>
                    <div>
                        <span>Blood pressure medicine</span>
                        <button className="btn" onClick={this.handleBpMeds}> Take meds</button>
                    </div>
                </div>
        ;
    }
});

module.exports = Medication;