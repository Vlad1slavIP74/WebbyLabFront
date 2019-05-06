const isEmpty = require ('./isEmpty');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function filmsValidator(name,release,format,starting) {
  let errors = {};

  name = !isEmpty(name) ? name : '';
  format = !isEmpty(format) ? format : '';
  release = !isEmpty(release) ? release : '';
  starting = !isEmpty(starting) ? starting : '';


  if(name.length < 2) {
    errors.name = 'Name must be longer then 2'
  }

  if(format !== 'DVD' && format !== 'VHS'
    && format !== 'Blu-Ray') {
    errors.format = 'Format must be DVD or VHS or Blu-Ray'
  }

  if (!isNumeric(release)) {
    errors.releaseFormat = 'Release is not a number'
  }

  if (1850 > parseInt(release) || parseInt(release) > 2020) {
    errors.release = 'Data release must be between 1850 and 2020'
  }

  if (starting.length === 0) {
    errors.starting = 'Can not be blank'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
