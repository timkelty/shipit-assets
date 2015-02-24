# shipit-assest

Asset syncing tasks for [Shipit](https://github.com/shipitjs/shipit).

**Features:**

- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
npm install shipit-assets
```

## Usage

### Example `shipitfile.js`

```js
module.exports = function (shipit) {
  require('shipit-assets')(shipit);

  shipit.initConfig({
    default: {
      assets: {
        paths: ['public/storage'],
        options: {
          ignores: ['cache']
        },
      }
    },
  });
};
```

Push your local assets to remote:

```
shipit staging assets:push
```

Pull your remote assets to local:

```
shipit staging assets:pull
```

## Options (`shipit.config.assets`)

### `assets.paths`

Type: `Array`

Paths to sync between remote and local. Paths are relative to project root.

### `assets.localPaths`

Type: `Array`

If your local paths are mapped differently than remote, you may specify here. If specified, the array must have the same length as `assets.paths`. Default: `assets.paths`

### `assets.options`

Options to pass to [`shipit.remoteCopy`](https://github.com/shipitjs/shipit#shipitremotecopysrc-dest-options-callback).

## License

MIT
