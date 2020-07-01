import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'UncleVueChat',
    exports: 'named',
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble({
      objectAssign: 'Object.assign',
    }),
  ],
};
