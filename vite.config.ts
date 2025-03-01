import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VITE_DROP_CONSOLE } from './src/constant/viteBaseConfig';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    target: 'modules',
    outDir: 'build',
    assetsDir: 'assets',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true,
    emptyOutDir: true,
    manifest: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          'antd-mobile': ['antd-mobile'],
        },
      },
    },
    // 传递给 Terser 的更多 minify 选项。
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: VITE_DROP_CONSOLE,
        pure_funcs: VITE_DROP_CONSOLE ? ['console.log'] : [], // 移除特定函数调用
        passes: 2, // 压缩次数
      },
      mangle: {
        safari10: true, // 解决 Safari 10 的问题
      },
      format: {
        comments: false, // 移除所有注释
      },
    },
  },
});
