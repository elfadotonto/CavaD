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
    registerLifeStyle: function (step, data) {
        AppDispatcher.handleViewAction({
            actionType: PersonConstants.REG_LIFESTYLE,
            step: step,
            data: data
        });
    },
    registerMedical: function (page, data) {
        AppDispatcher.handleViewAction({
            actionType: PersonConstants.REG_MEDICAL,
            page: page,
            data: data
        });
    }
}

module.exports = AppActions;