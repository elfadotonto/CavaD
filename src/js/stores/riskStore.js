var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var RiskConstants = require('../constants/risk-constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Risk = require('../../assets/risk.json');
var PersonStore = require('./personStore.js');

var CHANGE_EVENT = 'change';
var person = {};
var risk = 0;

var calculateRisk = function (person) {
    var r = person.gender == 'male' ? Risk.male : Risk.female;
    r = person.smoke ? r.smoke[1] : r.smoke[0];
    r = r.age[PersonStore.getAgeGroup()]
    r = r.col[PersonStore.getColGroup()];
    r = r.bp[PersonStore.getBpGroup()];
    return r;
};

var RiskStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getRisk: function(person){
        return calculateRisk(person);
    },
    addChangeListener: function (callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function (callback) { this.removeListener(CHANGE_EVENT, callback); },
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