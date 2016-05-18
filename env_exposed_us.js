/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["us_census","env","cities_labels","separators"],
  zoom: 8,
  center: [7, 5],
  basemap_opacity: 0,
  tooltip: {
    interactivity: "cartodb_id,name",
    fields: [
      {
        "name": "name",
        "title": true,
        "position": 0
      }
    ]
  },
  widgets: [
    {
      "type": "histogram",
      "title": "Women in childbearing age (ratio)",
      "layer_id": "us_census",
      "options": {
          "type": "histogram",
          "column": "women_childbearing_ratio",
          "sync": true
      }
    },
    {
      "id": "sum_women",
      "type": "formula",
      "title": "Women in childbearing age (total)",
      "layer_id": "us_census",
      "options": {
        "column": "women_childbearing",
        "operation": "sum"
      }
    },
    {
      "id": "sum_hispa",
      "type": "formula",
      "title": "Hispanic or latino population (total)",
      "layer_id": "us_census",
      "options": {
        "column": "hispanic_or_latino_pop",
        "operation": "sum"
      }
    },
    {
      "id": "sum_poverty",
      "type": "formula",
      "title": "Population living below poverty line (total)",
      "layer_id": "us_census",
      "options": {
        "column": "income_below_poverty_level",
        "operation": "sum"
      }
    },
    {
      "id": "sum_total_pop",
      "type": "formula",
      "title": "Total population",
      "layer_id": "us_census",
      "options": {
        "column": "total_pop",
        "operation": "sum"
      }
    },
  ]
}
