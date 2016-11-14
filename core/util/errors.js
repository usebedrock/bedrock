const browserSync = require('browser-sync');
const errors = {};

module.exports = {
  getErrors: function () {
    return errors;
  },
  updateError: function (key, value) {
    errors[key] = value;
    browserSync.reload();
  },
  clearError: function (key) {
    delete errors[key];
    browserSync.reload();
  },
};
