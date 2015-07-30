var React = require('react');

var toTitleCase = function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
var getKeys = function(obj){
    return Object.keys(obj);
};
var DefinitionList = React.createClass({  
    getInitialState: function() {
        return { data: this.props.section};
    },
    render: function() {
        var items = getKeys(this.state.data).map(function(key){
            return (
                <DefinitionListItem title={toTitleCase(key)} data={this.state.data[key]} />
            );
        }.bind(this));
        return <div className="col-sm-6">
                    <h4>{toTitleCase(this.props.title)}</h4>
                    <ul className="ul-horizontal definition-list">
                        {items}
                    </ul>
                </div>
        ;
    }
});

var DefinitionListItem = React.createClass({
    render: function(){
        return (<li>
                    <div className="title">{this.props.title}</div>
                    <div className="data">{this.props.data}</div>
                </li>);
    }
});
module.exports = DefinitionList;