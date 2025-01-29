import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Viteのプラグイン指定
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: ''
        },
        {
          src: 'src/contentScript.js',
          dest: ''
        },
        {
          src: 'images/icon*.png',
          dest: 'images'
        }
      ]
    })
  ],

  build: {
    rollupOptions: {
      input: {
        // ポップアップとして使うHTMLをエントリーポイントに指定
        // dist/popup.html に出力したい
        popup: resolve(__dirname, 'popup.html')
      },
      output: {
        // 生成されるファイル名を調整
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
