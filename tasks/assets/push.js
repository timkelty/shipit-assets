/* jshint unused:false */
var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');
var path = require('path');
var Promise = require('bluebird');

module.exports = function (gruntOrShipit) {
  registerTask(gruntOrShipit, 'assets-push', task);

  function task() {
    var shipit = getShipit(gruntOrShipit);
  }
};
