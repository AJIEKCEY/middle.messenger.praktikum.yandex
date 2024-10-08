import Handlebars from 'handlebars';

Handlebars.registerHelper('concat', function() {
  return Array.prototype.slice.call(arguments, 0, -1).join('');
});


Handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  return options.fn(this);
});

Handlebars.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});
