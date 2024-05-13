const argvs = process.argv;
let application, env;
if(argvs.length === 1){
  let argArr = argvs[0].split('\\');
  argArr = argArr[argArr.length - 1].replace('.Electron.App', '').replace('.exe', '').toLowerCase();
  argArr = argArr.split('-');
  application = argArr[0];
  env = argArr[1] || 'prod';
}else{
  env = process.env.NODE_ENV;
}
console.log("argvs env", env);

let eventArr = String(process.env.npm_lifecycle_event).split('-');
application = eventArr[1] || application || 'forgame';
let version = '0.2.9';
console.log("application", application);

const appArr = [
  { name: 'forgame', author: 'ForGame', id: 1 },
  { name: 'falcon', author: 'Falcon', id: 2 },
  { name: 'WisdomMultiply', author: 'WisdomMultiply', id: 3 },
  { name: 'rotai', author: 'Rotai', id: 4 },
  { name: 'isen', author: 'ISen', id: 5 },
];

class buildConf {
  constructor (opts, env) {
    Object.assign(this, {
      //executableName: opts.name,
      buildVersion: version,
      productName: `${opts.author+(env !== 'prod' ? '-'+env:'')}.Electron.App`,
      appId: `com.${opts.author}Desktop.${env}.app`,
      electronVersion: "30.0.3",
      copyright: `${opts.author}@2024`,
      artifactName: `${opts.author}Desktop.${(env !== 'prod' ? env+'.':'')+version}.exe`,
      asar: true,
      directories: {
        output: `dist/${env}/${version}/${opts.author}Desktop/`
      },
      extraResources:[ 'preload.js' ],
      extraFiles: [ 'static', 'preload.js' ],
      files: [ 'main.js', 'utils', 'config' ],
      extends: null,
      win: {
        icon: `./logo/${opts.name}.ico`,
        requestedExecutionLevel: 'highestAvailable',
        target: [{
          target: 'nsis',
          arch: [ 'x64', /**'ia32'**/ ]
        }],
        asarUnpack: [ '~temp', 'README.md', 'preload.js', 'obs-log' ]
      },
      nsis: {
        oneClick: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        installerIcon: `./logo/${opts.name}.ico`,
        uninstallerIcon: `./logo/${opts.name}.ico`,
        installerHeaderIcon: `./logo/${opts.name}.ico`,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: `${opts.author+(env !== 'prod' ? '-'+env:'')}.Electron.App`,
        include: ''
      },
      publish: [{
        provider: 'generic',
        url: `http://vidm.${env}.myapp.com/app/${opts.id}/`
      }],
      releaseInfo: {
        // releaseName: executableName,
        // releaseNotes: opts.author,
        vendor: {
          id: opts.id,
          name: opts.name,
          author: opts.author,
          version,
          dev: `http://localhost:1515/#/login?logoId=${opts.id}`,
          test: `http://bms.dev.myapp.com/#/login?logoId=${opts.id}`,
          uat: `http://bms.uat.myapp.com/#/login?logoId=${opts.id}`,
          prod: `http://bms.myapp.com/#/login?logoId=${opts.id}`,
        }
      },
      defaultArch: env
    });
  }
}
const getAppConf = () => {
  let obj = appArr[0];
  for(let i=0;i<appArr.length;i++){
    if(application === appArr[i].name){
      obj = appArr[i];
    }
  }
  return new buildConf(obj, env);
}

module.exports = getAppConf();
