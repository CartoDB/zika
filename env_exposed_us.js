/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["us_census","env","cities_labels"],
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
