import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig( ( { command, mode } ) => ( {
  build: { assetsDir: 'static' },
  css: {
    postcss: {
      plugins: [
        {
          AtRule: {
            charset: ( atRule ) => {
              if ( 'charset' === atRule.name ) {
                atRule.remove()
              }
            },
          },
          postcssPlugin: 'internal:charset-removal',
        },
      ],
    },
  },
  plugins: [ react(), svgr() ],
  resolve: { alias: { '@': path.resolve( __dirname, './src' ) } },
  server: {
    port: 4000,
    proxy: { '/api': 'http://localhost:8000' },
  },
} ) )
