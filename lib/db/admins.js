var _ = require('underscore');

exports.getAll = function(done) {
  return admins;
};

exports.find = function(id, done) {
  var _ = require('underscore');
  var returnList = _.find(admins, {adminID: adminID});
  return done(null, returnList);
};

exports.findByAdminID = function(id, done) {
  var _ = require('underscore');
  var returnList = _.findWhere(admins, {adminID: adminID});
  return done(null, returnList);
};

exports.findByClientID = function(clientID, done) {
  var adminID = 79 + (clientID % 16);
  var returnList = _.findWhere(admins, {adminID: adminID});
  return done(null, returnList);
};

exports.findByUsername = function(username, done) {
  var _ = require('underscore');
  var returnList = _.findWhere(admins, {username: username});
  return done(null, returnList);
};

exports.findByEmail = function(email, done) {
  var _ = require('underscore');
  var returnList = _.findWhere(admins, {email: email});
  return done(null, returnList);
};

exports.findByName = function(name, done) {
  var _ = require('underscore');
  var returnList = _.findWhere(admins, {name: name});
  return done(null, returnList);
};

var admins = [
  {
    "username": "sconroy",
    "name": "Shanny Conroy",
    "clientID": 1560,
    "phone": "395.127.3635x39251",
    "adminID": 79,
    "password": "7PzM3cFk5f",
    "email": "sconroy@schultz.com"
  },
  {
    "username": "abeatty",
    "name": "Anna Beatty",
    "clientID": 1560,
    "phone": "421.385.5508x7278",
    "adminID": 80,
    "password": "OpNepl4Qy",
    "email": "abeatty@schultz.com"
  },
  {
    "username": "ayundt",
    "name": "Ayden Yundt",
    "clientID": 1560,
    "phone": "747-882-3680x14338",
    "adminID": 81,
    "password": "OFgtf04w3",
    "email": "ayundt@schultz.com"
  },
  {
    "username": "aking",
    "name": "Ashlee King",
    "clientID": 1560,
    "phone": "1-958-612-4023x1736",
    "adminID": 82,
    "password": "HQTrVMt4I",
    "email": "aking@schultz.com"
  },
  {
    "username": "rturcotte",
    "name": "Rebeca Turcotte",
    "clientID": 1560,
    "phone": "037-984-2086",
    "adminID": 83,
    "password": "GB9h4EjPG",
    "email": "rturcotte@schultz.com"
  },
  {
    "username": "mankunding",
    "name": "Moriah Ankunding",
    "clientID": 1560,
    "phone": "533.353.0081",
    "adminID": 84,
    "password": "OcJPViKwx",
    "email": "mankunding@schultz.com"
  },
  {
    "username": "kkilback",
    "name": "Kaia Kilback",
    "clientID": 1560,
    "phone": "+86(8)8388881006",
    "adminID": 85,
    "password": "lozpIIDPB60",
    "email": "kkilback@schultz.com"
  },
  {
    "username": "rnolan",
    "name": "Raegan Nolan",
    "clientID": 1560,
    "phone": "080.678.6688x7963",
    "adminID": 86,
    "password": "6ZKsUF8nJ",
    "email": "rnolan@schultz.com"
  },
  {
    "username": "ehuels",
    "name": "Ernestine Huels",
    "clientID": 1560,
    "phone": "00132459605",
    "adminID": 87,
    "password": "g99ujX7U2",
    "email": "ehuels@schultz.com"
  },
  {
    "username": "awehner",
    "name": "Angeline Wehner",
    "clientID": 1560,
    "phone": "536-781-2142x25815",
    "adminID": 88,
    "password": "9w5ufaCX",
    "email": "awehner@schultz.com"
  },
  {
    "username": "rleuschke",
    "name": "Rosetta Leuschke",
    "clientID": 1560,
    "phone": "242-687-0394x94535",
    "adminID": 89,
    "password": "whIIEOr5",
    "email": "rleuschke@schultz.com"
  },
  {
    "username": "ewelch",
    "name": "Elaina Welch",
    "clientID": 1560,
    "phone": "(402)625-7020x1065",
    "adminID": 90,
    "password": "XNvNUAkKv",
    "email": "ewelch@schultz.com"
  },
  {
    "username": "abrekke",
    "name": "Abel Brekke",
    "clientID": 1560,
    "phone": "591-477-3425x4446",
    "adminID": 91,
    "password": "nxZip9Te",
    "email": "abrekke@schultz.com"
  },
  {
    "username": "mbergstrom",
    "name": "Mariane Bergstrom",
    "clientID": 1560,
    "phone": "1-178-355-5141x949",
    "adminID": 92,
    "password": "UDCfXNR3yZ",
    "email": "mbergstrom@schultz.com"
  },
  {
    "username": "jrogahn",
    "name": "Josephine Rogahn",
    "clientID": 1560,
    "phone": "1-032-464-3559",
    "adminID": 93,
    "password": "kA8hhgjBjl",
    "email": "jrogahn@schultz.com"
  },
  {
    "username": "tmorar",
    "name": "Tom Morar",
    "clientID": 1560,
    "phone": "808-477-7928",
    "adminID": 94,
    "password": "VGe0UzzO",
    "email": "tmorar@schultz.com"
  }
]
