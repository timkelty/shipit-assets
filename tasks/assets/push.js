var utils = require('shipit-utils');
var transfer = require('../../lib/transfer');

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'assets:push', function() {
    var shipit = utils.getShipit(gruntOrShipit);
    shipit = transfer(shipit);

    return shipit.transfer('localToRemote');
  });
};
