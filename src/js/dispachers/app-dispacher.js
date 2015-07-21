var Dispacher = require('flux').Dispacher;
var assign = require('react/lib/Object.assign');

var AppDispacher = assign(new Dispacher(), {
    handleViewAction: function(action) {
        this.dispach({
            source: 'VIEW_ACTION',
            action: action
        })
    }
});

module.exports = AppDispacher;