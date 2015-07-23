var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var PersonConstants = require('../constants/person-constants.js');

var AppActions = {
    back: function(step){
        AppDispatcher.handleViewAction({
            actionType: PersonConstants.BACK,
            step: step
        });
    },
    registerPersonal: function (step, data) {
        AppDispatcher.handleViewAction({
            actionType: PersonConstants.REG_PERSONAL,
            step: step,
            data: data
        });
    },
    registerLifeStyle: function (page, data) {
        AppDispatcher.handleViewAction({
            actionType: PersonConstants.REG_LIFESTYLE,
            page: page,
            data: data
        });
    }
}

module.exports = AppActions;