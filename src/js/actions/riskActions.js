var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var RiskConstants = require('../constants/risk-constants.js');

var RiskActions = {
    toggleCholMeds: function (value) {
        AppDispatcher.handleViewAction({
            actionType: RiskConstants.TOGGLE_CHOLESTEROL_MEDS,
            value: value
        })
    },
    toggleBpMeds: function (value) {
        AppDispatcher.handleViewAction({
            actionType: RiskConstants.TOGGLE_BLOODPRESSURE_MEDS,
            value: value
        })
    }
}

module.exports = RiskActions;