var React = require('react');
var RiskStore = require('../../stores/riskStore.js');
var RiskConstants = require('../../constants/risk-constants.js');

var getRisk = function(){
    return {
        risk: RiskStore.getRisk()
    };
};

var Current = React.createClass({  
    getInitialState: function(){
        return getRisk();
    },
    componentDidMount: function() { RiskStore.addChangeListener(RiskConstants.RISK_CHANGE_EVENT, this._onChange); }, 
    componentWillUnmount: function() { RiskStore.removeChangeListener(RiskConstants.RISK_CHANGE_EVENT, this._onChange); },
    render: function() {
        return <div className="col-sm-12">
                    <h4>Current risk</h4>
                    <span>{this.state.risk}</span>
               </div>
        ;
    },
    _onChange: function() {
        this.setState(getRisk());
    }
});

module.exports = Current;