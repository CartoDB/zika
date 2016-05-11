/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["flights"],
  zoom: 4,
  center: [15, -70],
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
      "id": "country",
      "type": "category",
      "title": "Country of destination",
      "order": 0,
      "layer_id": "flights",
      "options": {
        "column": "dst_country_name",
        "aggregation": "count"
      }
    },
    {
      "id": "max-population-formula",
      "type": "formula",
      "title": "#seats",
      "order": 1,
      "layer_id": "flights",
      "options": {
        "column": "seats_total",
        "operation": "sum"
      }
    }
  ]
}
