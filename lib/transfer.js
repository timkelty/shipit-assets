var path = require('path');
var Promise = require('bluebird');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = function transfer(shipit) {
  return _.assign(shipit, {
    transfer: function(direction) {
      var paths = shipit.config.assets.paths;
      var localPaths = shipit.config.assets.localPaths || paths;
      var src, dest;

      if (direction == 'localToRemote') {
        src = 'local';
        dest = shipit.environment;
      } else {
        src = shipit.environment;
        dest = 'local';
      }

      shipit.config.assets.remoteBasePath = shipit.config.assets.remoteBasePath || path.join(shipit.config.deployTo, 'shared');
      shipit.config.assets.localBasePath = shipit.config.assets.localBasePath || process.cwd();

      paths = paths.map(function(value, index) {

        if (!localPaths[index]) {
          throw new Error(chalk.bgMagenta.black('Shipit.config.assets.paths') + ' and ' + chalk.bgMagenta.black('Shipit.config.assets.localPaths') + ' must have the same length.');
        }

        var localPath = path.join(shipit.config.assets.localBasePath, localPaths[index]);
        var remotePath = path.join(shipit.config.assets.remoteBasePath, value);
        var pathSrc, pathDest;

        if (src == 'local') {
          pathSrc = localPath;
          pathDest = remotePath;
        } else {
          pathSrc = remotePath;
          pathDest = localPath;
        }

        // TODO: will this break if you have a non-directory?]
        // Needs a slash for rsync...
        pathSrc = path.join(pathSrc, '/');

        return shipit.remoteCopy(pathSrc, pathDest, {
          direction: direction
        });
      });

      return Promise.all(paths)
      .then(function() {
        var msg = chalk.green('Assets synced: ') + '%s %s %s';

        // Local always on the left, easier to read
        if (src == 'local') {
          shipit.log(msg, chalk.blue(src), chalk.white('⇢'), chalk.yellow(dest));
        } else {
          shipit.log(msg, chalk.blue(dest), chalk.white('⇠'), chalk.yellow(src));
        }
      });
    }
  });
};
