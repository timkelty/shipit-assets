/* jshint unused:false */
var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');
var path = require('path');
var Promise = require('bluebird');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var transfer = require('../../lib/transfer');

module.exports = function (gruntOrShipit) {
  var shipit = getShipit(gruntOrShipit);
  shipit = transfer(shipit);

  registerTask(gruntOrShipit, 'assets:push', function() {
    return shipit.transfer('localToRemote');
  });
};
