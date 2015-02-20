var utils = require('shipit-utils');
var transfer = require('../../lib/transfer');

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);
  shipit = transfer(shipit);

  utils.registerTask(gruntOrShipit, 'assets:pull', function() {
    return shipit.transfer('remoteToLocal');
  });
};
