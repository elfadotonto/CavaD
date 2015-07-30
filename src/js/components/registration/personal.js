var React = require('react/addons');
var PersonActions = require('../../actions/personActions.js');
var PersonStore = require('../../stores/personStore.js');

var Personal = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    handleStep: function() {
        PersonActions.registerPersonal('lifestyle', {
            age: this.state.age, 
            gender: this.state.gender, 
            weight: this.state.weight, 
            height: this.state.height});
    }, 
    getInitialState: function() {
        return {
            age: 50, 
            gender: "Not selected", 
            weight: 80, 
            height: 175};
    },    
    componentDidMount: function() {
        var person = PersonStore.getPerson();
        if(person.personal){
            this.setState(person.personal);
        }
    },
    render: function() {
        return <div className="reactComponentContainer">
            <h5>Personal information</h5>
            <form className="form-horizontal">
                <div className="form-group">
                    <label>Age</label>
                    <input className="form-control" type="number" valueLink={this.linkState('age')} />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select className="form-control" valueLink={this.linkState('gender')}>
                        <option value="Not selected">Not selected</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>   
                </div>                
                <div className="form-group">
                    <label>Weight</label>
                    <input className="form-control" type="number" valueLink={this.linkState('weight')} />
                </div>                
                <div className="form-group">
                    <label>Height</label>
                    <input className="form-control" type="number" valueLink={this.linkState('height')} />
                </div>
            </form>
            <div>
                <button className="btn" onClick={this.handleStep}> Next </button>
            </div>
        </div>
        ;
    }
    
});

module.exports = Personal;