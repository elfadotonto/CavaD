var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var RiskConstants = require('../constants/risk-constants.js');

var RiskActions = {
    toggleCholMeds: function () {
        AppDispatcher.handleViewAction({
            actionType: RiskConstants.TOGGLE_CHOLESTEROL_MEDS
        })
    },
    toggleBpMeds: function () {
        AppDispatcher.handleViewAction({
            actionType: RiskConstants.TOGGLE_BLOODPRESSURE_MEDS
        })
    }
}

module.exports = RiskActions;