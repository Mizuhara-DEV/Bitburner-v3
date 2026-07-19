import { context } from 'esbuild';
import { BitburnerPlugin } from 'esbuild-bitburner-plugin';

/** @type import('esbuild-bitburner-plugin').PluginExtension*/
const customExtension = {
  setup() { console.log('setup'); }, //Chạy một lần khi khởi động plugin

  beforeConnect() { console.log('beforeConnect'); }, //Chạy một lần trước khi trò chơi kết nối
  afterConnect(remoteAPI) { console.log('afterConnect'); }, //Chạy mỗi lần sau khi trò chơi kết nối lại

  beforeBuild() { console.log('beforeBuild'); }, //Chạy trước mỗi quá trình xây dựng
  afterBuild(remoteAPI) { console.log('afterBuild'); }, //Chạy sau khi kết quả build đã được upload vào game
};

const createContext = async () => await context({
  entryPoints: [
    'servers/**/*.js',
    'servers/**/*.jsx',
    'servers/**/*.ts',
    'servers/**/*.tsx',
  ],
  outbase: "./servers",
  outdir: "./build",
  plugins: [
    BitburnerPlugin({
      port: 8080,
      types: 'NetscriptDefinitions.d.ts',
      extensions: [customExtension],
      mirror: {
        'servers': ['home']
      },
      distribute: {
      },
    })
  ],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info',
});

let ctx = await createContext();
ctx.watch();