/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["cases"],
  zoom: 5,
  center: [15, -70],
  tooltip: {
    interactivity: "cartodb_id,name,value1,value2,value3,value4",
    fields: [
      {
        "name": "name",
        "title": true,
        "position": 0
      },
      {
        "name": "value1",
        "title": true,
        "position": 1
      },
      {
        "name": "value2",
        "title": true,
        "position": 2
      },
      {
        "name": "value3",
        "title": true,
        "position": 3
      },
      {
        "name": "value4",
        "title": true,
        "position": 4
      }
    ]
  },
  widgets: [
    {
      "id": "max-population-formula",
      "type": "formula",
      "title": "#cases",
      "order": 1,
      "layer_id": "cases",
      "options": {
        "column": "the_geom_webmercator",
        "operation": "count"
      }
    }
  ]
}
