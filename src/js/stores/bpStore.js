var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var RiskConstants = require('../constants/risk-constants.js');
var PersonConstants = require('../constants/person-constants.js');

var PersonStore = require('./personStore.js');

var bp = {};

var limit = function (min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

var setBp = function (sys, dia) {
    bp.sys = sys;
    bp.dia = dia;
    BpStore.emitBloodPressureChange();
};

var toggleBpMeds = function (value) {
    var sys;
    var dia;
    if (value) {
        sys = bp.sys - RiskConstants.BP_MEDS_SYS;
        dia = bp.dia - RiskConstants.BP_MEDS_DIA;
    } else {
        sys = bp.sys + RiskConstants.BP_MEDS_SYS;
        dia = bp.dia + RiskConstants.BP_MEDS_DIA;
    }
    setBp(sys, dia);
};

var BpStore = assign({}, EventEmitter.prototype, {
    emitBloodPressureChange: function() {
        this.emit(RiskConstants.BLOODPRESSURE_CHANGE_EVENT);
    },
    getBloodPressure: function() {
        return bp;
    },
    getBpGroup: function() {
        return limit(0, 3, Math.floor((bp.sys - 140) / 20) + 1);
    },
    addChangeListener: function(event, callback) { this.on(event, callback); },
    removeChangeListener: function(event, callback) { this.removeListener(event, callback); }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case PersonConstants.REG_MEDICAL:
            var medical = Object.create(PersonStore.getSection('medical'));
            setBp(medical.bpSys, medical.bpDia);
            break;
        case RiskConstants.TOGGLE_BLOODPRESSURE_MEDS:
            toggleBpMeds(action.value);
            break;
        default:
            break;
    }

    return true;
});

module.exports = BpStore;