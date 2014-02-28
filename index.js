var _ = require('underscore');
var async = require('async');

var events = require('events');
var Emitter = new events.EventEmitter;
var db = require('./lib/db');
var mgmtDomain = '';

var cache_manager = require('cache-manager');
var cache_memory = cache_manager.caching({store: 'memory', max: 1024*64 /*Bytes*/, ttl: 60 /*seconds*/});

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

  var randomValue = function(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  };

  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  Emitter.on('configure.complete', function(params) {
    if (params.warm_cache === true)
    {
      //start(params);
    }
  });

  var getDeviceByID = function(deviceID, callback) {
    db.devices.findByDeviceID(deviceID, callback);
  };

  var getDeviceByHostname = function(hostname, callback) {
    db.devices.findByHostname(hostname.replace(mgmtDomain, ''), function(error, deviceList) {
      callback(error, deviceList[0]);
    });
  };

  var getTicketsbyDeviceID = function(deviceID, callback) {
    db.tickets.findByDeviceID(deviceID, callback);
  };

  var getDevicesbyTypeGroupID = function(typeGroupID, callback) {
    db.devices.findByTypeGroupID(typeGroupID, callback);
  };

  var getDevicesbyClientID = function(clientID, callback) {
    db.devices.findByClientID(clientID, callback);
  };

  var getTicketsbyClientID = function(clientID, callback) {
    db.tickets.findByClientID(clientID, callback);
  };

  var getTickets = function(callback) {
    db.tickets.getAll(callback);
  };

  var getTicketbyTicketID = function(ticketID, callback) {
    db.tickets.findByTicketID(ticketID, callback);
  };

  var getTicketPostsbyTicketID = function(ticketID, callback) {
    callback(null, db.tickets.tickets);
  };

  var getClientByID = function (clientID, callback) {
    db.clients.findByClientID(clientID, callback);
  };

  var getClients = function(getClientsCallback) {
    var clientList = db.clients.getAll();
    async.map(clientList
      , function(client, iteratorCallback) {
        db.contacts.getPrimaryContactbyClientID(client.clientID, function (err, contact) {
          db.admins.findByClientID(client.clientID, function (err, admin) {
            client.salesperson_name = admin.name;
            client.full_name = contact.name;
            client.email = contact.email;
            iteratorCallback(null, client);
          });
        });
      }, getClientsCallback);
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
    db.contacts.findByClientID(clientID, callback);
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

  var getDeviceTypeList = function(callback) {
    db.devices.getDeviceTypeList(callback);
  };

  var addPostToTicket = function(ticketID, subject, body, visible, from, time_spent, callback) {
    console.log(ticketid + ' ' + subject);
    callback(null, {status: true, error_code: '', error_message: '', data: ticketID});
  };

  var createNewTicket = function(body, subject, recipient, user_id, author, cc, to, priority, client_id, contact_id, device_id, callback) {
    console.log(user_id + ' ' + subject);
    callback(null, {status: true, error_code: '', error_message: '', data: getRandomInt(900200, 900800)});
  };

  var getAdminByEmail = function(email, callback) {
    if (email) {
      db.admins.findByEmail(email, function (err, admin) {
        callback(err, admin);
      });
    } else {
     db.admins.getRandomAdmin(function (err, admin) {
       callback(err, admin);
     });
    }
  };

  module.getDeviceByID = getDeviceByID;
  module.getDeviceByHostname = getDeviceByHostname;
  module.getTicketsbyDeviceID = getTicketsbyDeviceID;
  module.getDevicesbyTypeGroupID = getDevicesbyTypeGroupID;
  module.getDeviceTypeList = getDeviceTypeList;
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
  //module.getAdmins = getAdmins;
  //module.getAPIMethods = getAPIMethods;
  //module.postItemToUbersmith = postItemToUbersmith;
  module.addPostToTicket = addPostToTicket;
  module.createNewTicket = createNewTicket;
  module.getAdminByEmail = getAdminByEmail;
  module.authenticateUser = authenticateUser;


  //deviation from cloudy-ubersmith here:
  var getSensuEvents = function(count, deviceID, callback) {
    cache_memory.wrap('getSensuEvents:' + count + '-' + deviceID, function(cacheCallback) {
      db.devices.getSensuEvents(count, deviceID, cacheCallback);
    }, callback);
  };

  module.getSensuEvents = getSensuEvents;

  initialize(function(err, reply) {
    mgmtDomain = params['mgmtDomain'];
    db.devices.setMgmtDomain(mgmtDomain);
    //logger.log('info', 'Ubersmith Module Initialization Complete', {});
  });

  return module;
}

