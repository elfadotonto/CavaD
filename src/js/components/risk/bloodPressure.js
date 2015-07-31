var React = require('react');
var RiskStore = require('../../stores/riskStore.js');
var RiskConstants = require('../../constants/risk-constants.js');

var getBp = function(){
    return {
        bp: RiskStore.getBloodPressure()
    };
};

var BloodPressure = React.createClass({ 
    getInitialState: function(){
        return getBp();
    }, 
    componentDidMount: function() { RiskStore.addChangeListener(RiskConstants.BLOODPRESSURE_CHANGE_EVENT, this._onChange); }, 
    componentWillUnmount: function() { RiskStore.removeChangeListener(RiskConstants.BLOODPRESSURE_CHANGE_EVENT, this._onChange); },
    render: function() {
        return <div className="col-sm-6">
                    <h4>Blood pressure</h4>
                    <div>
                        <span>Systolic</span>
                        <span>{this.state.bp.sys}</span>
                    </div>
                    <div>
                        <span>Diastolic</span>
                        <span>{this.state.bp.dia}</span>
                    </div>
                </div>
        ;
    },
    _onChange: function() {
        this.setState(getBp());
    }
});

module.exports = BloodPressure;