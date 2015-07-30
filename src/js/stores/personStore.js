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

var calculateTotCol = function () {
    if (!person.medical || !person.medical.ldl || !person.medical.hdl) { return 0 };
    return person.medical.ldl + person.medical.hdl;
}

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
    getAgeGroup: function () {
        var a = Math.floor((person.personal.age - 50) / 5) + 1;
        if (a < 0) a = 0;
        else if (a > 4) a = 4;
        return a;
    },
    getColGroup: function(){
        var c = Math.floor(person.medical.totCol - 5) + 1;
        if (c < 0) c = 0;
        else if (c > 4) c = 4;
        return c;
    },
    getBpGroup: function(){
        var s = Math.floor((person.medical.bpSys - 140) / 20) + 1;
        if (s < 0) s = 0;
        else if (s > 3) s = 3;
        return s;
    },
    setPerson: function (newPersonData) {
        person[step] = newPersonData;
        if (step == 'personal') {
            person.personal.BMI = calculateBMI();
        } else if (step == 'medical') {
            person.medical.totCol = calculateTotCol();
        }
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