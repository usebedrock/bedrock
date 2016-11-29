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
    const shouldReload = errors[key] !== undefined;
    delete errors[key];

    if (shouldReload) {
      browserSync.reload();
    }
  },
};
