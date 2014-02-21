var redis = require('redis');
var events = require('events');
var ctxlog = require('contegix-logger');
var Emitter = new events.EventEmitter;
var db = require('./lib/db')

module.exports = function(params)
{
  var module = {};

  // This is called at the bottom of the module
  function initialize(initializeCallback) {
    Emitter.emit('configure.complete', params);
    initializeCallback(null, 'OK');
  }

  var raiseError = function(message)
  {
    logger.log('error', 'raise error: ' + message, {});
    throw Error(message);
  };

  Emitter.on('configure.complete', function(params) {
    if (params.warm_cache === true)
    {
      start(params);
    }
  });

  var getDeviceByID = function(deviceID, callback) {
    db.devices.findbyDeviceID(deviceID, callback);
  };

  var getDeviceByHostname = function(hostname, callback) {
    db.devices.findbyHostname(hostname, callback);
  };

  var getTicketsbyDeviceID = function(deviceID, callback) {
    db.tickets.findBydeviceID(deviceID, callback);
  };

  var getDevicesbyTypeGroupID = function(typeGroupID, callback) {
    db.tickets.findByTypeGroupID(typeGroupID, callback);
  };

  var getDevicesbyClientID = function(clientID, callback) {
    db.devices.findByClientID(clientID, callback);
  };

  var getTicketsbyClientID = function(clientID, callback) {
    db.tickets.findByClientID(clientID, callback);
  };

  var getTickets = function(callback) {
    callback(null, db.tickets.tickets);
  };

  var getTicketPostsbyTicketID = function(ticketID, callback) {
    callback(null, db.tickets.tickets);
  };

  var getClientByID = function (clientID, callback) {
    db.clients.findByClientID(clientID, callback);
  };

  var getClients = function(callback) {
    callback(null, db.clients.clients);
  };

  var getDeviceHostnames = function(callback) {
    var devices = db.devices.devices;
    var deviceList = [];
    _.each(devices, function(device) {
     deviceList.push({hostname: device.hostname, deviceID: device.deviceID});
    });
    callback(null, deviceList);
  };

  var getContactsbyClientID = function(clientID, callback) {
    db.contacts.findbyClientID(clientID, callback);
  };

  var getContactbyContactID = function(contactID, callback) {
    db.contacts.findByContactID(contactID, callback);
  };

  var authenticateUser = function(username, pass, callback) {
    var contact = db.contacts.findbyusername(username);
    if (!contact){ return callback('Invalid Username or Password', null); }
    if (!contact.password || contact.password != pass) { return callback('Invalid Username or Password', null); }
    return callback(null, contact)
  };

  module.getDeviceByID = getDeviceByID;
  module.getDeviceByHostname = getDeviceByHostname;
  module.getTicketsbyDeviceID = getTicketsbyDeviceID;
  module.getDevicesbyTypeGroupID = getDevicesbyTypeGroupID;
  //module.getDeviceTypeList = getDeviceTypeList;
  module.getDevicesbyClientID = getDevicesbyClientID;
  module.getTicketsbyClientID = getTicketsbyClientID;
  module.getTickets = getTickets;
  module.getTicketPostsbyTicketID = getTicketPostsbyTicketID;
  module.getTicketbyTicketID = getTicketbyTicketID;
  module.getClientByID = getClientByID;
  module.getClients = getClients;
  module.getDeviceHostnames = getDeviceHostnames;
  module.getContactsbyClientID = getContactsbyClientID;
  module.getContactbyContactID = getContactbyContactID;
  module.getAdmins = getAdmins;
  module.getAPIMethods = getAPIMethods;
  module.postItemToUbersmith = postItemToUbersmith;
  module.authenticateUser = authenticateUser;

  initialize(function(err, reply) {
    logger.log('info', 'Ubersmith Module Initialization Complete', {});
  });

  return module;
}

