var cooking = require('cooking');
var nodeExternals = require('webpack-node-externals');
var fs = require('fs');
var { outputFileSync } = require('fs-extra');
var { join, resolve } = require('path');

var Components = {}
var externals = {}

var root = join(process.cwd(), 'src')

externals[`@/local`] = `./local`;

fs.readdirSync(join(root, 'mixin')).forEach(f => {
  externals[`@/mixin/${f}`] = `./mixin/${f}`;
})

fs.readdirSync(join(root, 'utils')).forEach(f => {
  externals[`@/utils/${f}`] = `./utils/${f}`;
})

fs
  .readdirSync(join(root, 'packages'))
  .filter(f => fs.statSync(join(root, 'packages', f)).isDirectory())
  .forEach(f => {
    Components[f] = join(root, 'packages', f)
    externals[`@/packages/${f}`] = `./${f}`;
  })

// 生成packages/components.js

outputFileSync(
  join(root, 'packages', 'index.js'),
  `// Auto generation by build/cooking.component.js \n\n` + Object.keys(Components).map(cp => `export { default as A${cp} } from './${cp}'`).join('\n'),
  'utf-8'
)

Components.index = join(root, 'packages', 'Atom.js')


externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

var alias = {
  '@': resolve(__dirname, '../src'),
};

cooking.set({
  entry: Components,
  dist: './lib',
  clean: false,
  format: 'cjs',
  extends: ['vue2'],
  minimize: false,
  externals,
  alias
});

cooking.add('output.filename', 'A[name].js');
// cooking.add('loader.js.exclude', /node_modules|utils\/popper\.js|utils\/date.\js/);
cooking.add('loader.scss', {
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader']
});
cooking.add('vue.preserveWhitespace', false);

module.exports = cooking.resolve();