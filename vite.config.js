import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    outDir: 'dist', // Папка для сборки
    assetsDir: 'assets', // Папка для ассетов
  },
  plugins: [
    handlebars({
      helpers: {
        switch: function(value, options) {
          this.switch_value = value;
          return options.fn(this);
        },
        case: function(value, options)  {
          if (value == this.switch_value) {
            return options.fn(this);
          }
        }
      },
    })
  ],
})
