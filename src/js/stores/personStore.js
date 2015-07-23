var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var PersonConstants = require('../constants/person-constants.js');
var AppStore = require('../stores/appStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var person = {};
var step = 'personal';

var calculateBMI = function () {
    if (!person.personal || !person.personal.height || !person.personal.weight) { return 0 };
    var hCm = person.personal.height / 100;
    var bmi = person.personal.weight / Math.pow(hCm, 2);
    return Math.round(bmi *10)/10;
};

var PersonStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getPerson: function () {
        person.BMI = calculateBMI();
        console.log(person);
        return person;
    },
    setPerson: function (newPersonData) {
        person[step] = newPersonData;
        console.log(person)
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
    console.log(action);
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
            AppStore.setPage(action.page);
            AppStore.emitChange();
            break;
        default:
            break;
    }

    return true;
});

module.exports = PersonStore;