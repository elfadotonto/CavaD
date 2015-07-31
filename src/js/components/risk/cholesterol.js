var React = require('react');
var RiskStore = require('../../stores/riskStore.js');
var RiskConstants = require('../../constants/risk-constants.js');

var getChol = function(){
    return {
        chol: RiskStore.getCholesterol()
    };
};

var Cholesterol = React.createClass({  
    getInitialState: function(){
        return getChol();
    },
    componentDidMount: function() { RiskStore.addChangeListener(RiskConstants.CHOLESTEROL_CHANGE_EVENT, this._onChange); }, 
    componentWillUnmount: function() { RiskStore.removeChangeListener(RiskConstants.CHOLESTEROL_CHANGE_EVENT, this._onChange); },
    render: function() {
        return <div className="col-sm-6">
                    <h4>Cholesterol</h4>
                    <div>
                        <span>HDL</span>
                        <span>{this.state.chol.hdl}</span>
                    </div>
                    <div>
                        <span>LDL</span>
                        <span>{this.state.chol.ldl}</span>
                    </div>
                </div>
        ;
    },
    _onChange: function() {
        this.setState(getChol());
    }
});

module.exports = Cholesterol;