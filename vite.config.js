import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
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
