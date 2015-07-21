var React = require('react');
var AppActions = require('../actions/appActions.js');

var Person = React.createClass({    
    handleSubmit: function() {
        AppActions.registerPerson('ready', {age: 20});
    }, 
    render: function() {
        return <div className="reactComponentContainer">
            <div> Personal data </div>
        <form>
            <label value="age">Age</label>
            <input type="number" ref="age" />
        </form>
            <div>
                <button className="btn" onClick={this.handleSubmit}> Submit </button>
            </div>
        </div>
        ;
    }
});

module.exports = Person;