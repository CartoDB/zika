/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["env","separators"],
  zoom: 5,
  center: [14, -3],
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
      "title": "Country",
      "order": 0,
      "layer_id": "env",
      "options": {
        "column": "state_name",
        "aggregation": "count"
      }
    },
    {
      "id": "avg",
      "type": "formula",
      "title": "Average index",
      "order": 1,
      "layer_id": "env",
      "options": {
        "column": "value",
        "operation": "avg"
      }
    },
    {
      "id": "max",
      "type": "formula",
      "title": "Max index",
      "order": 2,
      "layer_id": "env",
      "options": {
        "column": "value",
        "operation": "max"
      }
    },
    {
      "id": "min",
      "type": "formula",
      "title": "Min index",
      "order": 3,
      "layer_id": "env",
      "options": {
        "column": "value",
        "operation": "min"
      }
    }
  ]
}
