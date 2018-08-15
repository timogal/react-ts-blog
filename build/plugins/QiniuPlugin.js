const qiniu = require('qiniu');

const pluginName = 'QiniuWebpackPlugin';

const zones = {
  EAST: qiniu.zone.Zone_z0,
  NORTH: qiniu.zone.Zone_z1,
  SOUTH: qiniu.zone.Zone_z2,
  US_NORTH: qiniu.zone.Zone_na0
};

/**
 *
 * @param {object} options
 * @param {string} options.accessKey
 * @param {string} options.secretKey
 * @param {string} options.bucket
 * @param {string} [options.dir]
 * @param options.zone
 * @param {boolean} [options.useHttpsDomain]
 * @param {boolean} [options.useCdnDomain]
 * @param {string|Array<string>|RegExp} [options.exclude]
 */
function QiniuWebpackPlugin(options) {
  const { accessKey, secretKey, bucket, dir = 'assets', exclude, ...rest } = options;
  this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let d = dir;
  if (d.indexOf('/') === 0) {
    d = d.substring(1);
  }
  if (d.lastIndexOf('/') !== d.length - 1) {
    d = d + '/';
  }
  this.dir = d;
  this.exclude = exclude;
  this.uploadOptions = {
    scope: bucket,
  };
  this.uploadConfig = {
    ...rest
  };
}

QiniuWebpackPlugin.prototype.shouldUpload = function (filename) {
  if (!this.exclude) {
    return true;
  }
  if (typeof this.exclude === 'string') {
    return filename !== this.exclude;
  }
  if (this.exclude instanceof RegExp) {
    return !this.exclude.test(filename);
  }
  return true;
};

QiniuWebpackPlugin.prototype.getUploadToken = function () {
  const putPolicy = new qiniu.rs.PutPolicy(this.uploadOptions);
  return putPolicy.uploadToken(this.mac);
};

QiniuWebpackPlugin.prototype.doUpload = function (token, filename, filePath) {
  const formUploader = new qiniu.form_up.FormUploader(this.uploadConfig);
  const key = `${this.dir}${filename}`;
  return new Promise((resolve, reject) => {
    formUploader.putFile(token, key, filePath, null, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

QiniuWebpackPlugin.prototype.apply = function (compiler) {
  compiler.hooks.afterEmit.tap(pluginName, compilation => {
    const tasks = [];
    const token = this.getUploadToken();
    Object.keys(compilation.assets).forEach(key => {
      if (this.shouldUpload(key)) {
        const filePath = compilation.assets[key].existsAt;
        tasks.push(this.doUpload(token, key, filePath));
      }
    });
    Promise.all(tasks)
      .then(() => {
        console.log(`[${pluginName}] : 上传成功`);
      })
      .catch((reason) => {
        throw new Error(`[${pluginName}] : 上传失败，${reason.message}`);
      });
  });
};

QiniuWebpackPlugin.zones = zones;

module.exports = QiniuWebpackPlugin;
