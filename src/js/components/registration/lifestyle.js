var React = require('react/addons');
var PersonActions = require('../../actions/personActions.js');
var PersonStore = require('../../stores/personStore.js');

var Personal = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    handleStep: function() {
        PersonActions.registerLifeStyle('medical', {
            smoking: this.state.smoking,
            diet: this.state.diet,
            exercise: this.state.exercise,
            diabetes: this.state.diabetes
        });
    }, 
    handleBack: function(){
        PersonActions.back('personal');
    },
    getInitialState: function() {
        return {smoking: 'No', 
            diet: 'No',
            exercise: 'No',
            diabetes: 'No'};
    },   
    componentDidMount: function() {
        var person = PersonStore.getPerson();
        if(person.lifestyle){
            this.setState( person.lifestyle);
        }
    }, 
    render: function() {
        return <div className="reactComponentContainer">
            <h5>Lifestyle information</h5>
            <form className="form-horizontal">
                <div className="form-group">
                    <label>Smoking</label>
                    <select className="form-control" valueLink={this.linkState('smoking')}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Diet</label>
                    <select className="form-control" valueLink={this.linkState('diet')}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Exercise</label>
                    <select className="form-control" valueLink={this.linkState('exercise')}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Diabetes</label>
                    <select className="form-control" valueLink={this.linkState('diabetes')}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
            </form>
            <div>
                <button className="btn" onClick={this.handleBack}> Back </button>
                <button className="btn" onClick={this.handleStep}> Next </button>
            </div>
        </div>
        ;
    }
    
});

module.exports = Personal;