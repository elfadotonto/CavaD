var React = require('react');
var AppStore = require('../stores/appStore.js');
var Home = require('../components/home.js');
var Ready = require('../components/ready.js');
var Person = require('../components/person.js');

var getPage = function() {
    return { page: AppStore.getPage() };
};
var App = React.createClass({
    getInitialState: function() {
        return getPage();
    },
    componentDidMount: function() { AppStore.addChangeListener(this._onChange); }, 
    componentWillUnmount: function() { AppStore.removeChangeListener(this._onChange); },
    render: function () {
        switch (this.state.page) {
            case 'person':
                return <Person />; 
            case 'ready':
                return <Ready />; 
            case 'home':
            default:
                return <Home />;
        }
    },
    _onChange: function() {
        this.setState(getPage());
    }
});

module.exports = App;