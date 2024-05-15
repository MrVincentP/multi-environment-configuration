# multi-environment-configuration
A configuration that can help you achieve multi-environment packaging. Universal webpack and electron code.

# Requirement
When we have a SAAS application with 100 menus, we need to package them into different systems according to user needs, which can be easily achieved through permission management. However, our dist folder does contain all 100 menus and files in its entirety. So how can we achieve both permission isolation and physical isolation?

Based on this requirement, I have been researching webpack for half a month. At that time, I implemented it based on webpack 3, but now it has been upgraded to webpack 5. Of course, this is based on the operation of the nodeJS environment itself.

This set of basic configuration code is being tested on Vue3+webpack5 and Vue2+webpack3, with an electronic-builder. Not suitable for Angular 9+ as Angular cli comes with a webpack module. I don't know how to write react, I'm not sure if I'll try it out.

I will supplement the project code based on the complete implementation of this code later.

# Principle
Analysis and Separation of Node based Running Instructions.



# Example
build folder is for webpack, config folder is for electron.

    your package.json should like this, when your project is vue:
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server --hot --config build/webpack.dev.js",
        "dev-domesticApp": "cross-env NODE_ENV=development webpack-dev-server --no-hot --config build/webpack.dev.js",
        "build-domesticApp-test": "webpack --config build/webpack.test.js",
        "build-domesticApp-uat": "webpack --config build/webpack.uat.js",
        "build-domesticApp-prod": "webpack --config build/webpack.prod.js",
        "dev-globalApp": "cross-env NODE_ENV=development webpack-dev-server --no-hot --config build/webpack.dev.js",
        "build-globalApp-test": "webpack --config build/webpack.test.js",
        "build-globalApp-uat": "webpack --config build/webpack.uat.js",
        "build-globalApp-prod": "webpack --config build/webpack.prod.js"
    }

    config files are ./config/index.js and ./config/webpack.conf.js;
    dist folder structures:
        domesticApp:
            test / index.html   static folder  assets folder
            uat / index.html   static folder  assets folder
            prod / index.html   static folder  assets folder
        globalApp: 
            test / index.html   static folder  assets folder
            uat / index.html   static folder  assets folder
            prod / index.html   static folder  assets folder



    your package.json should like this, when your project is electron:
    "scripts": {
        "start": "chcp 65001 && cross-env NODE_ENV=dev electron . --trace-deprecation --win --config config/electron.config.js",
        "build-domesticApp-test": "cross-env NODE_ENV=test electron-builder --win --config config/electron.config.js",
        "build-domesticApp-prod": "cross-env NODE_ENV=prod electron-builder --win --config config/electron.config.js",
        "build-globalApp-test": "cross-env NODE_ENV=test electron-builder --win --config config/electron.config.js",
        "build-globalApp-prod": "cross-env NODE_ENV=prod electron-builder --win --config config/electron.config.js"
    }

    config file is ./config/electron.config.js
    dist folder structures:
        prod:
            version/
                domesticApp / xxxx
                globalApp / xxxx
        test: 

    my electron demo project https://github.com/MrVincentP/electron-updater-builder-multi-env
            version/
                domesticApp / xxxx
                globalApp / xxxx
