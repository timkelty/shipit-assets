var utils = require('shipit-utils');
var _ = require('lodash');

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'assets:push', function() {
    var shipit = utils.getShipit(gruntOrShipit);
    _.assign(shipit.constructor.prototype, require('../../lib/transfer'));
    shipit.emit('assetsPush');
    return shipit.transfer('localToRemote');
  });
};
