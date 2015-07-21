var React = require('react');

var Header = React.createClass({
    render: function() {
        return <header className="reactComponentContainer">
            <h1>CavaD</h1>
        </header>
        ;
    }
});

var Footer = React.createClass({
    render: function() {
        return <footer className="reactComponentContainer">
            By <a href="http://www.fredriksvensen.no">www.fredriksvensen.no</a>
        </footer> 
        ;
    }
});

module.exports = { Footer: Footer, Header: Header };