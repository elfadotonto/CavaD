var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var PersonConstants = require('../constants/person-constants.js');
var AppStore = require('../stores/appStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var person = {};
var step = 'personal';

var limit = function (min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

var calculateBMI = function () {
    if (!person.personal || !person.personal.height || !person.personal.weight) { return 0 };
    var hCm = person.personal.height / 100;
    var bmi = person.personal.weight / Math.pow(hCm, 2);
    return Math.round(bmi * 10) / 10;
};

var PersonStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getPerson: function () {
        return person;
    },
    getSection: function(section){
        return person[section];
    },
    setPerson: function (newPersonData) {
        person[step] = newPersonData;
        if (step == 'personal') {
            person.personal.BMI = calculateBMI();
        }
    },
    getAgeGroup: function () {
        return limit(0, 4, Math.floor((person.personal.age - 50) / 5) + 1);
    },
    getGender: function() {
        return person.personal.gender == 'male';
    },
    getSmoke: function() {
        return person.smoke;
    },
    getMedication: function() {
        return {
            cholMeds: person.medical.colMeds,
            bpMeds: person.medical.bpMeds
        };
    },
    getStep: function () {
        return step;
    },
    setStep: function (newStep) {
        step = newStep;
    },
    addChangeListener: function (callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function (callback) { this.removeListener(CHANGE_EVENT, callback); },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case PersonConstants.BACK:
            PersonStore.setStep(action.step);
            PersonStore.emitChange();
            break;
        case PersonConstants.REG_PERSONAL:
            PersonStore.setPerson(action.data);
            PersonStore.setStep(action.step);
            PersonStore.emitChange();
            break;
        case PersonConstants.REG_LIFESTYLE:
            PersonStore.setPerson(action.data);
            PersonStore.setStep(action.step);
            PersonStore.emitChange();
            break;
        case PersonConstants.REG_MEDICAL:
            PersonStore.setPerson(action.data);
            AppStore.setPage(action.page);
            AppStore.emitChange();
            break;
        default:
            break;
    }

    return true;
});

module.exports = PersonStore;