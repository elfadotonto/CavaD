var React = require('react');

var Footer = React.createClass({
    render: function() {
        return <div className="reactComponentContainer">
                By <a href="http://www.fredriksvensen.no">www.fredriksvensen.no</a>
        </div > 
        ;
    }
});

module.exports.Footer = Footer;

var Header = React.createClass({
    render: function() {
        return <div className="reactComponentContainer">
            <h1>CavaD</h1>
        </div>
        ;
    }
});

module.exports.Header = Header;