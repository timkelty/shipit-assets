/* jshint unused:false */
var registerTask = require('../../lib/register-task');
var getShipit = require('../../lib/get-shipit');
var path = require('path');
var Promise = require('bluebird');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = function (gruntOrShipit) {
  registerTask(gruntOrShipit, 'assets:push', task);

  function task() {
    var shipit = getShipit(gruntOrShipit);
    var paths = shipit.config.assets.paths;
    var localPaths = shipit.config.assets.localPaths || paths;
    shipit.currentPath = path.join(shipit.config.deployTo, 'current');
    shipit.sharedPath = path.join(shipit.config.deployTo, 'shared');
    shipit.config.assets.remoteBasePath = shipit.config.assets.remoteBasePath || shipit.sharedPath;
    shipit.config.assets.localBasePath = shipit.config.assets.localBasePath || process.cwd();

    paths = paths.map(function(value, index) {
      var remotePath = path.join(shipit.config.assets.remoteBasePath, value);
      var localPath = path.join(shipit.config.assets.localBasePath, localPaths[index]);

      // Test if dir, add trailing slash to src
      localPath = path.join(localPath, '/');

      // Throw exception is localPaths[index] is undef

      return shipit.remoteCopy(localPath, remotePath, {
        direction: 'localToRemote'
      });
    });

    return Promise.all(paths)
    .then(function() {
      shipit.log(chalk.green('Assets synced: local → %s'), shipit.environment);
    });
  }
};
