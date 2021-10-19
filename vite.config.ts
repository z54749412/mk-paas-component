import { defineConfig } from 'vite'
import path from "path"
import fs from 'fs'
import legacy from '@vitejs/plugin-legacy'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import lessToJS from 'less-vars-to-js'
import config from './config'

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)

const env = process.argv[process.argv.length - 1]
const base = config[env]

console.log(base)

// https://vitejs.dev/config/
export default defineConfig({
  base: base.cdn,
  define: {
    'BASEURL': JSON.stringify(base.BASEURL)
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      "@": path.resolve(__dirname, "src"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    }
  },
  plugins: [reactRefresh(), vitePluginImp({
    optimize: true,
    libList: [
      {
        libName: "antd",
        style: (name) => {
          if (/row|col/i.test(name)) {
            return false
          }
          return `antd/es/${name}/style/index.less`
        },
      },
      {
        libName: "paas-element-front",
        style: (name) => `paas-element-front/lib/${name}/style/index.scss`,
      },
    ],
  }), legacy({
    targets: ['defaults', 'not IE 11']
  })],
  css: {
    preprocessorOptions: {
      scss: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: themeVariables
      }
    }
  },
  server: {
    port: 8888,
    proxy: {
      '/napi': {
        target: 'https://nuwa-dev.maycur.com',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/napi/, '')
      }
    }
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
  },
})
