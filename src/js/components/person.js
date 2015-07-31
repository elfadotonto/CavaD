var React = require('react');

var PersonStore = require('../stores/personStore.js');

var Personal = require('../components/registration/personal.js');
var Lifestyle = require('../components/registration/lifestyle.js');
var Medical = require('../components/registration/medical.js');

var getStep = function (){
    return {step: PersonStore.getStep()};
};

var Person = React.createClass({
    getInitialState: function() {
        return getStep();
    },
    componentDidMount: function() { PersonStore.addChangeListener(this._onChange); }, 
    componentWillUnmount: function() { PersonStore.removeChangeListener(this._onChange); },
    render: function() {
        switch(this.state.step){
            case 'lifestyle':
                return <Lifestyle />;
            case 'medical':
                return <Medical />;
            case 'personal':
            default:
                return <Personal /> ;
        }
    },
    _onChange: function() {
        this.setState(getStep());
    }
});

module.exports = Person;