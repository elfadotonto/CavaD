var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');

var AppActions = {
    move: function(page) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.MOVE,
            page: page
        })
    }
}

module.exports = AppActions;