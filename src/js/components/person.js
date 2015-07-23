var React = require('react');
var PersonStore = require('../stores/personStore.js');
var Personal = require('../components/personal.js');
var Lifestyle = require('../components/lifestyle.js');

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