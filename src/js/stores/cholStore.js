var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var RiskConstants = require('../constants/risk-constants.js');
var PersonConstants = require('../constants/person-constants.js');

var PersonStore = require('./personStore.js');

var chol = {};

var limit = function (min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

var calculateTotCol = function () {
    if (!chol || !chol.ldl || !chol.hdl) { return 0 };
    return parseInt(chol.ldl) + parseInt(chol.hdl);
};

var setChol = function (hdl, ldl) {
    chol.ldl = ldl;
    chol.hdl = hdl;
    chol.tot = calculateTotCol();
    CholStore.emitCholesterolChange();
};

var toggleCholMeds = function (value) {
    var ldlCoff = 1 - (chol.ldl / RiskConstants.CHOL_MEDS_LDL);
    var ldl;
    var hdl;
    if (value) {
        ldl = chol.ldl * ldlCoff;
        hdl = chol.hdl * RiskConstants.CHOL_MEDS_HDL;
    } else {
        ldl = chol.ldl / ldlCoff;
        hdl = chol.hdl / RiskConstants.CHOL_MEDS_HDL;
    }
    setChol(hdl, ldl);
};

var CholStore = assign({}, EventEmitter.prototype, {
    emitCholesterolChange: function() {
        this.emit(RiskConstants.CHOLESTEROL_CHANGE_EVENT);
    },
    getCholesterol: function() {
        return {
            ldl: chol.ldl,
            hdl: chol.hdl
        };
    },
    getColGroup: function() {
        return limit(0, 4, Math.floor(chol.tot - 5) + 1);
    },
    addChangeListener: function(event, callback) { this.on(event, callback); },
    removeChangeListener: function(event, callback) { this.removeListener(event, callback); },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case PersonConstants.REG_MEDICAL:
            var medical = Object.create(PersonStore.getSection('medical'));
            setChol(medical.hdl, medical.ldl);
            break;
        case RiskConstants.TOGGLE_CHOLESTEROL_MEDS:
            toggleCholMeds(action.value);
            break;
        default:
            break;
    }

    return true;
});

module.exports = CholStore;