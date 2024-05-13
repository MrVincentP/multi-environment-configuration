const argvs = process.argv.slice(2);

function getParams(key) {
  let item = argvs.find(item => item.split('=')[0] === key);
  return item ? item.split('=') : []
}

class MultiModule {
  constructor(name, opts) {
    Object.assign(this, {
      name,
      port: 9000,
      host: '0.0.0.0',
      filename: '',
      title: '',
      appVersion: 1.1,
      dev: {
        staticURL: './',
        apiURL: 'http://bms.dev.myapp.com',
        webURL: 'http://bms.dev.myapp.com',
        dist: 'dev',
      },
      test: {
        staticURL: './',
        apiURL: 'http://bms.test.myapp.com',
        webURL: 'http://bms.test.myapp.com',
        dist: 'test',
      },
      uat: {
        staticURL: './',
        apiURL: 'http://bms.uat.myapp.com',
        webURL: 'http://bms.uat.myapp.com',
        dist: 'uat',
      },
      prod: {
        staticURL: './',
        apiURL: 'http://bms.myapp.com',
        webURL: 'http://bms.myapp.com',
        dist: 'prod',
      },
    }, opts)
  }
}

function getModuleProcess(name) {
  let mItem = importModules.find(item => item.name === name);
  return mItem || importModules[0];
}

/**Multi module independent configuration**/
const importModules = [new MultiModule('domesticApp', {
  port: 10000,
  filename: 'index.html',
  title: 'my domestic app',
  sysApp: 'domesticApp',
  sysName: 'domestic',
  dev: { // if you don't config this, it will inherit the above MultiModule dev config
    staticURL: './',
    apiURL: 'http://bms.dev.domestic.myapp.com',
    webURL: 'http://bms.dev.domestic.myapp.com',
    dist: 'dev',
  },
  test: { // if you don't config this, it will inherit the above MultiModule test config
    staticURL: './',
    apiURL: 'http://bms.test.domestic.myapp.com',
    webURL: 'http://bms.test.domestic.myapp.com',
    dist: 'test',
  },
  uat: { // if you don't config this, it will inherit the above MultiModule uat config
    staticURL: './',
    apiURL: 'http://bms.uat.domestic.myapp.com',
    webURL: 'http://bms.uat.domestic.myapp.com',
    dist: 'uat',
  },
  prod: {
    staticURL: './',
    apiURL: 'http://bms.domestic.myapp.com',
    webURL: 'http://bms.domestic.myapp.com',
    dist: 'prod',
  },
}),new MultiModule('globalApp', {
  port: 10000,
  filename: 'index.html',
  title: 'my global app',
  sysApp: 'globalApp',
  sysName: 'global',
  dev: {
    staticURL: './',
    apiURL: 'http://bms.dev.global.myapp.com',
    webURL: 'http://bms.dev.global.myapp.com',
    dist: 'dev',
  },
  test: {
    staticURL: './',
    apiURL: 'http://bms.test.global.myapp.com',
    webURL: 'http://bms.test.global.myapp.com',
    dist: 'test',
  },
  uat: {
    staticURL: './',
    apiURL: 'http://bms.uat.global.myapp.com',
    webURL: 'http://bms.uat.global.myapp.com',
    dist: 'uat',
  },
  prod: {
    staticURL: './',
    apiURL: 'http://bms.global.myapp.com',
    webURL: 'http://bms.global.myapp.com',
    dist: 'prod',
  },
})];

let eventName = String(process.env.npm_lifecycle_event).split('-');
let moduleName = getParams('name')[1] || eventName[1];

const webpackConfig = {
  modules: importModules,
  process: getModuleProcess(moduleName),
  getNodeENV(obj) {
    return getENV('node', obj, webpackConfig.process);
  },
  getBuildENV(obj) {
    return getENV('build', obj, webpackConfig.process);
  },
};

function getENV(type, obj, params) {
  let item;
  for (let x in params) {
    item = params[x];
    if (typeof item === 'object' && x === JSON.parse(obj.prod)) {
      getENV(type, obj, item);
    }
    if (typeof item !== 'object') {
      if (type === 'node') {
        obj[x] = '"' + item + '"';
      }
      if (type === 'build') {
        obj[x] = item;
      }
    }
  }
  return obj;
}

module.exports = webpackConfig;
