var React = require('react');
var AppActions = require('../actions/appActions.js');
var PersonStore = require('../stores/personStore.js');

var Ready = React.createClass({  
    handleCancel: function() {
        AppActions.move('person');
    },
    handleSubmit: function() {
        AppActions.move('next');
    },
    getInitialState: function() {
        return { data: PersonStore.getPerson() };
    },
    render: function() {
        return <div className="reactComponentContainer">
            <h3>Personal data overview</h3>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Personal</h4>
                        <dl className="dl-horizontal">
                            <dt>Age</dt>
                            <dd>{this.state.data.personal.age}</dd>
                            <dt>Gender</dt>
                            <dd>{this.state.data.personal.gender}</dd>
                            <dt>Weight</dt>
                            <dd>{this.state.data.personal.weight}</dd>
                            <dt>Height</dt>
                            <dd>{this.state.data.personal.height}</dd>
                            <dt>BMI</dt>
                            <dd>{this.state.data.BMI}</dd>
                        </dl>
                    </div>
                    <div className="col-sm-6">
                        <h4>Lifestyle</h4>
                        <dl className="dl-horizontal">
                            <dt>Smoking</dt>
                            <dd>{this.state.data.lifestyle.smoking}</dd>
                            <dt>Diet</dt>
                            <dd>{this.state.data.lifestyle.diet}</dd>
                            <dt>Exercise</dt>
                            <dd>{this.state.data.lifestyle.exercise}</dd>
                            <dt>Diabetes</dt>
                            <dd>{this.state.data.lifestyle.diabetes}</dd>
                        </dl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn" onClick={this.handleCancel}> Back </button>
                        <button className="btn" onClick={this.handleSubmit}> Start </button>
                    </div>
                </div>
            </div>
        </div>
        ;
    }
});

module.exports = Ready;