var React = require('react/addons');
var PersonActions = require('../../actions/personActions.js');
var PersonStore = require('../../stores/personStore.js');

var Personal = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    handleStep: function() {
        PersonActions.registerMedical('ready', {
            ldl: this.state.ldl,
            hdl: this.state.hdl,
            bpSys: this.state.bpSys,
            bpDia: this.state.bpDia,
            colMeds: this.state.colMeds,
            bpMeds: this.state.colMeds
        });
    }, 
    handleBack: function(){
        PersonActions.back('lifestyle');
    },
    getInitialState: function() {
        return {ldl: 3, 
            hdl: 5,
            bpSys: 80,
            bpDia: 50,
            colMeds: 'No',
            btMeds: 'No'};
    },   
    componentDidMount: function() {
        var person = PersonStore.getPerson();
        if(person.medical){
            this.setState( person.medical);
        }
    }, 
    render: function() {
        return <div className="reactComponentContainer">
            <h5>Medical information</h5>
            <form className="form-horizontal">
                <div className="form-group">
                    <label>LDL</label>
                    <input type="number" className="form-control" valueLink={this.linkState('ldl')} />
                </div>
                <div className="form-group">
                    <label>HDL</label>
                    <input type="number" className="form-control" valueLink={this.linkState('hdl')} />
                </div>         
                <div className="form-group">
                    <label>Colesterol medication</label>
                    <select className="form-control" valueLink={this.linkState('colMeds')}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>       
                <div className="form-group">
                    <label>BP systolic</label>
                    <input type="number" className="form-control" valueLink={this.linkState('bpSys')} />
                </div>
                <div className="form-group">
                    <label>BP diastolic</label>
                    <input type="number" className="form-control" valueLink={this.linkState('bpDia')} />
                </div>
                <div className="form-group">
                    <label>Bloodpressure medication</label>
                    <select className="form-control" valueLink={this.linkState('bpMeds')}>
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