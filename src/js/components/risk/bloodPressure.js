var React = require('react');
var BpStore = require('../../stores/bpStore.js');
var RiskConstants = require('../../constants/risk-constants.js');

var getBp = function(){
    return {
        bp: BpStore.getBloodPressure()
    };
};

var BloodPressure = React.createClass({ 
    getInitialState: function(){
        return getBp();
    }, 
    componentDidMount: function() { BpStore.addChangeListener(RiskConstants.BLOODPRESSURE_CHANGE_EVENT, this._onChange); }, 
    componentWillUnmount: function() { BpStore.removeChangeListener(RiskConstants.BLOODPRESSURE_CHANGE_EVENT, this._onChange); },
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