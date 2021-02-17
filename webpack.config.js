const { merge } = require('webpack-merge');


const commonConfiguraiton = require('./webpack/common');

module.exports = (_env, { mode }) => {
    const properlyConfig = require(`./webpack/${mode}`);
    const mergedConfig = merge(commonConfiguraiton, properlyConfig);

    return mergedConfig;
}