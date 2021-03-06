#!/usr/bin/env node

/* eslint-env node, es6 */
var request = require('request');
var cheerio = require('cheerio');
var utils = require('./utils');

var url = 'https://en.wikipedia.org/wiki/Zika_virus_outbreak_(2015%E2%80%93present)';

var countries = [];

request(url, (error, response, html) => {
  var $ = cheerio.load(html);
  var tables = $('table')

  tables.each( (index, table) => {
    var $table = $(table);
    var tableTitle = $table.find('caption').text();
    if (tableTitle.match('Cases in the Americas')) {
      countries = countries.concat( parseCountriesTable($table, 'americas', $) );
    }
    else if (tableTitle.match('Cases in Africa, Asia and Oceania')) {
      countries = countries.concat( parseCountriesTable($table, 'africa_asia_oceania', $ ));
    }
    else if (tableTitle.match('Imported cases')) {
      countries = countries.concat( parseCountriesTable($table, 'imported', $) );
    }
  });

  utils.toCSV(countries, console.log)
});


var parseCountriesTable = ($table, region, $) => {
  var table = [];
  $table.find('tr').each( (index, row) => {
    if ($(row).find('td').length ) {
      var $cells = $(row).find('td');
      var country_name = $cells.eq(0).text().cleanReferences().trim();
      var autochtonous_confirmed = 0;
      var autochtonous_suspected = 0;
      var imported_confirmed = 0;
      var deaths = 0;

      if (region === 'americas' || region === 'africa_asia_oceania') {
        autochtonous_confirmed = $cells.eq(1).text().cleanReferences().toInt().orZero().trim();
        autochtonous_suspected = $cells.eq(2).text().cleanReferences().toInt().orZero().trim();
        if (region === 'americas') deaths = $cells.eq(3).text().cleanReferences().toInt().orZero().trim();
      } else {
        imported_confirmed = $cells.eq(1).text().cleanReferences().toInt().orZero().trim();
      }

      table.push({
        country_name,
        region,
        autochtonous_confirmed,
        autochtonous_suspected,
        imported_confirmed,
        deaths,
      })
    }
  } )
  return table;
}
