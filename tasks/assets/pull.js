var utils = require('shipit-utils');
var _ = require('lodash');

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'assets:pull', function() {
    var shipit = utils.getShipit(gruntOrShipit);
    _.assign(shipit.constructor.prototype, require('../../lib/transfer'));

    return shipit.transfer('remoteToLocal');
  });
};
