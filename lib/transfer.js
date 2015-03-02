var path = require('path');
var Bluebird = require('bluebird');
var chalk = require('chalk');
var _ = require('lodash');

var Shipit = module.exports;

Shipit.transfer = function(direction) {
  var shipit = this;
  shipit.config.assets = _.defaults(shipit.config.assets || {}, {
    paths: [],
    options: {}
  });

  shipit.config.assets.options = _.assign(shipit.config.assets.options, {
    direction: direction,
    ignores: shipit.config.assets.options.ignores || []
  });

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

    return shipit.remoteCopy(pathSrc, pathDest, shipit.config.assets.options);
  });

  return Bluebird.all(paths)
  .then(function() {
    var msg = chalk.green('Assets synced: ') + '%s %s %s';

    // Local always on the left, easier to read
    if (src == 'local') {
      shipit.log(msg, chalk.blue(src), chalk.white('⇢'), chalk.yellow(dest));
    } else {
      shipit.log(msg, chalk.blue(dest), chalk.white('⇠'), chalk.yellow(src));
    }
  });
};
