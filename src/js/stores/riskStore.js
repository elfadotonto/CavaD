var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Risk = require('../../assets/risk.json');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var RiskConstants = require('../constants/risk-constants.js');
var PersonConstants = require('../constants/person-constants.js');

var PersonStore = require('./personStore.js');
var BpStore = require('./BpStore.js');
var CholStore = require('./CholStore.js');

var calculateRisk = function () {
    var r = PersonStore.getGender() ? Risk.male : Risk.female;
    r = PersonStore.getSmoke() ? r.smoke[1] : r.smoke[0];
    r = r.age[PersonStore.getAgeGroup()]
    r = r.col[CholStore.getColGroup()];
    r = r.bp[BpStore.getBpGroup()];
    return r;
};

var RiskStore = assign({}, EventEmitter.prototype, {
    emitRiskChange: function () {
        this.emit(RiskConstants.RISK_CHANGE_EVENT);
    },
    getRisk: function() {
        return calculateRisk();
    },
    addChangeListener: function (event, callback) { this.on(event, callback); },
    removeChangeListener: function (event, callback) { this.removeListener(event, callback); },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        default:
            break;
    }

    return true;
});

module.exports = RiskStore;