var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Risk = require('../../assets/risk.json');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var RiskConstants = require('../constants/risk-constants.js');
var PersonConstants = require('../constants/person-constants.js');

var PersonStore = require('./personStore.js');

var person = {};

var limit = function (min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

var getAgeGroup = function () {
    return limit(0, 4, Math.floor((person.personal.age - 50) / 5) + 1);
};

var getColGroup = function(){
    return limit(0, 4, Math.floor(person.medical.totCol - 5) + 1);
};

var getBpGroup = function(){
    return limit(0, 3, Math.floor((person.medical.bpSys - 140) / 20) + 1);
};

var calculateRisk = function () {
    var r = person.gender == 'male' ? Risk.male : Risk.female;
    r = person.smoke ? r.smoke[1] : r.smoke[0];
    r = r.age[getAgeGroup()]
    r = r.col[getColGroup()];
    r = r.bp[getBpGroup()];
    return r;
};

var initChanges = function () {
    return {
        takeCholMeds: false,
        takeBpMeds: false
    }
};

var toggleCholMeds = function () {
    person.changes.takeCholMeds = !person.changes.takeCholMeds;
    var ldlCoff = 1 - (person.medical.ldl / RiskConstants.CHOL_MEDS_LDL);
    if (person.changes.takeCholMeds) {
        person.medical.ldl = person.medical.ldl * ldlCoff;
        person.medical.hdl = person.medical.hdl * RiskConstants.CHOL_MEDS_HDL;
    } else {
        person.medical.ldl = person.medical.ldl / ldlCoff;
        person.medical.hdl = person.medical.hdl / RiskConstants.CHOL_MEDS_HDL;
    }
};

var toggleBpMeds = function () {
    person.changes.takeBpMeds = !person.changes.takeBpMeds;
    if (person.changes.takeBpMeds) {
        person.medical.bpSys -= RiskConstants.BP_MEDS_SYS;
        person.medical.bpDia -= RiskConstants.BP_MEDS_DIA;
    } else {
        person.medical.bpSys += RiskConstants.BP_MEDS_SYS;
        person.medical.bpDia += RiskConstants.BP_MEDS_DIA;
    }
};

var RiskStore = assign({}, EventEmitter.prototype, {
    emitRiskChange: function () {
        this.emit(RiskConstants.RISK_CHANGE_EVENT);
    },
    emitCholesterolChange: function () {
        this.emit(RiskConstants.CHOLESTEROL_CHANGE_EVENT);
    },
    emitBloodPressureChange: function () {
        this.emit(RiskConstants.BLOODPRESSURE_CHANGE_EVENT);
    },
    getRisk: function() {
        return calculateRisk();
    },
    getCholesterol: function () {
        return {
            ldl: person.medical.ldl,
            hdl: person.medical.hdl
        };
    },
    getBloodPressure: function () {
        return {
            sys: person.medical.bpSys,
            dia: person.medical.bpDia
        };
    },
    getMedication: function(){
        return {
            cholMeds: person.medical.colMeds,
            takeCholMeds: person.changes.takeCholMeds
        };
    },
    addChangeListener: function (event, callback) { this.on(event, callback); },
    removeChangeListener: function (event, callback) { this.removeListener(event, callback); },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case PersonConstants.REG_MEDICAL:
            person = Object.create(PersonStore.getPerson());
            person.changes = initChanges();
            break;
        case RiskConstants.TOGGLE_CHOLESTEROL_MEDS:
            toggleCholMeds();
            RiskStore.emitCholesterolChange();
            RiskStore.emitRiskChange();
            break;
        case RiskConstants.TOGGLE_BLOODPRESSURE_MEDS:
            toggleBpMeds();
            RiskStore.emitBloodPressureChange();
            RiskStore.emitRiskChange();
            break;
        default:
            break;
    }

    return true;
});

module.exports = RiskStore;