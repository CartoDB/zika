var json2csv = require('json2csv');

String.prototype.cleanReferences = function() {
  return this.replace(/\[.+\]/gi,'').replace(/\(.+\)/gi,'');
}

String.prototype.toInt = function() {
  return this.replace(/\,/gi,'');
}

String.prototype.orZero = function() {
  return (this.trim() === '') ? '0' : this;
}

module.exports = {
  toCSV: function(data, cb) {
    json2csv({ data: data }, function(err, csv) {
      if (!err) cb(csv);
    });
  }
};
