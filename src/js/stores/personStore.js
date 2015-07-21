var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');
var AppStore = require('../stores/appStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');

var person = {};
var PersonStore = assign({}, EventEmitter.prototype, {
    getPerson: function () {
        return person;
    },
    setPerson: function (newPerson) {
        person = newPerson;
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    console.log(action);
    switch(action.actionType) {
        case AppConstants.REG_PERSON:
            PersonStore.setPerson(action.data);
            break;
        default:
            break;
    }

    return true;
});

module.exports = PersonStore;