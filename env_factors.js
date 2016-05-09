/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["env"],
  zoom: 3,
  center: [10, -40],
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
