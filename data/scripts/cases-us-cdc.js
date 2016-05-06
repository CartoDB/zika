#!/usr/bin/env node

/* eslint-env node, es6 */
var request = require('request');
var cheerio = require('cheerio');
var utils = require('./utils');

var url = 'http://www.cdc.gov/zika/geo/united-states.html';

var states = [];

request(url, (error, response, html) => {
  var $ = cheerio.load(html);
  var table = $('table').eq(0);

  table.find('tr').each( (index, row) => {
    if ($(row).find('td').length && $(row).find('td').eq(0).text().trim() !== '') {
      var $cells = $(row).find('td');
      states.push({
        state_name: $cells.eq(0).text().trim(),
        imported_confirmed: $cells.eq(1).text().cleanReferences().trim(),
        autochtonous_confirmed: $cells.eq(2).text().cleanReferences().trim(),
      })
    }
  });
  utils.toCSV(states, console.log);
});
