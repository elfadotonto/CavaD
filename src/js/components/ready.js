var React = require('react');
var AppActions = require('../actions/appActions.js');
var PersonStore = require('../stores/personStore.js');
var DefinitionList = require('../components/reuseables/definitionList.js');

var Ready = React.createClass({  
    handleCancel: function() {
        AppActions.move('person');
    },
    handleSubmit: function() {
        AppActions.move('next');
    },
    render: function() {
        return <div className="reactComponentContainer">
            <h3>Personal data overview</h3>
            <div className="container">
                <div className="row">
                    <DefinitionList section={PersonStore.getSection('personal')} title="Personal" />
                    <DefinitionList section={PersonStore.getSection('lifestyle')} title="Lifestyle" />
                </div>
                <div className="row">
                    <DefinitionList section={PersonStore.getSection('medical')} title="Medical" />
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