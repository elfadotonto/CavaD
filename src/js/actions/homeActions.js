var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');

var AppActions = {
    move: function(item) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.MOVE,
            page: item
        })
    }
}

module.exports = AppActions;