var React = require('react');
var HomeActions = require('../actions/homeActions.js');
var HomeStore = require('../stores/homeStore.js');

var getPage = function() {
    return { page: HomeStore.getPage() };
};
var Home = React.createClass({
    getInitialState: function() {
        return getPage();
    },
    handleClick: function(to) {
        HomeActions.move(to);
    }, 
    componentDidMount: function() { HomeStore.addChangeListener(this._onChange); }, 
    componentWillUnmount: function() { HomeStore.removeChangeListener(this._onChange); },
    render: function() {
        return <div className="reactComponentContainer">
            <div> { this.state.page } </div>
            <div>
                <button className="btn" onClick={this.handleClick('next')}>Next</button>
            </div>
        </div>
        ;
    },
    _onChange: function() {
        this.setState(getPage());
    }

});

module.exports = Home;