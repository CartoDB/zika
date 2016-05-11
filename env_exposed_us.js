/* eslint quotes: 0 */

window.pageConfig = {
  layerIds: ["us_census","env","cities_labels"],
  zoom: 8,
  center: [7, 5],
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

  ]
}
